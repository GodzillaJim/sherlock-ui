import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteOrderResponseAttachmentMutationVariables = common.Exact<{
  responseId: common.Scalars['String'];
  attachmentKey: common.Scalars['String'];
}>;


export type DeleteOrderResponseAttachmentMutation = { __typename?: 'Mutation', deleteOrderResponseAttachment?: { __typename?: 'Response', status?: number | null, message?: string | null, success?: boolean | null } | null };


export const DeleteOrderResponseAttachmentDocument = gql`
    mutation DeleteOrderResponseAttachment($responseId: String!, $attachmentKey: String!) {
  deleteOrderResponseAttachment(
    responseId: $responseId
    attachmentKey: $attachmentKey
  ) {
    status
    message
    success
  }
}
    `;
export type DeleteOrderResponseAttachmentMutationFn = Apollo.MutationFunction<DeleteOrderResponseAttachmentMutation, DeleteOrderResponseAttachmentMutationVariables>;

/**
 * __useDeleteOrderResponseAttachmentMutation__
 *
 * To run a mutation, you first call `useDeleteOrderResponseAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderResponseAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderResponseAttachmentMutation, { data, loading, error }] = useDeleteOrderResponseAttachmentMutation({
 *   variables: {
 *      responseId: // value for 'responseId'
 *      attachmentKey: // value for 'attachmentKey'
 *   },
 * });
 */
export function useDeleteOrderResponseAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderResponseAttachmentMutation, DeleteOrderResponseAttachmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrderResponseAttachmentMutation, DeleteOrderResponseAttachmentMutationVariables>(DeleteOrderResponseAttachmentDocument, options);
      }
export type DeleteOrderResponseAttachmentMutationHookResult = ReturnType<typeof useDeleteOrderResponseAttachmentMutation>;
export type DeleteOrderResponseAttachmentMutationResult = Apollo.MutationResult<DeleteOrderResponseAttachmentMutation>;
export type DeleteOrderResponseAttachmentMutationOptions = Apollo.BaseMutationOptions<DeleteOrderResponseAttachmentMutation, DeleteOrderResponseAttachmentMutationVariables>;