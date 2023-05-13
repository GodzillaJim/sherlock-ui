// noinspection GraphQLUnresolvedReference

import {gql} from "@apollo/client";

export default gql`
    query GetOrder($orderId: String!) {
        getOrder(orderId: $orderId) {
            title
            description
            attachments {
                name
                location
                key
                mimeType
            }
            writingStyle
            type
            numberOfPages
            wordsPerPage
            deadline
            responses {
                answer
                attachments
                comments
                date
            }
            createdAt
            orderId
            published
        }
    }
`