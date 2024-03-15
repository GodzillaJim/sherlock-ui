import React from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getIdToken } from "../helpers/Auth";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { isServerSide } from "../helpers/utils";

interface ApolloClientProps {
  children: JSX.Element;
}

const API = process.env.NEXT_PUBLIC_API_URL;
const uri = `${API}/graphql`;

export const createApolloClient = (authToken: string) => {
  const httpLink = new HttpLink({
    uri,
  });
  const authLink = setContext(async (_, { headers }) => {
    let token;

    // Getting a fresh token
    token = await getIdToken();

    if (!token) {
      // Alternative, use passed down
      token = authToken;
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(`GraphQL error: `, { message, path, locations });

          if (message === "Unauthorized") {
            getIdToken().then((newToken) => {
              operation.setContext({
                headers: { authorization: `Bearer ${newToken}` },
              });
            });

            return forward(operation);
          }
        });
      }

      if (networkError) {
        console.log(`Network error: `, { networkError });
      }
    }
  );

  // Retry network errors
  const retryLink = new RetryLink({
    delay: {
      initial: 500,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: 3,
      retryIf: (error) => !!error,
    },
  });

  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    ssrMode: isServerSide(),
    link: ApolloLink.from([errorLink, authLink, retryLink, httpLink]),
  });
};

export const client = createApolloClient("");
const ApolloClientProvider = ({ children }: ApolloClientProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
