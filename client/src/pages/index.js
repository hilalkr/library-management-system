import React from 'react';
import Navbar from '../components/Navbar';
import '../app/global.css';
import MovingComponent from 'react-moving-text';
import Paper from '@mui/material/Paper';


const Welcome = () => {
  return (
    <div className="bg-gray-100 min-h-screen bg-white ">
      <Navbar />

      <div className="flex flex-col items-center justify-start h-screen">
        {/* Resim */}
        <div className="w-full h-1/2">
          <img
            src="/home-bg.jpg"
            alt="Kütüphane Resmi"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-6 mb-10 text-center relative">
          <MovingComponent
            type="unfold"
            duration="1000ms"
            delay="0s"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="none"
          >
            <h1 className="text-6xl text-gray mb-4 tracking-wide text-shadow pl-20">
              🇱​🇮​🇧​🇷​🇦​🇷​🇾​ 🇲​🇦​🇳​🇦​🇬​🇪​🇲​🇪​🇳​🇹 🇸​🇾​🇸​🇹​🇪​🇲
            </h1>
          </MovingComponent>
          <p
            className="my-custom-text"
            style={{ fontFamily: 'Lino', color: '#033980' }}
          >
            We are here to manage your library collection.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center mt-10 ">
            {/* Kart 1: Public/Academic */}
            <Paper elevation={3} className="p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src="/academic.jpg"
                  alt="Public/Academic Icon"
                  className="w-20 h-auto"
                />
                <span className="text-black">Public/Academic</span>
                <p
                  className="custom-text"
                  style={{ fontFamily: 'Lino', color: '#033980' }}
                >
                  We are here to manage your library collection.
                </p>
                <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300 ease-in-out">
                  Learn More
                </button>
              </div>
            </Paper>

            {/* Kart 2: Schools */}
            <Paper elevation={3} className="p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src="/book.png"
                  alt="Schools Icon"
                  className="w-20 h-auto"
                />
                <span className="text-black">Schools</span>
                <p
                  className="custom-text"
                  style={{ fontFamily: 'Lino', color: '#033980' }}
                >
                  We are here to manage your library collection.
                </p>
                <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300 ease-in-out">
                  Learn More
                </button>
              </div>
            </Paper>

            {/* Kart 3: CHURCH/SPECIAL */}
            <Paper elevation={3} className="p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src="/church.png"
                  alt="CHURCH/SPECIAL Icon"
                  className="w-10 h-auto"
                />
                <span className="text-black">CHURCH/SPECIAL</span>
                <p
                  className="custom-text"
                  style={{ fontFamily: 'Lino', color: '#033980' }}
                >
                  We are here to manage your library collection.
                </p>
                <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300 ease-in-out">
                  Learn More
                </button>
              </div>
            </Paper>
          </div>
        </div>
      </div>
      {/* Yeni Alan */}
<div className="my-8 px-4 text-center mt-40">
  <h2 className="my-custom-text" style={{ fontFamily: 'Lino', fontSize:'35px', color: '#033980' }}>
      EXPLORE OUR SYSTEM
  </h2>
  <p className="mt-4" style={{ fontFamily: 'Lino',fontSize:'18px', color: '#033980' }}>
  Dive into the world of library management system and explore the advantages it offers to users. This innovative system simplifies library operations and enhances the overall experience for both librarians and patrons.
</p>
  <div className="mt-4 flex flex-wrap items-center justify-center">
  <div className="w-full md:w-1/2 px-4">
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
    
    <ul className="list-none p-0">
      <li className="mb-4 flex items-start">
        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Effortless Search</h3>
          <p className="text-gray-600">Quickly find books in our extensive library collection.</p>
        </div>
      </li>
      <li className="mb-4 flex items-start">
        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Streamlined Borrowing</h3>
          <p className="text-gray-600">Simplify the process of borrowing and returning books.</p>
        </div>
      </li>
      <li className="mb-4 flex items-start">
        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Easy Organization</h3>
          <p className="text-gray-600">Effortlessly categorize and organize your book collection.</p>
        </div>
      </li>
      <li className="mb-4 flex items-start">
        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold">User Recommendations</h3>
          <p className="text-gray-600">Empower users to provide valuable book recommendations.</p>
        </div>
      </li>
    </ul>
  </div>
</div>

    <div className="w-full md:w-1/2 px-4 mt-4 md:mt-0">
      <img
        src="/interface.png" // Resim yolunu değiştirin
        alt="Yeni Alan Resmi"
        className="w-full h-auto rounded-lg"
      />
    </div>
  </div>
</div>

    </div>
  );
};

export default Welcome;
