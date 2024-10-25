const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT username FROM users WHERE username = ?', [username], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database query failed' });
        if (result.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = bcrypt.hashSync(password, 8);
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: 'User registration failed' });
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = results[0];
        const passwordValid = bcrypt.compareSync(password, user.password);
        if (!passwordValid) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Login Successful!", token: token });
    });
};
