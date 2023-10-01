import React from 'react';

const Card = ({ title, author }) => {
  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-500 p-4 rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <p className="text-gray-800">{author}</p>
    </div>
  );
};

export default Card;
