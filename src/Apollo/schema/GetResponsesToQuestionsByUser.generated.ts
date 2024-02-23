import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetResponsesToQuestionsByUserQueryVariables = common.Exact<{ [key: string]: never; }>;


export type GetResponsesToQuestionsByUserQuery = { __typename?: 'Query', getResponsesToQuestionsByUser?: Array<{ __typename?: 'OrderResponse', id?: string | null, comments?: string | null, answer?: string | null, responseType?: common.ResponseType | null, createdAt?: any | null, updatedAt?: any | null, published?: boolean | null, attachments?: Array<{ __typename?: 'Attachment', name?: string | null, location?: string | null, key?: string | null, mimeType?: string | null } | null> | null, createdBy?: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, uid?: string | null, picture?: string | null, roles?: Array<{ __typename?: 'Role', name?: common.RoleType | null } | null> | null } | null, question?: { __typename?: 'Order', orderId: string, title: string, description?: string | null, writingStyle: common.WritingStyle, type: common.Type, numberOfPages: number, wordsPerPage?: number | null, deadline: any, createdAt?: any | null, published?: boolean | null, responses?: Array<{ __typename?: 'OrderResponse', id?: string | null, comments?: string | null, answer?: string | null, responseType?: common.ResponseType | null, createdAt?: any | null, updatedAt?: any | null, published?: boolean | null } | null> | null } | null } | null> | null };


export const GetResponsesToQuestionsByUserDocument = gql`
    query GetResponsesToQuestionsByUser {
  getResponsesToQuestionsByUser {
    id
    attachments {
      name
      location
      key
      mimeType
    }
    comments
    answer
    responseType
    createdAt
    updatedAt
    createdBy {
      id
      email
      firstName
      lastName
      password
      roles {
        name
      }
      username
      currency
      language
      uid
      picture
    }
    question {
      orderId
      title
      description
      writingStyle
      type
      numberOfPages
      wordsPerPage
      deadline
      responses {
        id
        comments
        answer
        responseType
        createdAt
        updatedAt
        published
      }
      createdAt
      published
    }
    published
  }
}
    `;

/**
 * __useGetResponsesToQuestionsByUserQuery__
 *
 * To run a query within a React component, call `useGetResponsesToQuestionsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResponsesToQuestionsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResponsesToQuestionsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetResponsesToQuestionsByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetResponsesToQuestionsByUserQuery, GetResponsesToQuestionsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResponsesToQuestionsByUserQuery, GetResponsesToQuestionsByUserQueryVariables>(GetResponsesToQuestionsByUserDocument, options);
      }
export function useGetResponsesToQuestionsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResponsesToQuestionsByUserQuery, GetResponsesToQuestionsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResponsesToQuestionsByUserQuery, GetResponsesToQuestionsByUserQueryVariables>(GetResponsesToQuestionsByUserDocument, options);
        }
export function useGetResponsesToQuestionsByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetResponsesToQuestionsByUserQuery, GetResponsesToQuestionsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetResponsesToQuestionsByUserQuery, GetResponsesToQuestionsByUserQueryVariables>(GetResponsesToQuestionsByUserDocument, options);
        }
export type GetResponsesToQuestionsByUserQueryHookResult = ReturnType<typeof useGetResponsesToQuestionsByUserQuery>;
export type GetResponsesToQuestionsByUserLazyQueryHookResult = ReturnType<typeof useGetResponsesToQuestionsByUserLazyQuery>;
export type GetResponsesToQuestionsByUserSuspenseQueryHookResult = ReturnType<typeof useGetResponsesToQuestionsByUserSuspenseQuery>;
export type GetResponsesToQuestionsByUserQueryResult = Apollo.QueryResult<GetResponsesToQuestionsByUserQuery, GetResponsesToQuestionsByUserQueryVariables>;