import { gql } from '@apollo/client'

export const query = gql(`
  query SignIn($payload: LoginParams!) {
    signIn(payload: $payload) {
      token
      firstName
      lastName
      roles {
        name
      }
    }
  }
`)
