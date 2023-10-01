// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../utils/db.js');

// const Book = sequelize.define('Book', {
//   title: {
//     type: DataTypes.STRING, 
//     allowNull: false,
//   },
//   author: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   genre: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   ISBN: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   imageUrl: {
//     type: DataTypes.STRING, // Resimlerin URL'sini saklamak için STRING türü kullanabilirsiniz.
//     allowNull: true, // Resim olmayan kitaplar için allowNull: true yapabilirsiniz.
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'User',
//       key: 'id',
//     },
//   },
// });


// module.exports = Book;
