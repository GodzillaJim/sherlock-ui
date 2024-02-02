import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GeneratePaymentIntentMutationVariables = common.Exact<{
  orderId: common.Scalars['String'];
}>;


export type GeneratePaymentIntentMutation = { __typename?: 'Mutation', generatePaymentIntent?: { __typename?: 'ClientSecretResponse', data?: string | null, success?: boolean | null, status?: number | null } | null };


export const GeneratePaymentIntentDocument = gql`
    mutation GeneratePaymentIntent($orderId: String!) {
  generatePaymentIntent(orderId: $orderId) {
    data
    success
    status
  }
}
    `;
export type GeneratePaymentIntentMutationFn = Apollo.MutationFunction<GeneratePaymentIntentMutation, GeneratePaymentIntentMutationVariables>;

/**
 * __useGeneratePaymentIntentMutation__
 *
 * To run a mutation, you first call `useGeneratePaymentIntentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGeneratePaymentIntentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generatePaymentIntentMutation, { data, loading, error }] = useGeneratePaymentIntentMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGeneratePaymentIntentMutation(baseOptions?: Apollo.MutationHookOptions<GeneratePaymentIntentMutation, GeneratePaymentIntentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GeneratePaymentIntentMutation, GeneratePaymentIntentMutationVariables>(GeneratePaymentIntentDocument, options);
      }
export type GeneratePaymentIntentMutationHookResult = ReturnType<typeof useGeneratePaymentIntentMutation>;
export type GeneratePaymentIntentMutationResult = Apollo.MutationResult<GeneratePaymentIntentMutation>;
export type GeneratePaymentIntentMutationOptions = Apollo.BaseMutationOptions<GeneratePaymentIntentMutation, GeneratePaymentIntentMutationVariables>;