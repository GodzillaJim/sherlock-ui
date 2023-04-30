import React from "react";
import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, NextLink, Operation,} from "@apollo/client";
import Cookies from "js-cookie";

interface ApolloClientProps {
    children: JSX.Element;
}

const token = Cookies.get("authToken");
const uri = "http://localhost:4000/graphql";
const httpLink = new HttpLink({uri});
const authLink = new ApolloLink((operation: Operation, forward: NextLink) => {
    operation.setContext({
        headers: {
            Authorization: `Bearer ${token}` || "",
        },
    });
    return forward(operation);
});

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    headers: {
        Authorization: `Bearer ${token}` || "",
    },
});

export const createApolloClient = (token: string) => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
        headers: {
            Authorization: `Bearer ${token}` || "",
        },
    });
}
const ApolloClientProvider = ({children}: ApolloClientProps) => {
    if (typeof window === undefined) {
        return <div/>;
    }

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
