const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");
const { uploadFile, downloadFile } = require("../controllers/fileController");

// Upload route
router.post('/upload', upload.single('file'), uploadFile);

// Download route
router.get('/files/:fileName', downloadFile);

module.exports = router;
