import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyOrdersQueryVariables = common.Exact<{
  pagination: common.Pagination;
}>;


export type GetMyOrdersQuery = { __typename?: 'Query', getMyOrders?: { __typename?: 'OrderPage', totalDocs?: number | null, limit?: number | null, hasPrevPage?: boolean | null, hasNextPage?: boolean | null, page?: number | null, totalPages?: number | null, offset?: number | null, prevPage?: number | null, nextPage?: number | null, pagingCounter?: number | null, docs: Array<{ __typename?: 'Order', orderId: string, title: string, description?: string | null, writingStyle: common.WritingStyle, type: common.Type, numberOfPages: number, wordsPerPage?: number | null, deadline: any, createdAt?: any | null, published?: boolean | null, status: common.OrderStatus, attachments: Array<{ __typename?: 'Attachment', name?: string | null, location?: string | null, key?: string | null, mimeType?: string | null } | null>, responses: Array<{ __typename?: 'OrderResponse', id: string, comments?: string | null, answer?: string | null, responseType: common.ResponseType, createdAt: any, updatedAt: any, createdBy: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, orders?: Array<string | null> | null, responses?: Array<string | null> | null, uid?: string | null, picture?: string | null, iss?: string | null, aud?: string | null, auth_time?: number | null, user_id?: string | null, sub?: string | null, iat?: number | null, exp?: number | null, email_verified?: boolean | null, roles?: Array<{ __typename?: 'Role', name?: common.RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, abbr?: string | null, offset?: number | null, isdst?: boolean | null, text?: string | null, utc?: Array<string | null> | null } | null, firebase?: { __typename?: 'Firebase', sign_in_provider?: string | null, identities?: { __typename?: 'Identity', googlecom?: Array<string | null> | null, email?: Array<string | null> | null } | null } | null } }> }> } | null };


export const GetMyOrdersDocument = gql`
    query GetMyOrders($pagination: Pagination!) {
  getMyOrders(pagination: $pagination) {
    docs {
      orderId
      title
      description
      attachments {
        name
        location
        key
        mimeType
      }
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
          timezone {
            value
            abbr
            offset
            isdst
            text
            utc
          }
          language
          orders
          responses
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
          firebase {
            identities {
              googlecom
              email
            }
            sign_in_provider
          }
        }
      }
      createdAt
      published
      status
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
 * __useGetMyOrdersQuery__
 *
 * To run a query within a React component, call `useGetMyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOrdersQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetMyOrdersQuery(baseOptions: Apollo.QueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
      }
export function useGetMyOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
        }
export function useGetMyOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
        }
export type GetMyOrdersQueryHookResult = ReturnType<typeof useGetMyOrdersQuery>;
export type GetMyOrdersLazyQueryHookResult = ReturnType<typeof useGetMyOrdersLazyQuery>;
export type GetMyOrdersSuspenseQueryHookResult = ReturnType<typeof useGetMyOrdersSuspenseQuery>;
export type GetMyOrdersQueryResult = Apollo.QueryResult<GetMyOrdersQuery, GetMyOrdersQueryVariables>;