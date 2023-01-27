import React, { useContext } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AuthContext } from "../Context/AuthManager";

interface ApolloClientProps {
  children: JSX.Element;
}
const ApolloClientProvider = ({ children }: ApolloClientProps) => {
  const authContext = useContext(AuthContext);

  React.useEffect(() => {
    console.log("Auth Context: ", authContext?.authDetails);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
    headers: {
      Authorization: authContext?.authDetails?.jwtToken?.jwtToken || "",
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloClientProvider;
