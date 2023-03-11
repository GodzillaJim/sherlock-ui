import Cookies from "js-cookie";
import { initializeApp } from "@firebase/app";

export const config = {
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  storageBucket: process.env.STORAGE_BUCKERT,
  projectId: process.env.PROJECT_ID,
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
};

export const setAuthToken = (token: string) => {
  return Cookies.set("authToken", token);
};

export const clearAuthToken = () => {
  return Cookies.remove("authToken");
};

export const firebaseClient = initializeApp(config);

