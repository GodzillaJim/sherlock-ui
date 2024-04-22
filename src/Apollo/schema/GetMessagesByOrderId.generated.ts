import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import { MessageFragmentFragmentDoc } from './fragments/MessageFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMessagesByOrderIdQueryVariables = common.Exact<{
  orderId: common.Scalars['String']['input'];
}>;


export type GetMessagesByOrderIdQuery = { __typename?: 'Query', getMessagesByOrderId: Array<{ __typename?: 'Message', createdAt: any, message: string, id: string, replyTo?: { __typename?: 'Message', createdAt: any, message: string, id: string, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, orders?: Array<string | null> | null, uid?: string | null, picture?: string | null, iss?: string | null, aud?: string | null, auth_time?: number | null, user_id?: string | null, sub?: string | null, iat?: number | null, exp?: number | null, email_verified?: boolean | null, roles?: Array<{ __typename?: 'Role', name?: common.RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, abbr?: string | null, offset?: number | null, isdst?: boolean | null, text?: string | null, utc?: Array<string | null> | null } | null, firebase?: { __typename?: 'Firebase', sign_in_provider?: string | null, identities?: { __typename?: 'Identity', googlecom?: Array<string | null> | null, email?: Array<string | null> | null } | null } | null }, attachments: Array<{ __typename?: 'Attachment', key: string, location?: string | null, mimeType?: string | null, name?: string | null }> } | null, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, orders?: Array<string | null> | null, uid?: string | null, picture?: string | null, iss?: string | null, aud?: string | null, auth_time?: number | null, user_id?: string | null, sub?: string | null, iat?: number | null, exp?: number | null, email_verified?: boolean | null, roles?: Array<{ __typename?: 'Role', name?: common.RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, abbr?: string | null, offset?: number | null, isdst?: boolean | null, text?: string | null, utc?: Array<string | null> | null } | null, firebase?: { __typename?: 'Firebase', sign_in_provider?: string | null, identities?: { __typename?: 'Identity', googlecom?: Array<string | null> | null, email?: Array<string | null> | null } | null } | null }, attachments: Array<{ __typename?: 'Attachment', key: string, location?: string | null, mimeType?: string | null, name?: string | null }> }> };


export const GetMessagesByOrderIdDocument = gql`
    query GetMessagesByOrderId($orderId: String!) {
  getMessagesByOrderId(orderId: $orderId) {
    ...MessageFragment
    replyTo {
      ...MessageFragment
    }
  }
}
    ${MessageFragmentFragmentDoc}`;

/**
 * __useGetMessagesByOrderIdQuery__
 *
 * To run a query within a React component, call `useGetMessagesByOrderIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesByOrderIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesByOrderIdQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetMessagesByOrderIdQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesByOrderIdQuery, GetMessagesByOrderIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesByOrderIdQuery, GetMessagesByOrderIdQueryVariables>(GetMessagesByOrderIdDocument, options);
      }
export function useGetMessagesByOrderIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesByOrderIdQuery, GetMessagesByOrderIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesByOrderIdQuery, GetMessagesByOrderIdQueryVariables>(GetMessagesByOrderIdDocument, options);
        }
export function useGetMessagesByOrderIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMessagesByOrderIdQuery, GetMessagesByOrderIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMessagesByOrderIdQuery, GetMessagesByOrderIdQueryVariables>(GetMessagesByOrderIdDocument, options);
        }
export type GetMessagesByOrderIdQueryHookResult = ReturnType<typeof useGetMessagesByOrderIdQuery>;
export type GetMessagesByOrderIdLazyQueryHookResult = ReturnType<typeof useGetMessagesByOrderIdLazyQuery>;
export type GetMessagesByOrderIdSuspenseQueryHookResult = ReturnType<typeof useGetMessagesByOrderIdSuspenseQuery>;
export type GetMessagesByOrderIdQueryResult = Apollo.QueryResult<GetMessagesByOrderIdQuery, GetMessagesByOrderIdQueryVariables>;