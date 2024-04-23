import Cookies from "js-cookie";
import { FirebaseOptions, getApps, initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { RoleType } from "../../generated";

export const config: FirebaseOptions = {
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKERT,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
};

export const setAuthTokenCookie = (token: string) => {
  return Cookies.set("authToken", token);
};

export const clearAuthToken = () => {
  return Cookies.remove("authToken");
};

export const getAuthTokenCookie = () => {
  return Cookies.get("authToken");
};

export const getFirebaseClient = () => {
  if (getApps().length) return getApps()[0];

  return initializeApp(config);
};

export const firebaseClient = getFirebaseClient();

const auth = getAuth(firebaseClient);

export const getIdToken = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const cookieToken = getAuthTokenCookie();

    if (token && token !== cookieToken) {
      setAuthTokenCookie(token);
    }

    return token || cookieToken;
  } catch (e) {
    console.log(e);
    return "";
  }
};

export const getAccountTypeText = (user: User) => {
  if (user && user.roles) {
    const roles = user.roles;
    const isAdmin = roles.find((role) => role?.name === RoleType.Admin);
    const isEditor = roles.find((role) => role?.name === RoleType.Editor);
    const isWriter = roles.find((role) => role?.name === RoleType.Writer);

    if (isAdmin) return "Admin";
    if (isEditor) return "Editor";
    if (isWriter) return "Writer";
    return "Customer";
  }
};
