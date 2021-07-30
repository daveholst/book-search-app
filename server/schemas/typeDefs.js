const { gql } = require('apollo-server-express');

const typeDefs = gql`
# TODO types in here
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    # Pretty sure this virtual field returns an Int back
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    getUser(id: ID!): User
  }

`

module.exports = typeDefs;