import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';


// Create WebSocket link
const wsLink = new WebSocketLink({
  uri: `ws://localhost:8000/graphql`,
  options: {
    reconnect: true
  }
});

//HTTP connection for request-response operations
const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql'
});


//At this we have have two links above . How do we tell the server when to use which. 
//This is achievable using the split method
//Takes three arguments - 
//1. Returns boolean
//2. If above true forwarded to second argument (wsLink)
//3. Else forwarded to third argument (httpLink)

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

//Use Apollo wrapper library to have better interactions with server

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
serviceWorker.unregister();
