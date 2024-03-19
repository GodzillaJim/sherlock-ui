import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetClientSecretQueryVariables = common.Exact<{
  orderId: common.Scalars['String']['input'];
}>;


export type GetClientSecretQuery = { __typename?: 'Query', getClientSecret: string };


export const GetClientSecretDocument = gql`
    query GetClientSecret($orderId: String!) {
  getClientSecret(orderId: $orderId)
}
    `;

/**
 * __useGetClientSecretQuery__
 *
 * To run a query within a React component, call `useGetClientSecretQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientSecretQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientSecretQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetClientSecretQuery(baseOptions: Apollo.QueryHookOptions<GetClientSecretQuery, GetClientSecretQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientSecretQuery, GetClientSecretQueryVariables>(GetClientSecretDocument, options);
      }
export function useGetClientSecretLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientSecretQuery, GetClientSecretQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientSecretQuery, GetClientSecretQueryVariables>(GetClientSecretDocument, options);
        }
export function useGetClientSecretSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetClientSecretQuery, GetClientSecretQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClientSecretQuery, GetClientSecretQueryVariables>(GetClientSecretDocument, options);
        }
export type GetClientSecretQueryHookResult = ReturnType<typeof useGetClientSecretQuery>;
export type GetClientSecretLazyQueryHookResult = ReturnType<typeof useGetClientSecretLazyQuery>;
export type GetClientSecretSuspenseQueryHookResult = ReturnType<typeof useGetClientSecretSuspenseQuery>;
export type GetClientSecretQueryResult = Apollo.QueryResult<GetClientSecretQuery, GetClientSecretQueryVariables>;