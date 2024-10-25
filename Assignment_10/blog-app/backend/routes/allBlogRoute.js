const express = require('express');
const { getAllBlogs } = require('../controllers/allBlogController');

const router = express.Router();

router.get('/', getAllBlogs);

module.exports = router;
