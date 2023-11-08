import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOrderQueryVariables = common.Exact<{
  orderId: common.Scalars['String'];
}>;


export type GetOrderQuery = { __typename?: 'Query', getOrder?: { __typename?: 'Order', orderId: string, title: string, description?: string | null, writingStyle: common.WritingStyle, type: common.Type, numberOfPages: number, wordsPerPage?: number | null, deadline: any, createdAt?: any | null, published?: boolean | null, attachments: Array<{ __typename?: 'Attachment', name?: string | null, location?: string | null, key?: string | null, mimeType?: string | null } | null>, responses?: Array<{ __typename?: 'OrderResponse', id?: string | null, comments?: string | null, answer?: string | null, responseType?: common.ResponseType | null, createdAt?: any | null, updatedAt?: any | null, createdBy?: { __typename?: 'User', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, orders?: Array<string | null> | null, responses?: Array<string | null> | null, uid?: string | null, picture?: string | null, iss?: string | null, aud?: string | null, auth_time?: number | null, user_id?: string | null, sub?: string | null, iat?: number | null, exp?: number | null, email_verified?: boolean | null, roles?: Array<{ __typename?: 'Role', name?: common.RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, abbr?: string | null, offset?: number | null, isdst?: boolean | null, text?: string | null, utc?: Array<string | null> | null } | null, firebase?: { __typename?: 'Firebase', sign_in_provider?: string | null, identities?: { __typename?: 'Identity', googlecom?: Array<string | null> | null, email?: Array<string | null> | null } | null } | null } | null } | null> | null } | null };


export const GetOrderDocument = gql`
    query GetOrder($orderId: String!) {
  getOrder(orderId: $orderId) {
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
  }
}
    `;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;