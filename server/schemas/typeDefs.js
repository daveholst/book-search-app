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
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getSingleUser(id: ID!): User
    me: User
  }

  union BookUser = Book | User

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String, username: String, password: String!): Auth
    saveBook(
      authors: [String],
      description: String!,
      bookId: String!,
      image: String,
      link: String,
      title: String!

      ): Book
    removeBook(bookId: String!): Book
  }

`

module.exports = typeDefs;