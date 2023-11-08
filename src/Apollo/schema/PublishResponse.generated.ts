import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PublishResponseMutationVariables = common.Exact<{
  responseId: common.Scalars['String'];
}>;


export type PublishResponseMutation = { __typename?: 'Mutation', publishResponse?: { __typename?: 'Response', status?: number | null, message?: string | null, success?: boolean | null } | null };


export const PublishResponseDocument = gql`
    mutation PublishResponse($responseId: String!) {
  publishResponse(responseId: $responseId) {
    status
    message
    success
  }
}
    `;
export type PublishResponseMutationFn = Apollo.MutationFunction<PublishResponseMutation, PublishResponseMutationVariables>;

/**
 * __usePublishResponseMutation__
 *
 * To run a mutation, you first call `usePublishResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishResponseMutation, { data, loading, error }] = usePublishResponseMutation({
 *   variables: {
 *      responseId: // value for 'responseId'
 *   },
 * });
 */
export function usePublishResponseMutation(baseOptions?: Apollo.MutationHookOptions<PublishResponseMutation, PublishResponseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishResponseMutation, PublishResponseMutationVariables>(PublishResponseDocument, options);
      }
export type PublishResponseMutationHookResult = ReturnType<typeof usePublishResponseMutation>;
export type PublishResponseMutationResult = Apollo.MutationResult<PublishResponseMutation>;
export type PublishResponseMutationOptions = Apollo.BaseMutationOptions<PublishResponseMutation, PublishResponseMutationVariables>;