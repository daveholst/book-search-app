const express = require('express');
// bring apollo server in
const { ApolloServer } = require('apollo-server-express');

const path = require('path');
const db = require('./config/connection');
// * leave in place for now, will be eventually redundant??
const routes = require('./routes');
// bring in apollo schema.
const { typeDefs, resolovers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

// create apollo server
const server = new ApolloServer({
  typeDefs,
  resolovers
})

// apple as middleware, but backwards >.<
server.applyMiddleware({ app })



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
