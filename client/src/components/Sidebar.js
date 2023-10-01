

import React from 'react';
import { useEffect, useState } from 'react';


const Sidebar = () => {
  const [username, setUsername] = useState('');


  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  
  return (
    <div className="bg-gray-800 text-white h-screen w-64 p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Library System</h2>
        <p className="text-sm">Welcome, {username}</p>
      </div>
      <ul className="space-y-2">
        <li>
          <a href="/home" className="block text-gray-300 hover:text-white hover:bg-gray-600 p-2 rounded">
            Ana Sayfa
          </a>
        </li>
        <li>
          <a href="#" className="block text-gray-300 hover:text-white hover:bg-gray-600 p-2 rounded">
            Kitaplar
          </a>
        </li>
        <li>
          <a href="#" className="block text-gray-300 hover:text-white hover:bg-gray-600 p-2 rounded">
            Kategoriler
          </a>
        </li>
        <li>
          <a href="#" className="block text-gray-300 hover:text-white hover:bg-gray-600 p-2 rounded">
            Kullanıcılar
          </a>
        </li>
        <li>
          <a href="#" className="block text-gray-300 hover:text-white hover:bg-gray-600 p-2 rounded">
            İstatistikler
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
