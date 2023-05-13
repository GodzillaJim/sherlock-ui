// noinspection GraphQLUnresolvedReference

import {gql} from "@apollo/client";

export default gql`
    mutation UpdateOrder($orderId: String, $orderInput: OrderInput) {
        updateOrder(orderInput: $orderInput, orderId: $orderId) {
            status
            message
            success
        }
    }
`