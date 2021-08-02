import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
// !bring in apollo client
import { useQuery, useMutation } from '@apollo/client';
import {GET_ME} from '../utils/queries'
import {REMOVE_BOOK} from '../utils/mutations'

import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // const [bookSavedCount, setBookSavedCount] = useState(0)
  // const [userData, setUserData] = useState({});
  // ! tried to add caching
  const [removeBook, { error: bookError, data: bookData }] = useMutation(REMOVE_BOOK, {
    // ! try first with a refetch instead of caching?
    refetchQueries: [{query: GET_ME}]
    // update(cache, { data: { addThought } }) {
    //   try {
    //     const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

    //     cache.writeQuery({
    //       query: QUERY_THOUGHTS,
    //       data: { thoughts: [addThought, ...thoughts] },
    //     });
    //   } catch (e) {
    //     console.error(e);
    //   }

    //   // update me object's cache
    //   const { me } = cache.readQuery({ query: QUERY_ME });
    //   cache.writeQuery({
    //     query: QUERY_ME,
    //     data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
    //   });
    // },
  });
  const { loading, error: userError, data: userData }= useQuery(GET_ME,
    // !changed fetch policy so that a query to the API is forced.
    // !not does not rely on cache, but will still update cache
    // { fetchPolicy: "network-only" },
    // { onCompleted: (data) => setBookSavedCount(data.me.savedBooks.length)}
  );
  // console.log(bookSavedCount)
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    try {
      console.log(bookId);
      const bookData = removeBook({
        variables: { bookId }
      });
      if (!bookData) {
        throw new Error('something went wrong!');
      }
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
      // window.location.reload()
    } catch (err) {
      console.error(err);
    }
  };

  // ! added error handling
  if (userError) {
    return <h2>{userError.message}</h2>;
  }


  // ! changed to loading
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (userData)

    return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.me.savedBooks.length
            ? `Viewing ${userData.me.savedBooks.length} saved ${userData.me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.me.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
