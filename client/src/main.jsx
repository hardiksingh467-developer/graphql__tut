// dependencies imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

// file imports
import './index.css'
import App from './App.jsx'

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),// give URI of Backend
  cache: new InMemoryCache(),// specfies where we want to cache our data
});

// Now we will write our Queries, a query is simply a string that we will pass to our apollo client to fetch data from our GraphQL server
// we write query by mentioning that we are writing a query, then we give the name of the query, here we are naming it GetTodos, then in curly braces we write the actual query that we want to perform, here we want to perform readTodos query as defined in our server schema, and inside that we specify what fields we want to fetch for each Todo item
// we can also pass arguments to our queries, for example if we want to fetch a user by their ID, we can define a query readUserById(id: ID!), and then pass the id as an argument when we call this query using apollo client
const query = `
query GetTodos {
  readTodos {
    id
  }
}
`;

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
)
