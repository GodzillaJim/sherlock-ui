import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendTestMailQueryVariables = common.Exact<{ [key: string]: never; }>;


export type SendTestMailQuery = { __typename?: 'Query', sendTestEmail?: { __typename?: 'Response', message?: string | null, success?: boolean | null, status?: number | null } | null };


export const SendTestMailDocument = gql`
    query SendTestMail {
  sendTestEmail {
    message
    success
    status
  }
}
    `;

/**
 * __useSendTestMailQuery__
 *
 * To run a query within a React component, call `useSendTestMailQuery` and pass it any options that fit your needs.
 * When your component renders, `useSendTestMailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSendTestMailQuery({
 *   variables: {
 *   },
 * });
 */
export function useSendTestMailQuery(baseOptions?: Apollo.QueryHookOptions<SendTestMailQuery, SendTestMailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SendTestMailQuery, SendTestMailQueryVariables>(SendTestMailDocument, options);
      }
export function useSendTestMailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SendTestMailQuery, SendTestMailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SendTestMailQuery, SendTestMailQueryVariables>(SendTestMailDocument, options);
        }
export function useSendTestMailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SendTestMailQuery, SendTestMailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SendTestMailQuery, SendTestMailQueryVariables>(SendTestMailDocument, options);
        }
export type SendTestMailQueryHookResult = ReturnType<typeof useSendTestMailQuery>;
export type SendTestMailLazyQueryHookResult = ReturnType<typeof useSendTestMailLazyQuery>;
export type SendTestMailSuspenseQueryHookResult = ReturnType<typeof useSendTestMailSuspenseQuery>;
export type SendTestMailQueryResult = Apollo.QueryResult<SendTestMailQuery, SendTestMailQueryVariables>;