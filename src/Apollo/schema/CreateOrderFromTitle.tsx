// noinspection GraphQLUnresolvedReference

import {gql} from "@apollo/client";

export default gql`
    mutation CreateOrderFromTitle($title: String) {
        createOrderFromTitle(title: $title) {
            status
            success
            data
        }
    }
`