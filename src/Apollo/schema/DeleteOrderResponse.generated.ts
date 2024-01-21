import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteOrderResponseMutationVariables = common.Exact<{
  responsesId: common.Scalars['String'];
}>;


export type DeleteOrderResponseMutation = { __typename?: 'Mutation', deleteOrderResponse?: { __typename?: 'Response', message?: string | null, status?: number | null, success?: boolean | null } | null };


export const DeleteOrderResponseDocument = gql`
    mutation deleteOrderResponse($responsesId: String!) {
  deleteOrderResponse(responseId: $responsesId) {
    message
    status
    success
  }
}
    `;
export type DeleteOrderResponseMutationFn = Apollo.MutationFunction<DeleteOrderResponseMutation, DeleteOrderResponseMutationVariables>;

/**
 * __useDeleteOrderResponseMutation__
 *
 * To run a mutation, you first call `useDeleteOrderResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderResponseMutation, { data, loading, error }] = useDeleteOrderResponseMutation({
 *   variables: {
 *      responsesId: // value for 'responsesId'
 *   },
 * });
 */
export function useDeleteOrderResponseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderResponseMutation, DeleteOrderResponseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrderResponseMutation, DeleteOrderResponseMutationVariables>(DeleteOrderResponseDocument, options);
      }
export type DeleteOrderResponseMutationHookResult = ReturnType<typeof useDeleteOrderResponseMutation>;
export type DeleteOrderResponseMutationResult = Apollo.MutationResult<DeleteOrderResponseMutation>;
export type DeleteOrderResponseMutationOptions = Apollo.BaseMutationOptions<DeleteOrderResponseMutation, DeleteOrderResponseMutationVariables>;