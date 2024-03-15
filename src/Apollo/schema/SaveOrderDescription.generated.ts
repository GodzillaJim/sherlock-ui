import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SaveOrderDescriptionMutationVariables = common.Exact<{
  orderId?: common.InputMaybe<common.Scalars['String']['input']>;
  description?: common.InputMaybe<common.Scalars['String']['input']>;
}>;


export type SaveOrderDescriptionMutation = { __typename?: 'Mutation', saveOrderDescription?: { __typename?: 'Response', status?: number | null, message?: string | null, success?: boolean | null } | null };


export const SaveOrderDescriptionDocument = gql`
    mutation SaveOrderDescription($orderId: String, $description: String) {
  saveOrderDescription(orderId: $orderId, description: $description) {
    status
    message
    success
  }
}
    `;
export type SaveOrderDescriptionMutationFn = Apollo.MutationFunction<SaveOrderDescriptionMutation, SaveOrderDescriptionMutationVariables>;

/**
 * __useSaveOrderDescriptionMutation__
 *
 * To run a mutation, you first call `useSaveOrderDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveOrderDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveOrderDescriptionMutation, { data, loading, error }] = useSaveOrderDescriptionMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useSaveOrderDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<SaveOrderDescriptionMutation, SaveOrderDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveOrderDescriptionMutation, SaveOrderDescriptionMutationVariables>(SaveOrderDescriptionDocument, options);
      }
export type SaveOrderDescriptionMutationHookResult = ReturnType<typeof useSaveOrderDescriptionMutation>;
export type SaveOrderDescriptionMutationResult = Apollo.MutationResult<SaveOrderDescriptionMutation>;
export type SaveOrderDescriptionMutationOptions = Apollo.BaseMutationOptions<SaveOrderDescriptionMutation, SaveOrderDescriptionMutationVariables>;