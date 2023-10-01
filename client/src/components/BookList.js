

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/books') 
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book" key={book._id}>
          <img src={book.imageUrl} alt={book.title} />
          <h2>{book.title}</h2>
          <p>Yazar: {book.author}</p>
          <p>Yayın Tarihi: {book.publishDate}</p>
        
        </div>
      ))}
    </div>
  );
}

export default BookList;
