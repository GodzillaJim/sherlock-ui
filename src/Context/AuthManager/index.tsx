import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useRouter as useNavigation, useSearchParams } from "next/navigation";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut as logOut, User } from "@firebase/auth"
import { User as LocalUser } from "../../generated/index";
import {
  clearAuthToken,
  firebaseClient,
  setAuthToken,
} from "../../helpers/Auth";
import { client, createApolloClient } from "../../Apollo";
import Cookies from "js-cookie";
import {
  CurrentUserDocument,
  CurrentUserQuery,
} from "../../Apollo/schema/CurrentUserQuery.generated";

type AuthContextType = {
  user?: User;
  localUser?: LocalUser;
  loading?: boolean;
  signInWithGoogle?: () => void;
  signOut?: () => void;
};

export const AuthContext = createContext<AuthContextType>({});

type AuthManagerType = {
  children: React.ReactNode | JSX.Element;
};

const AuthManager = ({ children }: AuthManagerType) => {
  const [user, setUser] = useState<AuthContextType["user"] | undefined>(
    undefined
  );
  const [localUser, setLocalUser] = useState<LocalUser | undefined>(undefined);
  const [authTokenValue, setAuthTokenValue] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const params = useSearchParams();
  const navigate = useNavigation();

  const tempClient = useMemo(() => {
    if (authTokenValue) {
      return createApolloClient(authTokenValue);
    }

    return null;
  }, [authTokenValue]);

  useEffect(() => {
    if (authTokenValue && !localUser) {
      tempClient
        ?.query<CurrentUserQuery>({ query: CurrentUserDocument })
        .then((res) => {
          if (res.data.me) {
            setLocalUser(res.data.me as LocalUser);
          }
        })
        .catch(console.log);
    }
  }, [authTokenValue]);

  const handleRouteChange = async (url: string) => {
    setLoading(true);
    window.location.href = url;
    setLoading(false);
  };

  const handleUser = async (newUser: User | null) => {
    if (newUser) {
      const authToken = await newUser.getIdToken();
      setAuthToken(authToken);
      setAuthTokenValue(authToken);

      setUser(newUser);
      setLoading(false);
      console.log("Signin path: ", newUser, params.get("next"));
      if (router.query.next) {
        await handleRouteChange(router.query.next as string);
        return;
      }

      // await handleRouteChange('/app')
      return true;
    }
    setUser(undefined);
    clearAuthToken();
    setLoading(false);
    return false;
  };

  useEffect(() => {
    const auth = getAuth(firebaseClient);
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(undefined);
        setLoading(false);
        if (router.pathname === "/auth/login") return;
        await handleRouteChange(`/auth/login?next=${router.pathname}`);
        return;
      }

      await handleUser(user);
    });
  }, []);

  const signInWithGoogle = () => {
    setLoading(true);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({  prompt:"select_account" });

    signInWithPopup(auth, provider)
      .then((result) => handleUser(result.user))
      .catch((error) => {
        console.log('Error: ', error);
        // logOut(auth)
      });
  };

  const signOut = async () => {
    const auth = getAuth();
    setLoading(true);
    setAuthTokenValue(undefined);
    setLocalUser(undefined);
    await logOut(auth);
    await handleUser(null);
    await handleRouteChange("/auth/login?next=/app");
    clearAuthToken();
    sessionStorage.clear();
    await client.clearStore();
    await client.resetStore();
    setLoading(false);
    console.log("Cookies: ", Cookies.get("authToken"));
  };

  return (
    <AuthContext.Provider
      value={{ user, localUser, loading, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthManager;
