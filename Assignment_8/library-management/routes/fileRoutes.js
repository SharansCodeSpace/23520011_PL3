const express = require('express');
const router = express.Router();
const { uploadFile, getFiles, downloadFile, deleteFile } = require('../controllers/fileController');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/files', authenticateToken, upload.single('file'), uploadFile);
router.get('/files', authenticateToken, getFiles);
router.get('/files/:id', authenticateToken, downloadFile);
router.delete('/files/:id', authenticateToken, deleteFile);

module.exports = router;
