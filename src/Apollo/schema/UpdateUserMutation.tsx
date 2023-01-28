import { gql } from "@apollo/client";

export const UpdateUserMutation = gql`
  mutation UpdateUser($payload: UserUpdatePayload) {
    updateUser(payload: $payload) {
      success
      status
      message
    }
  }
`;
