import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOrderResponseQueryVariables = common.Exact<{
  responseId: common.Scalars['String'];
}>;


export type GetOrderResponseQuery = { __typename?: 'Query', getOrderResponse?: { __typename?: 'GetOrderResponse', status?: number | null, success?: boolean | null, data?: { __typename?: 'OrderResponse', id?: string | null, comments?: string | null, answer?: string | null, responseType?: common.ResponseType | null, createdAt?: any | null, updatedAt?: any | null, published?: boolean | null, attachments?: Array<{ __typename?: 'Attachment', name?: string | null, location?: string | null, key?: string | null, mimeType?: string | null } | null> | null, createdBy?: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, orders?: Array<string | null> | null, responses?: Array<string | null> | null, uid?: string | null, picture?: string | null, iss?: string | null, aud?: string | null, auth_time?: number | null, user_id?: string | null, sub?: string | null, iat?: number | null, exp?: number | null, email_verified?: boolean | null, roles?: Array<{ __typename?: 'Role', name?: common.RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, abbr?: string | null, offset?: number | null, isdst?: boolean | null, text?: string | null, utc?: Array<string | null> | null } | null, firebase?: { __typename?: 'Firebase', sign_in_provider?: string | null, identities?: { __typename?: 'Identity', googlecom?: Array<string | null> | null, email?: Array<string | null> | null } | null } | null } | null, question?: { __typename?: 'Order', title: string, orderId: string } | null } | null } | null };


export const GetOrderResponseDocument = gql`
    query GetOrderResponse($responseId: String!) {
  getOrderResponse(responseId: $responseId) {
    data {
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
      question {
        title
        orderId
      }
      published
    }
    status
    success
  }
}
    `;

/**
 * __useGetOrderResponseQuery__
 *
 * To run a query within a React component, call `useGetOrderResponseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderResponseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderResponseQuery({
 *   variables: {
 *      responseId: // value for 'responseId'
 *   },
 * });
 */
export function useGetOrderResponseQuery(baseOptions: Apollo.QueryHookOptions<GetOrderResponseQuery, GetOrderResponseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderResponseQuery, GetOrderResponseQueryVariables>(GetOrderResponseDocument, options);
      }
export function useGetOrderResponseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderResponseQuery, GetOrderResponseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderResponseQuery, GetOrderResponseQueryVariables>(GetOrderResponseDocument, options);
        }
export type GetOrderResponseQueryHookResult = ReturnType<typeof useGetOrderResponseQuery>;
export type GetOrderResponseLazyQueryHookResult = ReturnType<typeof useGetOrderResponseLazyQuery>;
export type GetOrderResponseQueryResult = Apollo.QueryResult<GetOrderResponseQuery, GetOrderResponseQueryVariables>;