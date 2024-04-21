import * as common from '../../../../graphql/common';

import { gql } from '@apollo/client';
import { UserFragmentFragmentDoc } from './UserFragment.generated';
export type OrderFragmentFragment = { __typename?: 'Order', orderId: string, title: string, description?: string | null, writingStyle: common.WritingStyle, type: common.Type, numberOfPages: number, wordsPerPage?: number | null, deadline: any, createdAt?: any | null, published?: boolean | null, status: common.OrderStatus, academicLevel?: string | null, discipline?: string | null, attachments: Array<{ __typename?: 'Attachment', name?: string | null, location?: string | null, key: string, mimeType?: string | null }>, responses: Array<{ __typename?: 'OrderResponse', id: string, comments?: string | null, answer?: string | null, responseType: common.ResponseType, createdAt: any, updatedAt: any, published: boolean, createdBy: { __typename?: 'User', id: string, email: string, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, orders?: Array<string | null> | null, responses?: Array<string | null> | null, uid?: string | null, picture?: string | null, iss?: string | null, aud?: string | null, auth_time?: number | null, user_id?: string | null, sub?: string | null, iat?: number | null, exp?: number | null, email_verified?: boolean | null, roles?: Array<{ __typename?: 'Role', name?: common.RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, abbr?: string | null, offset?: number | null, isdst?: boolean | null, text?: string | null, utc?: Array<string | null> | null } | null, firebase?: { __typename?: 'Firebase', sign_in_provider?: string | null, identities?: { __typename?: 'Identity', googlecom?: Array<string | null> | null, email?: Array<string | null> | null } | null } | null } }>, price?: { __typename?: 'Price', amount?: number | null, clientSecret?: string | null, currency?: string | null, paymentStatus?: common.PaymentStatus | null } | null, messages?: Array<{ __typename?: 'Message', id: string, message: string, createdAt: any, replyTo?: { __typename?: 'Message', message: string, createdAt: any } | null, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, password?: string | null, username?: string | null, currency?: string | null, language?: string | null, orders?: Array<string | null> | null, uid?: string | null, picture?: string | null, iss?: string | null, aud?: string | null, auth_time?: number | null, user_id?: string | null, sub?: string | null, iat?: number | null, exp?: number | null, email_verified?: boolean | null, roles?: Array<{ __typename?: 'Role', name?: common.RoleType | null } | null> | null, timezone?: { __typename?: 'Timezone', value?: string | null, abbr?: string | null, offset?: number | null, isdst?: boolean | null, text?: string | null, utc?: Array<string | null> | null } | null, firebase?: { __typename?: 'Firebase', sign_in_provider?: string | null, identities?: { __typename?: 'Identity', googlecom?: Array<string | null> | null, email?: Array<string | null> | null } | null } | null } }> | null };

export const OrderFragmentFragmentDoc = gql`
    fragment OrderFragment on Order {
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
    published
  }
  createdAt
  published
  price {
    amount
    clientSecret
    currency
    paymentStatus
  }
  status
  academicLevel
  discipline
  messages {
    id
    message
    createdAt
    replyTo {
      message
      createdAt
    }
    sender {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;