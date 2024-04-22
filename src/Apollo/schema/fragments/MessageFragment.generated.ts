import * as common from '../../../../graphql/common';

import { gql } from '@apollo/client';
import { UserFragmentFragmentDoc } from './UserFragment.generated';
export type MessageFragmentFragment = { __typename?: 'Message', createdAt: any, message: string, id: string, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, orders?: Array<string | null> | null, uid?: string | null, picture?: string | null, iss?: string | null, aud?: string | null, auth_time?: number | null, user_id?: string | null, sub?: string | null, iat?: number | null, exp?: number | null, email_verified?: boolean | null, roles?: Array<{ __typename?: 'Role', name?: common.RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, abbr?: string | null, offset?: number | null, isdst?: boolean | null, text?: string | null, utc?: Array<string | null> | null } | null, firebase?: { __typename?: 'Firebase', sign_in_provider?: string | null, identities?: { __typename?: 'Identity', googlecom?: Array<string | null> | null, email?: Array<string | null> | null } | null } | null }, attachments: Array<{ __typename?: 'Attachment', key: string, location?: string | null, mimeType?: string | null, name?: string | null }> };

export const MessageFragmentFragmentDoc = gql`
    fragment MessageFragment on Message {
  createdAt
  sender {
    ...UserFragment
  }
  message
  attachments {
    key
    location
    mimeType
    name
  }
  id
}
    ${UserFragmentFragmentDoc}`;