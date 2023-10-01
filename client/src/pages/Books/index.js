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
};

export default BooksPage;
