import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/books/${id}`, {
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
    // Boş alanları kontrol et
    if (!book.title || !book.author || !book.genre ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all fields.',
      });
      return;
    }
  
    axios.put(`http://localhost:5000/api/books/${id}`, book, {
      headers: {
        Authorization: 'Bearer 64e4adb407b0373f46f66150',
      },
    })
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Updated Book',
          text: 'Book has been updated successfully.',
        });
        router.push('/book');
      })
      .catch(error => {
        console.error('Error updating book:', error);
      });
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Edit Book</h1>
      <div style={{ marginBottom: '10px' }}>
        <label>Title:</label>
        <input 
          type='text'
          name='title'
          value={book.title || ''}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Author:</label>
        <input 
          type='text'
          name='author'
          value={book.author || ''}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Genre:</label>
        <input 
          type='text'
          name='genre'
          value={book.genre || ''}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};


