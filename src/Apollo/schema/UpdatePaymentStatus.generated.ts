import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdatePaymentStatusMutationVariables = common.Exact<{
  orderId: common.Scalars['String'];
}>;


export type UpdatePaymentStatusMutation = { __typename?: 'Mutation', updatePaymentStatus?: { __typename?: 'ClientSecretResponse', data?: string | null, status?: number | null, success?: boolean | null } | null };


export const UpdatePaymentStatusDocument = gql`
    mutation UpdatePaymentStatus($orderId: String!) {
  updatePaymentStatus(orderId: $orderId) {
    data
    status
    success
  }
}
    `;
export type UpdatePaymentStatusMutationFn = Apollo.MutationFunction<UpdatePaymentStatusMutation, UpdatePaymentStatusMutationVariables>;

/**
 * __useUpdatePaymentStatusMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentStatusMutation, { data, loading, error }] = useUpdatePaymentStatusMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useUpdatePaymentStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaymentStatusMutation, UpdatePaymentStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePaymentStatusMutation, UpdatePaymentStatusMutationVariables>(UpdatePaymentStatusDocument, options);
      }
export type UpdatePaymentStatusMutationHookResult = ReturnType<typeof useUpdatePaymentStatusMutation>;
export type UpdatePaymentStatusMutationResult = Apollo.MutationResult<UpdatePaymentStatusMutation>;
export type UpdatePaymentStatusMutationOptions = Apollo.BaseMutationOptions<UpdatePaymentStatusMutation, UpdatePaymentStatusMutationVariables>;