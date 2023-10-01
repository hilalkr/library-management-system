const express = require('express');
const { User, Book } = require('../utils/db');
const { registerUser, loginUser } = require('../controllers/authController');
const { createBook, getAllBooks, getBookById, updateBook, deleteBook, borrowBook, returnBook } = require('../controllers/bookController');
const cron = require('node-cron');
const cors = require('cors');

const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use('/api', router);


cron.schedule('0 0 * * *', () => {
  checkDelayedBooks();
});

const jwt = require('jsonwebtoken');




const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized access.' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }

    req.userId = decoded.userId; 
    next();
  });
};


router.post('/books',  async (req, res) => { //authenticateJWT
  try {
    const { title, author, genre, ISBN } = req.body;
    // const createdBy = req.user.id; 

    const newBook = new Book({
      title,
      author,
      genre,
      ISBN,
    });

    const savedBook = await newBook.save();

    if (!savedBook) {
      return res.status(404).json({ error: 'Book could not be created.' });
    }

    res.status(201).json({ message: 'Book created successfully.', data: savedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the book.' });
  }
});


router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);




router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

router.post('/books/:id/borrow', borrowBook);
router.post('/books/:id/return', returnBook);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = router;
