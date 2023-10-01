import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { MdEdit, MdDelete } from "react-icons/md";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Card, Typography } from "@material-tailwind/react";

export default function BooksTable() {
  const [books, setBooks] = useState([]);

  const router = useRouter();
  useEffect(() => {
    // API'den kitapları çekme ve state'i güncelleme
    axios
      .get('http://localhost:5000/api/books', {
        headers: {
          Authorization: 'Bearer 64e4adb407b0373f46f66150'
        }
      })
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleAddBook = () => {
    router.push('/add-book'); // Yeni kitap ekleme sayfasına yönlendirme
  };

  const handleEditBook = (id) => {
    router.push(`/edit-book?id=${id}`); // Belirli bir kitabı düzenleme sayfasına yönlendirme
  };

  const handleDeleteBook = (id) => {
    // SweetAlert ile onay iletişim kutusu gösteriliyor
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this book!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/books/${id}`, {
            headers: {
              Authorization: 'Bearer 64e4adb407b0373f46f66150',
            },
          })
          .then(() => {
            const updatedBooks = books.filter(book => book._id !== id);
            setBooks(updatedBooks);
  
            // SweetAlert ile başarılı silme alert'i gösteriliyor
            Swal.fire({
              title: 'Deleted!',
              text: 'Book has been deleted.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            });
          })
          .catch(error => {
            console.error('Error deleting book:', error);
          });
      }
    });
  };
  return (
    <div className='relative'>
      <button
        onClick={handleAddBook}
        className='bg-green-200 rounded-full h-9 w-9 text-center flex items-center justify-center hover:bg-green-300 text-xl font-semibold'
      >
        +
      </button>
      <Card className='mt-10 h-full w-full overflow-scroll'>
        <table className='w-full min-w-max table-auto text-left bg-white rounded-lg shadow-md'>
          <thead>
            <tr>
              <th className='p-4'>Title</th>
              <th className='p-4'>Author</th>
              <th className='p-4'>Genre</th>
              <th className='p-4'>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {books.map(({ _id, title, author, genre}, index) => { //ısbn is deleted!!
              const rowStyle = index % 2 === 0 ? 'bg-gray-100' : '';
              return (
                <tr key={_id} className={`p-4 border-b bg-blue-300 ${rowStyle}`}>
                  <td className='font-normal'>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {title}
                    </Typography>
                  </td>
                  <td className='font-normal'>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {author}
                    </Typography>
                  </td>
                  <td className='font-normal'>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {genre}
                    </Typography>
                  </td>
                  <td className='font-normal'>
                    <button
                      onClick={() => handleEditBook(_id)}
                      className='text-blue-600 hover:underline mr-2'
                    >
                      <MdEdit size={24} /> 
                    </button>
                    <button
                      onClick={() => handleDeleteBook(_id)}
                      className='text-red-600 hover:underline'
                    >
                      <MdDelete size={24} /> 
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}