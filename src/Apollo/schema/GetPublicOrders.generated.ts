import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPublicOrdersQueryVariables = common.Exact<{
  pagination?: common.InputMaybe<common.Pagination>;
  filter?: common.InputMaybe<common.FilterOrders>;
}>;


export type GetPublicOrdersQuery = { __typename?: 'Query', getPublicOrders?: { __typename?: 'OrderPage', totalDocs?: number | null, limit?: number | null, hasPrevPage?: boolean | null, hasNextPage?: boolean | null, page?: number | null, totalPages?: number | null, offset?: number | null, prevPage?: number | null, nextPage?: number | null, pagingCounter?: number | null, docs: Array<{ __typename?: 'Order', orderId: string, title: string, description?: string | null, writingStyle: common.WritingStyle, type: common.Type, numberOfPages: number, wordsPerPage?: number | null, deadline: any, createdAt?: any | null, published?: boolean | null, responses?: Array<{ __typename?: 'OrderResponse', id?: string | null, comments?: string | null, answer?: string | null, responseType?: common.ResponseType | null, createdAt?: any | null, updatedAt?: any | null } | null> | null }> } | null };


export const GetPublicOrdersDocument = gql`
    query GetPublicOrders($pagination: Pagination, $filter: FilterOrders) {
  getPublicOrders(pagination: $pagination, filter: $filter) {
    docs {
      orderId
      title
      description
      writingStyle
      type
      numberOfPages
      wordsPerPage
      deadline
      createdAt
      published
      responses {
        id
        comments
        answer
        responseType
        createdAt
        updatedAt
      }
    }
    totalDocs
    limit
    hasPrevPage
    hasNextPage
    page
    totalPages
    offset
    prevPage
    nextPage
    pagingCounter
  }
}
    `;

/**
 * __useGetPublicOrdersQuery__
 *
 * To run a query within a React component, call `useGetPublicOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicOrdersQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPublicOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetPublicOrdersQuery, GetPublicOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPublicOrdersQuery, GetPublicOrdersQueryVariables>(GetPublicOrdersDocument, options);
      }
export function useGetPublicOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublicOrdersQuery, GetPublicOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPublicOrdersQuery, GetPublicOrdersQueryVariables>(GetPublicOrdersDocument, options);
        }
export function useGetPublicOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPublicOrdersQuery, GetPublicOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPublicOrdersQuery, GetPublicOrdersQueryVariables>(GetPublicOrdersDocument, options);
        }
export type GetPublicOrdersQueryHookResult = ReturnType<typeof useGetPublicOrdersQuery>;
export type GetPublicOrdersLazyQueryHookResult = ReturnType<typeof useGetPublicOrdersLazyQuery>;
export type GetPublicOrdersSuspenseQueryHookResult = ReturnType<typeof useGetPublicOrdersSuspenseQuery>;
export type GetPublicOrdersQueryResult = Apollo.QueryResult<GetPublicOrdersQuery, GetPublicOrdersQueryVariables>;