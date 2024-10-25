const express = require('express');
const router = express.Router();
const { addBook, updateBook, deleteBook, getBooks } = require('../controllers/bookController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/books', authenticateToken, addBook);
router.put('/books/:id', authenticateToken, updateBook);
router.delete('/books/:id', authenticateToken, deleteBook);
router.get('/books', authenticateToken, getBooks);

module.exports = router;
