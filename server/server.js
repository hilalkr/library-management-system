 require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const router = require('./routes');
const nodemailer = require('nodemailer'); 

const { connectDB, sequelize, Book, User } = require('./utils/db'); // Veritabanı bağlantısı
const { checkDelayedBooks } = require('./controllers/bookController');




// const app = express();




// Sequelize veritabanı bağlantısını oluşturun ve senkronize edin
// sequelize
//   .sync()
//   .then(() => {
//     console.log('Connected to PostgreSQL');
//   })
//   .catch((error) => {
//     console.error('PostgreSQL connection error:', error);
//   });

// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));

// app.use('/api', router);




// Her gün saat 00:00'da geciken kitapları kontrol etme
// cron.schedule('0 0 * * *', () => {
//   checkDelayedBooks();
// });

// const jwt = require('jsonwebtoken');

// ...

// Kimlik doğrulama işlemini gerçekleştiren middleware
// const authenticateJWT = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized access.' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid token.' });
//     }

//     req.userId = decoded.userId; // Kullanıcı kimliğini request nesnesine ekle
//     next();
//   });
// };

// Kitap oluşturma route'ını tanımlama
// app.post('/books',  async (req, res) => {
//   try {
//     const { title, author, genre, id, ISBN } = req.body;
//     // const createdBy = req.user.id; // Oturum açmış kullanıcının ID'si

//     const newBook = new Book({
//       title,
//       author,
//       genre,
//       id,
//       ISBN,
//       createdBy,
//     });

//     const savedBook = await newBook.save();

//     if (!savedBook) {
//       return res.status(404).json({ error: 'Book could not be created.' });
//     }

//     res.status(201).json({ message: 'Book created successfully.', data: savedBook });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while creating the book.' });
//   }
// });

// app.use(express.static('public'));
// app.get('/reset-password/:resetToken', (req, res) => {
//   const resetToken = req.params.resetToken;

//   res.sendFile('resetPassword.html', { root: './public' }); 
// });

// const sendResetPasswordEmail = (email, resetToken) => {
//   const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
  
//   const transporter = nodemailer.createTransport({
//     host: 'localhost',
//     port: 1025,
//     auth: {
//       user: 'project.1',
//       pass: 'secret.1'
//     }
//   });

//   const mailOptions = {
//     from: 'info@library.com',
//     to: email,
//     subject: 'Şifre Sıfırlama',
//     html: `<p>Şifrenizi sıfırlamak için <a href="${resetLink}">buraya tıklayın</a>.</p>`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log('Şifre sıfırlama e-postası gönderildi: ' + info.response);
//     }
//   });
// };

// app.post('/api/reset-password', async (req, res) => {
// try {
//   const { email } = req.body;
//   // Generate a resetToken here (you can use a token generator function)
//   const resetToken = generateRandomToken(); // Implement this function

//   // Save the resetToken in the user's record in the database
//   const user = await User.findOne({ where: { email: email } });
//   if (!user) {
//     res.status(404).json("Kullanıcı bulunamadı");
//     return;
//   }
//   user.resetToken = resetToken;
//   await user.save();

//   // Construct the reset link
//   //const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

//   // Send the reset password email
//   sendResetPasswordEmail(email, resetToken);

//   res.json("Şifre sıfırlama başarıyla tamamlandı");
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ error: "Sunucu Hatası" });
// }
// });

// app.post('/api/new-password/:resetToken', async (req, res) => {
// try {
//   const { resetToken } = req.params; // Reset token'ı URL'den alın
//   const { newPassword } = req.body;

//   // Burada resetToken'ı kullanarak kullanıcıyı bulup şifresini güncelleyin
//   const user = await User.findOne({ where: { resetToken: resetToken } });

//   if (!user) {
//     res.status(404).json("Kullanıcı bulunamadı");
//     return;
//   }

//   // Kullanıcının şifresini güncelleyin
//   user.password = newPassword;
//   user.resetToken = null; // Token'ı kullanıldı olarak işaretleyin veya sıfırlayın
//   await user.save();

//   res.json("Şifre sıfırlama başarıyla tamamlandı");
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ error: "Sunucu Hatası" });
// }
// });

// app.post("/login", async (req, res) => {
// try {
//   const { email, password } = req.body;
//   const user = await User.findOne({ where: { email: email } });

//   if (!user) {
//     res.json("User not found");
//   } else if (user.password === password) {
//     res.json("Success");
//   } else {
//     res.json("Wrong password");
//   }
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ error: "Internal Server Error" });
// }
// });

// app.post('/register', async (req, res) => {
// try {
//   const { name, email, password } = req.body;
//   const user = await User.create({ name, email, password });
//   res.json(user);
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ error: 'Internal Server Error' });
// }
// });

// app.listen(3001, () => {
// console.log("Server is running on port 3001");
// });
