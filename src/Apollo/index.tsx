import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/g'
})

interface ApolloClientProps {
  children: JSX.Element
}
const ApolloClientProvider = ({ children }: ApolloClientProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
export default ApolloClientProvider
