/* eslint-disable */
// noinspection GraphQLUnresolvedReference

import * as Apollo from '@apollo/client';
import {gql} from '@apollo/client';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
};

export type AuthResponse = {
    __typename?: 'AuthResponse';
    email?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    jwtToken?: Maybe<AuthToken>;
    roles?: Maybe<Array<Maybe<Role>>>;
};

export type AuthToken = {
    __typename?: 'AuthToken';
    expiry?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    jwtToken?: Maybe<Scalars['String']>;
    type?: Maybe<TokenType>;
};

export type FilterOrders = {
    createdAfter?: InputMaybe<Scalars['Date']>;
    createdBefore?: InputMaybe<Scalars['Date']>;
    title?: InputMaybe<Scalars['String']>;
};

export type Firebase = {
    __typename?: 'Firebase';
    identities?: Maybe<Identity>;
    sign_in_provider?: Maybe<Scalars['String']>;
};

export type Identity = {
    __typename?: 'Identity';
    email?: Maybe<Array<Maybe<Scalars['String']>>>;
    googlecom?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LoginPayload = {
    email?: InputMaybe<Scalars['String']>;
    password?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    createOrder?: Maybe<Response>;
    login?: Maybe<AuthResponse>;
    register?: Maybe<AuthResponse>;
    updateHealth?: Maybe<Scalars['String']>;
    updateOrder?: Maybe<Response>;
    updatePassword?: Maybe<Response>;
    updateUser?: Maybe<Response>;
};


export type MutationCreateOrderArgs = {
    orderInput?: InputMaybe<OrderInput>;
};


export type MutationLoginArgs = {
    payload?: InputMaybe<LoginPayload>;
};


export type MutationRegisterArgs = {
    payload?: InputMaybe<RegisterPayload>;
};


export type MutationUpdateOrderArgs = {
    orderId?: InputMaybe<Scalars['String']>;
    orderInput?: InputMaybe<OrderInput>;
};


export type MutationUpdatePasswordArgs = {
    payload?: InputMaybe<PasswordChangePayload>;
};


export type MutationUpdateUserArgs = {
    payload?: InputMaybe<UserUpdatePayload>;
};

export type Order = {
    __typename?: 'Order';
    attachments?: Maybe<Array<Maybe<Scalars['String']>>>;
    createdAt?: Maybe<Scalars['Date']>;
    deadline: Scalars['Date'];
    description?: Maybe<Scalars['String']>;
    numberOfPages: Scalars['Float'];
    responses?: Maybe<Array<Maybe<OrderResponse>>>;
    title: Scalars['String'];
    type: Type;
    wordsPerPage?: Maybe<Scalars['Float']>;
    writingStyle: WritingStyle;
};

export type OrderInput = {
    attachments?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    deadline: Scalars['Date'];
    description?: InputMaybe<Scalars['String']>;
    numberOfPages: Scalars['Float'];
    title: Scalars['String'];
    type: Type;
    wordsPerPage?: InputMaybe<Scalars['Float']>;
    writingStyle: WritingStyle;
};

export type OrderPage = {
    __typename?: 'OrderPage';
    docs?: Maybe<Array<Maybe<Order>>>;
    hasNextPage?: Maybe<Scalars['Boolean']>;
    hasPrevPage?: Maybe<Scalars['Boolean']>;
    limit?: Maybe<Scalars['Float']>;
    nextPage?: Maybe<Scalars['Float']>;
    offset?: Maybe<Scalars['Float']>;
    page?: Maybe<Scalars['Float']>;
    pagingCounter?: Maybe<Scalars['Float']>;
    prevPage?: Maybe<Scalars['Float']>;
    totalDocs?: Maybe<Scalars['Float']>;
    totalPages?: Maybe<Scalars['Float']>;
};

export type OrderResponse = {
    __typename?: 'OrderResponse';
    answer?: Maybe<Scalars['String']>;
    attachments?: Maybe<Array<Maybe<Scalars['String']>>>;
    comments?: Maybe<Scalars['String']>;
    date?: Maybe<Scalars['Date']>;
    type?: Maybe<ResponseType>;
};

export type Pagination = {
    currentPage?: InputMaybe<Scalars['Float']>;
    perPage?: InputMaybe<Scalars['Float']>;
};

export type PasswordChangePayload = {
    currentPassword?: InputMaybe<Scalars['String']>;
    newPassword?: InputMaybe<Scalars['String']>;
};

export type Query = {
    __typename?: 'Query';
    getMyOrders?: Maybe<OrderPage>;
    getOrder?: Maybe<Order>;
    getUserOrders?: Maybe<Array<Maybe<Order>>>;
    health?: Maybe<Scalars['String']>;
    me?: Maybe<User>;
};


export type QueryGetMyOrdersArgs = {
    pagination?: InputMaybe<Pagination>;
};


export type QueryGetOrderArgs = {
    orderId: Scalars['String'];
};


export type QueryGetUserOrdersArgs = {
    email?: InputMaybe<Scalars['String']>;
};

export type RegisterPayload = {
    email: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    password: Scalars['String'];
    username?: InputMaybe<Scalars['String']>;
};

export type Response = {
    __typename?: 'Response';
    message?: Maybe<Scalars['String']>;
    status?: Maybe<Scalars['Int']>;
    success?: Maybe<Scalars['Boolean']>;
};

export enum ResponseType {
    Attachment = 'attachment',
    Text = 'text'
}

export type Role = {
    __typename?: 'Role';
    name?: Maybe<RoleType>;
};

export type RoleInput = {
    name?: InputMaybe<RoleType>;
};

export enum RoleType {
    Admin = 'ADMIN',
    Customer = 'CUSTOMER',
    Editor = 'EDITOR',
    Writer = 'WRITER'
}

export type Timezone = {
    __typename?: 'Timezone';
    abbr?: Maybe<Scalars['String']>;
    isdst?: Maybe<Scalars['Boolean']>;
    offset?: Maybe<Scalars['Int']>;
    text?: Maybe<Scalars['String']>;
    utc?: Maybe<Array<Maybe<Scalars['String']>>>;
    value?: Maybe<Scalars['String']>;
};

export type TimezoneInput = {
    abbr?: InputMaybe<Scalars['String']>;
    isdst?: InputMaybe<Scalars['Boolean']>;
    offset?: InputMaybe<Scalars['Int']>;
    text?: InputMaybe<Scalars['String']>;
    utc?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    value?: InputMaybe<Scalars['String']>;
};

export enum TokenType {
    Bearer = 'BEARER'
}

export enum Type {
    Article = 'ARTICLE',
    Bibliography = 'BIBLIOGRAPHY',
    Essay = 'ESSAY',
    Prompt = 'PROMPT',
    Review = 'REVIEW'
}

export type User = {
    __typename?: 'User';
    aud?: Maybe<Scalars['String']>;
    auth_time?: Maybe<Scalars['Float']>;
    currency?: Maybe<Scalars['String']>;
    email: Scalars['String'];
    email_verified?: Maybe<Scalars['Boolean']>;
    exp?: Maybe<Scalars['Float']>;
    firebase?: Maybe<Firebase>;
    firstName?: Maybe<Scalars['String']>;
    iat?: Maybe<Scalars['Float']>;
    id?: Maybe<Scalars['ID']>;
    iss?: Maybe<Scalars['String']>;
    language?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    orders?: Maybe<Array<Maybe<Scalars['String']>>>;
    password?: Maybe<Scalars['String']>;
    picture?: Maybe<Scalars['String']>;
    responses?: Maybe<Array<Maybe<Scalars['String']>>>;
    roles?: Maybe<Array<Maybe<Role>>>;
    sub?: Maybe<Scalars['String']>;
    timezone?: Maybe<Timezone>;
    uid?: Maybe<Scalars['String']>;
    user_id?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
};

export type UserUpdatePayload = {
    currency?: InputMaybe<Scalars['String']>;
    email: Scalars['String'];
    firstName: Scalars['String'];
    id: Scalars['ID'];
    language?: InputMaybe<Scalars['String']>;
    lastName: Scalars['String'];
    timezone?: InputMaybe<TimezoneInput>;
    username?: InputMaybe<Scalars['String']>;
};

export enum WritingStyle {
    Apa6 = 'APA6',
    Apa7 = 'APA7',
    Harvard = 'HARVARD',
    Mla = 'MLA'
}

export type UpdatePasswordMutationVariables = Exact<{
    payload?: InputMaybe<PasswordChangePayload>;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword?: { __typename?: 'Response', message?: string | null, status?: number | null, success?: boolean | null } | null };

export type UpdateUserMutationVariables = Exact<{
    payload?: InputMaybe<UserUpdatePayload>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'Response', success?: boolean | null, status?: number | null, message?: string | null } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = {
    __typename?: 'Query', me?: {
        __typename?: 'User', email: string, id?: string | null, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, orders?: Array<string | null> | null, uid?: string | null, picture?: string | null, iss?: string | null, aud?: string | null, auth_time?: number | null, user_id?: string | null, sub?: string | null, iat?: number | null, exp?: number | null, email_verified?: boolean | null, responses?: Array<string | null> | null, roles?: Array<{ __typename?: 'Role', name?: RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, abbr?: string | null, offset?: number | null, isdst?: boolean | null, text?: string | null, utc?: Array<string | null> | null } | null, firebase?: { __typename?: 'Firebase', sign_in_provider?: string | null, identities?: { __typename?: 'Identity', googlecom?: Array<string | null> | null, email?: Array<string | null> | null } | null } | null
    } | null
};

export type RegisterMutationVariables = Exact<{
    payload?: InputMaybe<RegisterPayload>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'AuthResponse', email?: string | null, firstName?: string | null, jwtToken?: { __typename?: 'AuthToken', expiry?: string | null, id: string, jwtToken?: string | null, type?: TokenType | null } | null } | null };


export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($payload: PasswordChangePayload) {
        updatePassword(payload: $payload) {
            message
            status
            success
        }
    }
`;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
}

export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($payload: UserUpdatePayload) {
        updateUser(payload: $payload) {
            success
            status
            message
        }
    }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
}

export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
        me {
            email
            id
            firstName
            lastName
            password
            username
            currency
            language
            orders
            uid
            picture
            iss
            aud
            auth_time
            user_id
            sub
            iat
            exp
            email_verified
            roles {
                name
            }
            timezone {
                value
                abbr
                offset
                isdst
                text
                utc
            }
            responses
            firebase {
                identities {
                    googlecom
                    email
                }
                sign_in_provider
            }
        }
    }
`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
}

export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
}

export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($payload: RegisterPayload) {
        register(payload: $payload) {
            email
            firstName
            jwtToken {
                expiry
                id
                jwtToken
                type
            }
        }
    }
`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}

export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;