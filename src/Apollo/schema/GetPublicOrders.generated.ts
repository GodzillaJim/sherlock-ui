import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import { OrderFragmentFragmentDoc } from './fragments/OrderFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPublicOrdersQueryVariables = common.Exact<{
  pagination?: common.InputMaybe<common.Pagination>;
  filter?: common.InputMaybe<common.FilterOrders>;
}>;


export type GetPublicOrdersQuery = { __typename?: 'Query', getPublicOrders?: { __typename?: 'OrderPage', totalDocs?: number | null, limit?: number | null, hasPrevPage?: boolean | null, hasNextPage?: boolean | null, page?: number | null, totalPages?: number | null, offset?: number | null, prevPage?: number | null, nextPage?: number | null, pagingCounter?: number | null, docs: Array<{ __typename?: 'Order', orderId: string, title: string, description?: string | null, writingStyle: common.WritingStyle, type: common.Type, numberOfPages: number, wordsPerPage?: number | null, deadline: any, createdAt?: any | null, published?: boolean | null, status: common.OrderStatus, academicLevel?: string | null, discipline?: string | null, attachments: Array<{ __typename?: 'Attachment', name?: string | null, location?: string | null, key?: string | null, mimeType?: string | null } | null>, responses: Array<{ __typename?: 'OrderResponse', id: string, comments?: string | null, answer?: string | null, responseType: common.ResponseType, createdAt: any, updatedAt: any, createdBy: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, orders?: Array<string | null> | null, responses?: Array<string | null> | null, uid?: string | null, picture?: string | null, iss?: string | null, aud?: string | null, auth_time?: number | null, user_id?: string | null, sub?: string | null, iat?: number | null, exp?: number | null, email_verified?: boolean | null, roles?: Array<{ __typename?: 'Role', name?: common.RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, abbr?: string | null, offset?: number | null, isdst?: boolean | null, text?: string | null, utc?: Array<string | null> | null } | null, firebase?: { __typename?: 'Firebase', sign_in_provider?: string | null, identities?: { __typename?: 'Identity', googlecom?: Array<string | null> | null, email?: Array<string | null> | null } | null } | null } }>, price?: { __typename?: 'Price', amount?: number | null, clientSecret?: string | null, currency?: string | null, paymentStatus?: common.PaymentStatus | null } | null }> } | null };


export const GetPublicOrdersDocument = gql`
    query GetPublicOrders($pagination: Pagination, $filter: FilterOrders) {
  getPublicOrders(pagination: $pagination, filter: $filter) {
    docs {
      ...OrderFragment
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
    ${OrderFragmentFragmentDoc}`;

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