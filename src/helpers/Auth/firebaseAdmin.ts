import { cert, getApps, initializeApp } from "firebase-admin/app";
import { config } from "./index";
import { getAuth } from "firebase-admin/auth";

const credentials = {
  ...config,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};
if (!getApps().length) {
  initializeApp({
    credential: cert(credentials),
  });
}

export const verifyIdToken = (token: string) => {
  return getAuth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error;
    });
};
