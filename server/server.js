const express = require('express');
// bring apollo server in
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
// * leave in place for now, will be eventually redundant??
// const route`s = require('./routes');
// bring in apollo schema.

const PORT = process.env.PORT || 3001;
const app = express();

// ! had to do this due to some weird issue in v3 of

const apolloServer = (async function startApolloServer() {
  //   // create apollo server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  return apolloServer

})()


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// use old routing
// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
});
