

import React from 'react';
import { useEffect, useState } from 'react';
import cookie from 'js-cookie'
import axios from 'axios';

const Sidebar = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie.get('token')}`;
        const response = await axios.get('http://localhost:5000/api/auth/me');
        console.log(response.data.decoded);
        setData(response.data.decoded);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  let loggedIn = false;
  if (data && data.name) {
    loggedIn = true;
    console.log(loggedIn );
  }
  
  return (
    <div className="bg-gray-800 text-white h-screen w-64 p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Library System</h2>
        <p className="text-sm">Welcome, {loggedIn ? data.name : 'Guest'}</p>
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
