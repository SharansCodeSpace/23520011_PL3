const db = require('../config/db');
const fs = require('fs');

exports.uploadFile = (req, res) => {
    const filename = req.file.filename;
    const filepath = req.file.path;

    db.query('INSERT INTO files (filename, path) VALUES (?, ?)', [filename, filepath], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error uploading file' });
        res.json({ message: 'File uploaded successfully', filename });
    });
};

exports.getFiles = (req, res) => {
    db.query('SELECT * FROM files', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching files' });
        res.json(results);
    });
};

exports.downloadFile = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM files WHERE id = ?', [id], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'File not found' });
        const file = results[0];
        res.download(file.path);
    });
};

exports.deleteFile = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM files WHERE id = ?', [id], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'File not found' });

        const file = results[0];
        fs.unlink(file.path, (err) => {
            if (err) return res.status(500).json({ message: 'Error deleting file' });

            db.query('DELETE FROM files WHERE id = ?', [id], (err, result) => {
                if (err) return res.status(500).json({ message: 'Error deleting file record' });
                res.json({ message: 'File deleted successfully' });
            });
        });
    });
};
