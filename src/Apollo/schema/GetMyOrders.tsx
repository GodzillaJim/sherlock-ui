// noinspection GraphQLUnresolvedReference

import {gql} from "@apollo/client";

export default gql`
    query GetMyOrders($pagination: Pagination) {
        getMyOrders(pagination: $pagination) {
            docs {
                orderId
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
                    type
                    __typename
                }
                createdAt
                published
            }
            totalDocs
            limit
            hasPrevPage
            hasNextPage
            page
            totalPages
            offset
            prevPage
            nextPage
            pagingCounter
        }
    }
`