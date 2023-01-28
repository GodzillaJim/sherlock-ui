import { gql } from "@apollo/client";

export const mutation = gql`
  mutation Register($payload: RegisterPayload) {
    register(payload: $payload) {
      email
      firstName
      jwtToken {
        expiry
        id
        jwtToken
        type
      }
    }
  }
`;
