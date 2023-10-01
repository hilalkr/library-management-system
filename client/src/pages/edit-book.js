import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Input } from "@material-tailwind/react";
export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/books/${id}`, {
        headers: {
          Authorization: 'Bearer 64e4adb407b0373f46f66150',
        },
      })
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book:', error);
      });
    }
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/books/${id}`, book, {
      headers: {
        Authorization: 'Bearer 64e4adb407b0373f46f66150' 
      }
    })
    .then(response => {
      router.push('/');
    })
    .catch(error => {
      console.error('Error updating book:', error);
    });
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <Input
        type='text'
        name='title'
        label='Title'
        value={book.title || ''}
        onChange={handleInputChange}
      />
      <Input
        type='text'
        name='author'
        label='Author'
        value={book.author || ''}
        onChange={handleInputChange}
      />
      <Input
        type='text'
        name='genre'
        label='Genre'
        value={book.genre || ''}
        onChange={handleInputChange}
      />
      <Input
        type='text'
        name='isbn'
        label='ISBN'
        value={book.isbn || ''}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
