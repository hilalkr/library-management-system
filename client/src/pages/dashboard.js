
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Card } from "@material-tailwind/react";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="relative h-screen flex-grow">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url('/library.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-40"
          ></div>
          <div className="flex justify-center items-start mt-5 h-full">
            <div className="flex space-x-4">
              <Card className="bg-green-400 p-8 w-80 text-center">
                <h2 className="text-3xl font-bold text-white">Total Books</h2>
                <p className="text-2xl text-white">100</p>
              </Card>
              <Card className="bg-orange-400 p-8 w-80 text-center">
                <h2 className="text-3xl font-bold text-white">Returned Books</h2>
                <p className="text-2xl text-white">75</p>
              </Card>
              <Card className="bg-blue-400 p-8 w-80 text-center">
                <h2 className="text-3xl font-bold text-white">Borrowed Books</h2>
                <p className="text-2xl text-white">25</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
