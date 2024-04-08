import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendOrderMessageMutationVariables = common.Exact<{
  input: common.SendOrderMessageInput;
}>;


export type SendOrderMessageMutation = { __typename?: 'Mutation', sendOrderMessage?: { __typename?: 'Response', message?: string | null, success?: boolean | null, status?: number | null } | null };


export const SendOrderMessageDocument = gql`
    mutation SendOrderMessage($input: SendOrderMessageInput!) {
  sendOrderMessage(input: $input) {
    message
    success
    status
  }
}
    `;
export type SendOrderMessageMutationFn = Apollo.MutationFunction<SendOrderMessageMutation, SendOrderMessageMutationVariables>;

/**
 * __useSendOrderMessageMutation__
 *
 * To run a mutation, you first call `useSendOrderMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOrderMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOrderMessageMutation, { data, loading, error }] = useSendOrderMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendOrderMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendOrderMessageMutation, SendOrderMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendOrderMessageMutation, SendOrderMessageMutationVariables>(SendOrderMessageDocument, options);
      }
export type SendOrderMessageMutationHookResult = ReturnType<typeof useSendOrderMessageMutation>;
export type SendOrderMessageMutationResult = Apollo.MutationResult<SendOrderMessageMutation>;
export type SendOrderMessageMutationOptions = Apollo.BaseMutationOptions<SendOrderMessageMutation, SendOrderMessageMutationVariables>;