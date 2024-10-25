const express = require('express');
const { getBlogs, createBlog } = require('../controllers/blogController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getBlogs);
router.post('/', authenticateToken, createBlog);

module.exports = router;
