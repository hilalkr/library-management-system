import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/books'); 
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div>
      <Head>
        <title>Kitaplar</title>
      </Head>
      <h1>Kitap Listesi</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>{book.title} - {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;
