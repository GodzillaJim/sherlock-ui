import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddOrderResponseMutationVariables = common.Exact<{
  orderId?: common.InputMaybe<common.Scalars['String']>;
  orderResponse?: common.InputMaybe<common.OrderResponseInput>;
}>;


export type AddOrderResponseMutation = { __typename?: 'Mutation', addOrderResponse?: { __typename?: 'AddResponseFeedback', data?: string | null, success?: boolean | null, status?: number | null } | null };


export const AddOrderResponseDocument = gql`
    mutation AddOrderResponse($orderId: String, $orderResponse: OrderResponseInput) {
  addOrderResponse(orderId: $orderId, orderResponse: $orderResponse) {
    data
    success
    status
  }
}
    `;
export type AddOrderResponseMutationFn = Apollo.MutationFunction<AddOrderResponseMutation, AddOrderResponseMutationVariables>;

/**
 * __useAddOrderResponseMutation__
 *
 * To run a mutation, you first call `useAddOrderResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrderResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrderResponseMutation, { data, loading, error }] = useAddOrderResponseMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      orderResponse: // value for 'orderResponse'
 *   },
 * });
 */
export function useAddOrderResponseMutation(baseOptions?: Apollo.MutationHookOptions<AddOrderResponseMutation, AddOrderResponseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrderResponseMutation, AddOrderResponseMutationVariables>(AddOrderResponseDocument, options);
      }
export type AddOrderResponseMutationHookResult = ReturnType<typeof useAddOrderResponseMutation>;
export type AddOrderResponseMutationResult = Apollo.MutationResult<AddOrderResponseMutation>;
export type AddOrderResponseMutationOptions = Apollo.BaseMutationOptions<AddOrderResponseMutation, AddOrderResponseMutationVariables>;