// noinspection GraphQLUnresolvedReference

import {gql} from "@apollo/client";

export default gql`
    mutation SaveOrderDescription($description: JSON!, $orderId: String) {
        saveOrderDescription(description: $description, orderId: $orderId) {
            status
            message
            success
        }
    }
`