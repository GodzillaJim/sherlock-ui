import {Timezone} from "../generated";

export type UserInput = {
    __typename?: "User";
    aud?: string;
    auth_time?: number;
    currency?: string;
    email: string;
    email_verified?: boolean;
    exp?: number;
    firstName: string;
    iat?: number;
    id?: string;
    iss?: string;
    language: string;
    lastName: string;
    sub: string;
    timezone: Timezone;
    uid: string;
    user_id?: string;
    username: string;
};
