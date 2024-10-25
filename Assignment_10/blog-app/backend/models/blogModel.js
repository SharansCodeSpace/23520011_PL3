const db = require('../db');


const createBlogTable = `
CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)`;

db.query(createBlogTable, (err) => {
    if (err) throw err;
    console.log('Blogs table created');
});

const createBlog = (blogData, callback) => {
    const { user_id, title, content } = blogData;
    const sql = 'INSERT INTO blogs (user_id, title, content) VALUES (?, ?, ?)';
    db.query(sql, [user_id, title, content], callback);
};

const getBlogs = (user_id, callback) => {
    console.log(user_id);
    const sql = `SELECT * FROM blogs WHERE user_id = ${user_id}`;
    db.query(sql, callback);
};

const getAllBlogs = (callback) => {
    const sql = 'SELECT * FROM blogs';
    db.query(sql, callback);
};

const getBlogById = (blogId, callback) => {
    const sql = 'SELECT * FROM blogs WHERE id = ?';
    db.query(sql, [blogId], callback);
};

const updateBlog = (blogId, blogData, callback) => {
    const { title, content } = blogData;
    const sql = 'UPDATE blogs SET title = ?, content = ? WHERE id = ?';
    db.query(sql, [title, content, blogId], callback);
};

const deleteBlog = (blogId, callback) => {
    const sql = 'DELETE FROM blogs WHERE id = ?';
    db.query(sql, [blogId], callback);
};

module.exports = { createBlog, getAllBlogs, getBlogs, getBlogById, updateBlog, deleteBlog };
