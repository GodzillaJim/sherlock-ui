import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PublishOrderMutationVariables = common.Exact<{
  orderId: common.Scalars['String'];
}>;


export type PublishOrderMutation = { __typename?: 'Mutation', publishOrder?: { __typename?: 'Response', status?: number | null, message?: string | null, success?: boolean | null } | null };


export const PublishOrderDocument = gql`
    mutation PublishOrder($orderId: String!) {
  publishOrder(orderId: $orderId) {
    status
    message
    success
  }
}
    `;
export type PublishOrderMutationFn = Apollo.MutationFunction<PublishOrderMutation, PublishOrderMutationVariables>;

/**
 * __usePublishOrderMutation__
 *
 * To run a mutation, you first call `usePublishOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishOrderMutation, { data, loading, error }] = usePublishOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function usePublishOrderMutation(baseOptions?: Apollo.MutationHookOptions<PublishOrderMutation, PublishOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishOrderMutation, PublishOrderMutationVariables>(PublishOrderDocument, options);
      }
export type PublishOrderMutationHookResult = ReturnType<typeof usePublishOrderMutation>;
export type PublishOrderMutationResult = Apollo.MutationResult<PublishOrderMutation>;
export type PublishOrderMutationOptions = Apollo.BaseMutationOptions<PublishOrderMutation, PublishOrderMutationVariables>;