import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface AuthResponse {
  __typename?: 'AuthResponse'
  firstName: Scalars['String']
  lastName: Scalars['String']
  roles?: Maybe<Role[]>
  token: Scalars['String']
}

export interface LoginParams {
  email: Scalars['String']
  password: Scalars['String']
}

export interface Query {
  __typename?: 'Query'
  me?: Maybe<UserDetails>
  signIn?: Maybe<AuthResponse>
  signUp?: Maybe<AuthResponse>
}

export interface QueryMeArgs {
  token: Scalars['String']
}

export interface QuerySignInArgs {
  payload: LoginParams
}

export interface QuerySignUpArgs {
  payload: SignupParams
}

export interface Role {
  __typename?: 'Role'
  name?: Maybe<RoleType>
}

export enum RoleType {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Editor = 'EDITOR',
  Writer = 'WRITER'
}

export interface SignupParams {
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  password?: InputMaybe<Scalars['String']>
}

export interface User {
  __typename?: 'User'
  email: Scalars['String']
  firstName: Scalars['String']
  id: Scalars['ID']
  lastName: Scalars['String']
  password?: Maybe<Scalars['String']>
  roles?: Maybe<Array<Maybe<Role>>>
}

export interface UserDetails {
  __typename?: 'UserDetails'
  email: Scalars['String']
  firstName: Scalars['String']
  id: Scalars['ID']
  lastName: Scalars['String']
  roles?: Maybe<Array<Maybe<Role>>>
}

export type SignInQueryVariables = Exact<{
  payload: LoginParams
}>

export interface SignInQuery { __typename?: 'Query', signIn?: { __typename?: 'AuthResponse', token: string, firstName: string, lastName: string, roles?: Array<{ __typename?: 'Role', name?: RoleType | null }> | null } | null }

export const SignInDocument = gql`
    query SignIn($payload: LoginParams!) {
  signIn(payload: $payload) {
    token
    firstName
    lastName
    roles {
      name
    }
  }
}
    `

/**
 * __useSignInQuery__
 *
 * To run a query within a React component, call `useSignInQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignInQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useSignInQuery (baseOptions: Apollo.QueryHookOptions<SignInQuery, SignInQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SignInQuery, SignInQueryVariables>(SignInDocument, options)
}
export function useSignInLazyQuery (baseOptions?: Apollo.LazyQueryHookOptions<SignInQuery, SignInQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SignInQuery, SignInQueryVariables>(SignInDocument, options)
}
export type SignInQueryHookResult = ReturnType<typeof useSignInQuery>
export type SignInLazyQueryHookResult = ReturnType<typeof useSignInLazyQuery>
export type SignInQueryResult = Apollo.QueryResult<SignInQuery, SignInQueryVariables>
