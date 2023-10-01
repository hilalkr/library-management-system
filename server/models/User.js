// // models/user.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const User = sequelize.define('User', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   resetToken: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   // diğer sütunlar ve özellikler
// });

// module.exports = User;

// // models/book.js
// // const Book = require('./Book');

// // const Book = sequelize.define('Book', {
// //   id: {
// //     type: DataTypes.UUID,
// //     defaultValue: DataTypes.UUIDV4,
// //     primaryKey: true,
// //   },
// //   title: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //   },
// //   author: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //   },
// //   genre: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //   },
// //   ISBN: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //     unique: true,
// //   },
// //   // diğer sütunlar ve özellikler
// // });

// // User ile Book arasındaki ilişkiyi tanımlayın
// // Book.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// // User.hasMany(Book, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// // module.exports = Book;
