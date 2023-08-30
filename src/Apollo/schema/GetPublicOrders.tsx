import {gql} from "@apollo/client";

export default gql`
    query GetPublicOrders($pagination: Pagination, $filter: FilterOrders) {
        getPublicOrders(pagination: $pagination, filter: $filter) {
            totalDocs
            totalPages
            docs {
                title
                orderId
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
                    date
                    attachments
                    comments
                    answer
                    type
                }
                createdAt
                published
            }
            limit
            hasPrevPage
            hasNextPage
            page
            offset
            prevPage
            nextPage
            pagingCounter
        }
    }
`