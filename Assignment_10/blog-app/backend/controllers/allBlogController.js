const blogModel = require('../models/blogModel');

const getAllBlogs = (req, res) => {
    blogModel.getAllBlogs((err, blogs) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(blogs);
    });
};

module.exports = { getAllBlogs };
