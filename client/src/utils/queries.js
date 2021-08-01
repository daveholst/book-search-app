import {gql} from '@apollo/client'

// ! do server end first
export const GET_ME = gql`
  query me {
    me {
      username
      email
      bookCount
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;