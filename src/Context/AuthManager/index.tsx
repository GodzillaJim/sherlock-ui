import React, {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useRouter as useNavigation} from "next/navigation"
import {getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut as logOut, User} from "@firebase/auth";
import {User as LocalUser} from "../../generated/index";
import {clearAuthToken, firebaseClient, setAuthToken,} from "../../helpers/Auth";
import {client} from "../../Apollo";
import Cookies from "js-cookie";

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

const AuthManager = ({children}: AuthManagerType) => {
    const [user, setUser] = useState<AuthContextType["user"] | undefined>(
        undefined
    );
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const navigate = useNavigation()

    const handleRouteChange = async (url: string) => {
        setLoading(true);
        navigate.push(url)
        setLoading(false);
    };

    const handleUser = async (newUser: User | null) => {
        if (newUser) {
            const authToken = await newUser.getIdToken();
            setAuthToken(authToken);
            setUser(newUser);
            setLoading(false);
            if (router.query.next) {
                await handleRouteChange(decodeURIComponent(router.query.next as string))
                return
            }

            await handleRouteChange('/app')
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
                setUser(undefined)
                setLoading(false)
                if (router.pathname === '/auth/login') return
                await handleRouteChange(`/auth/login?next=${encodeURIComponent(router.pathname)}`)
                return
            }

            await handleUser(user)
        });
    }, []);

    const signInWithGoogle = () => {
        setLoading(true);
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => handleUser(result.user))
            .catch((error) => {
                console.log(error);
            });
    };

    const signOut = async () => {
        const auth = getAuth();
        setLoading(true);
        await logOut(auth)
        await handleUser(null);
        await handleRouteChange("/auth/login?/next=/app");
        clearAuthToken();
        sessionStorage.clear();
        await client.clearStore();
        await client.resetStore();
        setLoading(false);
        console.log('Cookies: ', Cookies.get('authToken'))
    };

    return (
        <AuthContext.Provider value={{user, loading, signInWithGoogle, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthManager;
