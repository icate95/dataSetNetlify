//Open up src/index.js. Remove everything there and add the following.

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
// const client = new ApolloClient({
//   uri: "/.netlify/functions/graphql"
// });

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));