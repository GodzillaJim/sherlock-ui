import * as common from '../../../../graphql/common';

import { gql } from '@apollo/client';
export type UserFragmentFragment = { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, orders?: Array<string | null> | null, uid?: string | null, picture?: string | null, iss?: string | null, aud?: string | null, auth_time?: number | null, user_id?: string | null, sub?: string | null, iat?: number | null, exp?: number | null, email_verified?: boolean | null, roles?: Array<{ __typename?: 'Role', name?: common.RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, abbr?: string | null, offset?: number | null, isdst?: boolean | null, text?: string | null, utc?: Array<string | null> | null } | null, firebase?: { __typename?: 'Firebase', sign_in_provider?: string | null, identities?: { __typename?: 'Identity', googlecom?: Array<string | null> | null, email?: Array<string | null> | null } | null } | null };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
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
    `;