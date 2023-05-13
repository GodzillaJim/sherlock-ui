// noinspection GraphQLUnresolvedReference

import {gql} from "@apollo/client";

export default gql`
    mutation DeleteAttachment($orderId: String, $attachmentKey: String) {
        deleteAttachment(orderId: $orderId, attachmentKey: $attachmentKey) {
            success
            status
            message
        }
    }
`