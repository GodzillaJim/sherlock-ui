import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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

export type LoginPayload = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<AuthResponse>;
  register?: Maybe<AuthResponse>;
  updateUser?: Maybe<Response>;
};


export type MutationLoginArgs = {
  payload?: InputMaybe<LoginPayload>;
};


export type MutationRegisterArgs = {
  payload?: InputMaybe<RegisterPayload>;
};


export type MutationUpdateUserArgs = {
  payload?: InputMaybe<UserUpdatePayload>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
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

export type User = {
  __typename?: 'User';
  currency?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  language?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  profilePic?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Role>>>;
  timezone?: Maybe<Timezone>;
  username?: Maybe<Scalars['String']>;
};

export type UserUpdatePayload = {
  currency?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  language?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  profilePic?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  timezone?: InputMaybe<TimezoneInput>;
  username?: InputMaybe<Scalars['String']>;
};

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string, firstName: string, lastName: string, username?: string | null, id: string, currency?: string | null, language?: string | null, roles?: Array<{ __typename: 'Role', name?: RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, text?: string | null, abbr?: string | null, isdst?: boolean | null, offset?: number | null, utc?: Array<string | null> | null } | null } | null };

export type LoginMutationVariables = Exact<{
  payload?: InputMaybe<LoginPayload>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthResponse', email?: string | null, firstName?: string | null, jwtToken?: { __typename?: 'AuthToken', expiry?: string | null, id: string, jwtToken?: string | null, type?: TokenType | null } | null, roles?: Array<{ __typename?: 'Role', name?: RoleType | null } | null> | null } | null };

export type RegisterMutationVariables = Exact<{
  payload?: InputMaybe<RegisterPayload>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'AuthResponse', email?: string | null, firstName?: string | null, jwtToken?: { __typename?: 'AuthToken', expiry?: string | null, id: string, jwtToken?: string | null, type?: TokenType | null } | null } | null };


export const LoggedInUserDocument = gql`
    query LoggedInUser {
  me {
    email
    firstName
    lastName
    username
    id
    currency
    language
    roles {
      name
      __typename
    }
    timezone {
      value
      text
      abbr
      isdst
      offset
      utc
    }
  }
}
    `;

/**
 * __useLoggedInUserQuery__
 *
 * To run a query within a React component, call `useLoggedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInUserQuery(baseOptions?: Apollo.QueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
      }
export function useLoggedInUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
        }
export type LoggedInUserQueryHookResult = ReturnType<typeof useLoggedInUserQuery>;
export type LoggedInUserLazyQueryHookResult = ReturnType<typeof useLoggedInUserLazyQuery>;
export type LoggedInUserQueryResult = Apollo.QueryResult<LoggedInUserQuery, LoggedInUserQueryVariables>;
export const LoginDocument = gql`
    mutation Login($payload: LoginPayload) {
  login(payload: $payload) {
    email
    firstName
    jwtToken {
      expiry
      id
      jwtToken
      type
    }
    roles {
      name
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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