import React, { useState } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};


export default function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [ISBN, setISBN] = useState('');
  const [createdBy, setcreatedBy] = useState('');

  const addNotification = (message, error) => {
   if (error==true){
    toastr.success(message);
   } else{
    toastr.error(message);
   }
   

  };

  const handleSubmit = () => {
    const newBook = {
      title,
      author,
      genre,
      ISBN,
      createdBy
    };

    axios.post('http://localhost:5000/api/books', newBook, {
        headers: {
          Authorization: 'Bearer 64e4adb407b0373f46f66150' 
        }
      })
      .then(response => {
        addNotification('New book added successfully!');
        // ...
      })
      .catch(error => {
        console.error('Error adding book:', error);
        if (error.response) {
          console.log(error.response.data); // Sunucudan gelen hata verisi
          console.log(error.response.status); // Hata durum kodu
          console.log(error.response.headers); // Hata yanıt başlıkları
          addNotification('An error occurred while adding the book.');
        }
      });
      
  };

  return (
    <div>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
      <input type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} />
      <input type="text" placeholder="ISBN" value={ISBN} onChange={e => setISBN(e.target.value)} />
      <input type="text" placeholder="createdBy" value={createdBy} onChange={e => setcreatedBy(e.target.value)} />
      <button onClick={handleSubmit}>Add Book</button>
    </div>
  );
}
