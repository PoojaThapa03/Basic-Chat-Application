import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import schema from './src/graphql/schema';
import mongoose from 'mongoose';
import { PubSub } from 'apollo-server';
import { mocks } from './src/mocks';



const PORT = process.env.PORT || 8000;

const app = express();
const pubsub = new PubSub();

const apolloServer = new ApolloServer({ schema, context: { pubsub }});
apolloServer.applyMiddleware({ app });

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true });

mongoose.connection.once("open", function () {

  httpServer.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.graphqlPath}`)
  })
  console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function (err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});