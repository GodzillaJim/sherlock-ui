import {cert, getApps, initializeApp} from "firebase-admin/app";
import {config} from "./index";
import {getAuth} from "firebase-admin/auth"

if (!getApps().length) {
    initializeApp({
        credential: cert(config)
    })
}

export const verifyIdToken = (token: string) => {
    return getAuth().verifyIdToken(token).catch(error => {
        throw error
    })
}

