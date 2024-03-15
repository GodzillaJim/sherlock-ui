import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnPublishOrderMutationVariables = common.Exact<{
  orderId: common.Scalars['String']['input'];
}>;


export type UnPublishOrderMutation = { __typename?: 'Mutation', unPublishOrder?: { __typename?: 'Response', status?: number | null, message?: string | null, success?: boolean | null } | null };


export const UnPublishOrderDocument = gql`
    mutation UnPublishOrder($orderId: String!) {
  unPublishOrder(orderId: $orderId) {
    status
    message
    success
  }
}
    `;
export type UnPublishOrderMutationFn = Apollo.MutationFunction<UnPublishOrderMutation, UnPublishOrderMutationVariables>;

/**
 * __useUnPublishOrderMutation__
 *
 * To run a mutation, you first call `useUnPublishOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnPublishOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unPublishOrderMutation, { data, loading, error }] = useUnPublishOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useUnPublishOrderMutation(baseOptions?: Apollo.MutationHookOptions<UnPublishOrderMutation, UnPublishOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnPublishOrderMutation, UnPublishOrderMutationVariables>(UnPublishOrderDocument, options);
      }
export type UnPublishOrderMutationHookResult = ReturnType<typeof useUnPublishOrderMutation>;
export type UnPublishOrderMutationResult = Apollo.MutationResult<UnPublishOrderMutation>;
export type UnPublishOrderMutationOptions = Apollo.BaseMutationOptions<UnPublishOrderMutation, UnPublishOrderMutationVariables>;