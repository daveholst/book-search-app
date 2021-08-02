import {gql} from '@apollo/client'

// ! do server end first
export const GET_ME = gql`
  query me {
    me {
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
    bookCount
    password
    email
    username
    _id
  }
  }
`;