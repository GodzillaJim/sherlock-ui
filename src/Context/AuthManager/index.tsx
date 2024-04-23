import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  signOut as logOut,
  User,
} from "@firebase/auth";
import { AuthResponse, User as LocalUser } from "../../generated/index";
import {
  clearAuthToken,
  firebaseClient,
  setAuthTokenCookie,
} from "../../helpers/Auth";
import Cookies from "js-cookie";
import { useCurrentUserLazyQuery } from "../../Apollo/schema/CurrentUserQuery.generated";
import { client } from "../../Apollo";
import { useSearchParams } from "next/navigation";

type AuthContextType = {
  user?: User;
  localUser?: LocalUser;
  loading?: boolean;
  signInWithGoogle?: () => void;
  signOut?: () => void;
  setAuthDetails?: (response: AuthResponse) => void;
  refresh: () => void;
  error?: string;
};

export const AuthContext = createContext<AuthContextType>({
  refresh: () => "",
});

type AuthManagerType = {
  children: React.ReactNode | JSX.Element;
};

const auth = getAuth(firebaseClient);

const AuthManager = ({ children }: AuthManagerType) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState<AuthContextType["user"] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [getCurrentUser, { data }] = useCurrentUserLazyQuery();

  const router = useRouter();
  const { next } = router.query;
  const params = useSearchParams();

  const handleRouteChange = async (url: string) => {
    setLoading(true);
    await router.push(url);
    setLoading(false);
  };

  const handleUser = async (newUser: User | null) => {
    if (newUser) {
      const authToken = await newUser.getIdTokenResult();
      setAuthTokenCookie(authToken.token);

      setUser(newUser);

      // Fetch current user
      await getCurrentUser();
      setLoading(false);
      return true;
    }
    setUser(undefined);
    clearAuthToken();
    setLoading(false);
    return false;
  };

  useEffect(() => {
    if (user) {
      if (next) {
        handleRouteChange(next as string);
      }
    }
  }, [user, next]);

  useEffect(() => {
    // Firebase updates cookie every hour. This ensures the token is updated
    const unsubscribe = onIdTokenChanged(auth, handleUser);

    return () => unsubscribe();
  }, [auth.currentUser]);

  const signInWithGoogle = () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({ prompt: "select_account" });

    signInWithPopup(auth, provider)
      .then((result) => handleUser(result.user))
      .catch((error) => {
        console.log("Error: ", error);
        setError(error.message);
        setLoading(false);
      });
  };

  const signOut = async () => {
    setLoading(true);
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

  const refresh = () => {
    // Reload user, seems to trigger onIdTokenChange.
    if (auth?.currentUser) {
      setLoading(true);
      getIdToken(auth.currentUser, true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        localUser: data?.me ? (data.me as LocalUser) : undefined,
        loading,
        signInWithGoogle,
        signOut,
        refresh,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthManager;
