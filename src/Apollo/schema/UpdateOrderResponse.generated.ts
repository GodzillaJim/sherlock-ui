import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOrderResponseMutationVariables = common.Exact<{
  orderId?: common.InputMaybe<common.Scalars['String']>;
  responseId?: common.InputMaybe<common.Scalars['String']>;
  orderResponseInput?: common.InputMaybe<common.OrderResponseInput>;
}>;


export type UpdateOrderResponseMutation = { __typename?: 'Mutation', updateOrderResponse?: { __typename?: 'AddResponseFeedback', data?: string | null, success?: boolean | null, status?: number | null } | null };


export const UpdateOrderResponseDocument = gql`
    mutation UpdateOrderResponse($orderId: String, $responseId: String, $orderResponseInput: OrderResponseInput) {
  updateOrderResponse(
    orderId: $orderId
    responseId: $responseId
    orderResponseInput: $orderResponseInput
  ) {
    data
    success
    status
  }
}
    `;
export type UpdateOrderResponseMutationFn = Apollo.MutationFunction<UpdateOrderResponseMutation, UpdateOrderResponseMutationVariables>;

/**
 * __useUpdateOrderResponseMutation__
 *
 * To run a mutation, you first call `useUpdateOrderResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderResponseMutation, { data, loading, error }] = useUpdateOrderResponseMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      responseId: // value for 'responseId'
 *      orderResponseInput: // value for 'orderResponseInput'
 *   },
 * });
 */
export function useUpdateOrderResponseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderResponseMutation, UpdateOrderResponseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderResponseMutation, UpdateOrderResponseMutationVariables>(UpdateOrderResponseDocument, options);
      }
export type UpdateOrderResponseMutationHookResult = ReturnType<typeof useUpdateOrderResponseMutation>;
export type UpdateOrderResponseMutationResult = Apollo.MutationResult<UpdateOrderResponseMutation>;
export type UpdateOrderResponseMutationOptions = Apollo.BaseMutationOptions<UpdateOrderResponseMutation, UpdateOrderResponseMutationVariables>;