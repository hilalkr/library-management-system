import connectDB from '../../utils/db'; // MongoDB bağlantısı
import Book from '../../models/Book'; // Kitap modelini içe aktarın

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const books = await Book.find(); // Tüm kitapları çekmek için
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
