require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const allBlogRoute = require('./routes/allBlogRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/allBlogs', allBlogRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
