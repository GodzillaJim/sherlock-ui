import React, { useContext, useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NextLink,
  Operation,
} from "@apollo/client";
import { AuthContext } from "../Context/AuthManager";
import { AUTH_DETAILS } from "../config/Constants";

interface ApolloClientProps {
  children: JSX.Element;
}
const ApolloClientProvider = ({ children }: ApolloClientProps) => {
  const authContext = useContext(AuthContext);

  const token = useMemo(() => {
    if (authContext?.authDetails?.jwtToken?.jwtToken) {
      return authContext?.authDetails?.jwtToken?.jwtToken;
    }
    const authDetails = localStorage.getItem(AUTH_DETAILS);
    if (authDetails) {
      return JSON.parse(authDetails)["jwtToken"]["jwtToken"];
    }
    return "";
  }, []);

  const uri = "http://localhost:4000/graphql";
  const httpLink = new HttpLink({ uri });
  const authLink = new ApolloLink((operation: Operation, foward: NextLink) => {
    operation.setContext({
      headers: {
        Authorization: token,
      },
    });
    return foward(operation);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    headers: {
      Authorization: authContext?.authDetails?.jwtToken?.jwtToken || "",
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloClientProvider;
