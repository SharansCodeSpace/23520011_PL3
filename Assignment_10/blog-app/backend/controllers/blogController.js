const blogModel = require('../models/blogModel');

const getBlogs = (req, res) => {
    blogModel.getBlogs(req.query.user_id, (err, blogs) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(blogs);
    });
};

const createBlog = (req, res) => {
    const { user_id, title, content } = req.body;

    blogModel.createBlog({ user_id, title, content }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json({ message: 'Blog created' });
    });
};

module.exports = { getBlogs, createBlog };
