import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { host, Props } from "./utils";

export const graphqlUri = `${host}/graphql/`;

const client = new ApolloClient({
  uri: graphqlUri,
  cache: new InMemoryCache(),
});

export const GraphQLProvider: React.FC<Props> = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
