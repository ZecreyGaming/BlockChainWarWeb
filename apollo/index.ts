import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { GQL_API } from "config";

import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_GQL_KEY,
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(createHttpLink({ uri: GQL_API })),
});
