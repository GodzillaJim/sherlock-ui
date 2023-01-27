import { gql } from '@apollo/client'

export const query = gql(`
  mutation Login($payload: LoginPayload) {
    login(payload: $payload) {
      email
      firstName
      jwtToken {
        expiry
        id
        jwtToken
        type
      }
      roles {
        name
      }
    }
  }
`)
