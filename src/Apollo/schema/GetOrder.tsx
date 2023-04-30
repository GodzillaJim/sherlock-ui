// noinspection GraphQLUnresolvedReference

import {gql} from "@apollo/client";

export default gql`
    query GetOrder($orderId: String!) {
        getOrder(orderId: $orderId) {
            title
            description
            attachments {
                key
                location
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