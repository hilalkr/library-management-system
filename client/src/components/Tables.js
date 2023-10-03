import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { MdEdit, MdDelete } from "react-icons/md";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Card, Typography } from "@material-tailwind/react";
import Navbar  from '../components/Navbar';

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
          .delete(`http://localhost:5000/api/books/${id}`, {
            headers: {
              Authorization: 'Bearer 64e4adb407b0373f46f66150',
            },
          })
          .then(() => {
            const updatedBooks = books.filter(book => book.id !== id);
            setBooks(updatedBooks);
  
           
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
    <Navbar />
      <Card className='mt-10 h-full w-full overflow-scroll '>
        <table className='w-full min-w-max table-auto text-left bg-white rounded-lg shadow-md'>
          <thead>
            <tr>
              <th className='p-4 text-center text-xl '>Title</th>
              <th className='p-4 text-center text-xl'>Author</th>
              <th className='p-4 text-center text-xl'>Genre</th>
              <th className='p-4 text-center text-xl'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(({ id, title, author, genre }, index) => {
              const rowStyle = index % 2 === 0 ? 'bg-gray-100' : '';
              return (
                <tr key={id} className={`p-4 border-b ${rowStyle}`}>
                  <td className='p-4 text-center'>
                    <Typography variant='small' color='blue-gray' className='text-lg font-medium shadow-md px-4 py-2 rounded-md'>
                      {title}
                    </Typography>
                  </td>
                  <td className='p-4 text-center'>
                    <Typography variant='small' color='blue-gray' className='text-lg font-medium shadow-md px-4 py-2 rounded-md'>
                      {author}
                    </Typography>
                  </td>
                  <td className='p-4 text-center'>
                    <Typography variant='small' color='blue-gray' className='text-lg font-medium shadow-md px-4 py-2 rounded-md'>
                      {genre}
                    </Typography>
                  </td>
                  <td className='p-4 text-center'>
                    <button
                      onClick={() => handleEditBook(id)}
                      className='text-blue-600 hover:underline mr-2'
                    >
                      <MdEdit size={24} />
                    </button>
                    <button
                      onClick={() => handleDeleteBook(id)}
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
      <div className='flex items-center justify-center mt-7'>
        <button
          onClick={handleAddBook}
          className='bg-orange-500 hover:bg-orange-600 text-white rounded h-12 px-4 mt-10 flex items-center justify-center text-2xl font-semibold fixed z-10 shadow-lg'
          style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
          Add Book +
        </button>
      </div>
    </div>
  );
}