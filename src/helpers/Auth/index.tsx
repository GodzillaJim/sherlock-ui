import Cookies from "js-cookie";
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";

export const config = {
  appId: process.env.APP_ID || "247175206356:web:d05662cf36df115ba7b241",
  measurementId: process.env.MEASUREMENT_ID || "G-NKP68JX977",
  messagingSenderId: process.env.MESSAGING_SENDER_ID || "247175206356",
  storageBucket: process.env.STORAGE_BUCKERT || "app-users-341801.appspot.com",
  projectId: process.env.PROJECT_ID || "app-users-341801",
  apiKey: process.env.API_KEY || "AIzaSyCSZhBUF0JmiiFbzHQgPfC1F-XUwej5KLk",
  authDomain: process.env.AUTH_DOMAIN || "app-users-341801.firebaseapp.com",
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

export const firebaseClient = initializeApp(config);

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
