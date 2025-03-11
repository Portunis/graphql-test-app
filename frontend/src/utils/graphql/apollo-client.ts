import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const apolloClient = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_API,
    cache: new InMemoryCache(),
    credentials: 'include',
});

export default apolloClient;
