import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// !bring in apollo client
import { useQuery, useMutation } from '@apollo/client';
import {GET_ME} from '../utils/queries'
import {REMOVE_BOOK} from '../utils/mutations'

import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {

  const [removeBook, { error: bookError, data: bookData }] = useMutation(REMOVE_BOOK, {
    // ! try first with a refetch instead of caching?
    // * works well, could be optimised for direct cahceWrites without the network traffic
    refetchQueries: [{query: GET_ME}]

  });
  const { loading, error: userError, data: userData }= useQuery(GET_ME,
    // *this was required before succesful caching
    // { fetchPolicy: "network-only" },
  );
  const handleDeleteBook = async (bookId) => {
    try {
      const bookData = removeBook({
        variables: { bookId }
      });
      if (!bookData) {
        throw new Error('something went wrong!');
      }
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
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
