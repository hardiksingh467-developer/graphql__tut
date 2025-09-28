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

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
)
