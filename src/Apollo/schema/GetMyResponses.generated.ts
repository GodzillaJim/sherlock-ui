import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyResponsesQueryVariables = common.Exact<{ [key: string]: never; }>;


export type MyResponsesQuery = { __typename?: 'Query', getMyResponses?: Array<{ __typename?: 'OrderResponse', id?: string | null, comments?: string | null, answer?: string | null, responseType?: common.ResponseType | null, createdAt?: any | null, updatedAt?: any | null, question?: { __typename?: 'Order', title: string } | null, createdBy?: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, orders?: Array<string | null> | null, responses?: Array<string | null> | null, uid?: string | null, picture?: string | null, iss?: string | null, aud?: string | null, auth_time?: number | null, user_id?: string | null, sub?: string | null, iat?: number | null, exp?: number | null, email_verified?: boolean | null, roles?: Array<{ __typename?: 'Role', name?: common.RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, abbr?: string | null, offset?: number | null, isdst?: boolean | null, text?: string | null, utc?: Array<string | null> | null } | null, firebase?: { __typename?: 'Firebase', sign_in_provider?: string | null, identities?: { __typename?: 'Identity', googlecom?: Array<string | null> | null, email?: Array<string | null> | null } | null } | null } | null } | null> | null };


export const MyResponsesDocument = gql`
    query MyResponses {
  getMyResponses {
    id
    comments
    answer
    responseType
    createdAt
    updatedAt
    question {
      title
    }
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
}
    `;

/**
 * __useMyResponsesQuery__
 *
 * To run a query within a React component, call `useMyResponsesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyResponsesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyResponsesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyResponsesQuery(baseOptions?: Apollo.QueryHookOptions<MyResponsesQuery, MyResponsesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyResponsesQuery, MyResponsesQueryVariables>(MyResponsesDocument, options);
      }
export function useMyResponsesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyResponsesQuery, MyResponsesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyResponsesQuery, MyResponsesQueryVariables>(MyResponsesDocument, options);
        }
export type MyResponsesQueryHookResult = ReturnType<typeof useMyResponsesQuery>;
export type MyResponsesLazyQueryHookResult = ReturnType<typeof useMyResponsesLazyQuery>;
export type MyResponsesQueryResult = Apollo.QueryResult<MyResponsesQuery, MyResponsesQueryVariables>;