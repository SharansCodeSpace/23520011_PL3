const db = require('../config/db');

exports.addBook = (req, res) => {
    const { title, author, genre, year_of_publication } = req.body;
    db.query('INSERT INTO books (title, author, genre, year_of_publication) VALUES (?, ?, ?, ?)',
        [title, author, genre, year_of_publication], (err, result) => {
            if (err) return res.status(500).json({ message: 'Error adding book' });
            res.status(201).json({ message: 'Book added successfully' });
        });
};

exports.updateBook = (req, res) => {
    const { id } = req.params;
    const { title, author, genre, year_of_publication } = req.body;
    db.query('UPDATE books SET title = ?, author = ?, genre = ?, year_of_publication = ? WHERE id = ?',
        [title, author, genre, year_of_publication, id], (err, result) => {
            if (err) return res.status(500).json({ message: 'Error updating book' });
            res.json({ message: 'Book updated successfully' });
        });
};

exports.deleteBook = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error deleting book' });
        res.json({ message: 'Book deleted successfully' });
    });
};

exports.getBooks = (req, res) => {
    const { page = 1, limit = 10, genre, author } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM books WHERE 1=1';
    const params = [];

    if (genre) {
        query += ' AND genre = ?';
        params.push(genre);
    }
    if (author) {
        query += ' AND author = ?';
        params.push(author);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching books' });
        res.json(results);
    });
};
