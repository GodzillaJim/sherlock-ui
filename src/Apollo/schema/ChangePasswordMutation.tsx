import { gql } from "@apollo/client";

export default gql`
  mutation UpdatePassword($payload: PasswordChangePayload) {
    updatePassword(payload: $payload) {
      message
      status
      success
    }
  }
`;
