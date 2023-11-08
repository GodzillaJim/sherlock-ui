import * as common from '../../../graphql/common';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnPublishResponseMutationVariables = common.Exact<{
  responseId: common.Scalars['String'];
}>;


export type UnPublishResponseMutation = { __typename?: 'Mutation', unPublishResponse?: { __typename?: 'Response', status?: number | null, message?: string | null, success?: boolean | null } | null };


export const UnPublishResponseDocument = gql`
    mutation UnPublishResponse($responseId: String!) {
  unPublishResponse(responseId: $responseId) {
    status
    message
    success
  }
}
    `;
export type UnPublishResponseMutationFn = Apollo.MutationFunction<UnPublishResponseMutation, UnPublishResponseMutationVariables>;

/**
 * __useUnPublishResponseMutation__
 *
 * To run a mutation, you first call `useUnPublishResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnPublishResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unPublishResponseMutation, { data, loading, error }] = useUnPublishResponseMutation({
 *   variables: {
 *      responseId: // value for 'responseId'
 *   },
 * });
 */
export function useUnPublishResponseMutation(baseOptions?: Apollo.MutationHookOptions<UnPublishResponseMutation, UnPublishResponseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnPublishResponseMutation, UnPublishResponseMutationVariables>(UnPublishResponseDocument, options);
      }
export type UnPublishResponseMutationHookResult = ReturnType<typeof useUnPublishResponseMutation>;
export type UnPublishResponseMutationResult = Apollo.MutationResult<UnPublishResponseMutation>;
export type UnPublishResponseMutationOptions = Apollo.BaseMutationOptions<UnPublishResponseMutation, UnPublishResponseMutationVariables>;