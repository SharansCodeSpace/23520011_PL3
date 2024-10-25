const express = require("express");
const fileRoutes = require("./routes/fileRoutes");

const app = express();
const PORT = 3000;

// Use the file upload/download routes
app.use('/', fileRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: "File size exceeds the limit." });
    }
    return res.status(500).json({ error: err.message });
  } else if (err) {
    // General errors
    return res.status(500).json({ error: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
