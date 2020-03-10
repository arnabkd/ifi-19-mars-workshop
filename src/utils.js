import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { gql } from "apollo-boost";

const link = new HttpLink({
  uri: "https://www.graphqlhub.com/graphql"
});
export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

const getData = async query => {
  const result = await client.query({ query });
  return result.data;
};

export const getTwitterDataFor = async username => {
  const query = gql(`{
      twitter {
        user(identifier: name, identity: "${username}") {
          description
          name
          tweets(limit: 1) {
            text
          }
        }
      }
    }`);
  return getData(query);
};
