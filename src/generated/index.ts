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
};


export type MutationLoginArgs = {
  payload?: InputMaybe<LoginPayload>;
};


export type MutationRegisterArgs = {
  payload?: InputMaybe<RegisterPayload>;
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

export type Role = {
  __typename?: 'Role';
  name?: Maybe<RoleType>;
};

export enum RoleType {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Editor = 'EDITOR',
  Writer = 'WRITER'
}

export enum TokenType {
  Bearer = 'BEARER'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  roles?: Maybe<Array<Maybe<Role>>>;
  username?: Maybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  payload?: InputMaybe<LoginPayload>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthResponse', email?: string | null, firstName?: string | null, jwtToken?: { __typename?: 'AuthToken', expiry?: string | null, id: string, jwtToken?: string | null, type?: TokenType | null } | null, roles?: Array<{ __typename?: 'Role', name?: RoleType | null } | null> | null } | null };


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