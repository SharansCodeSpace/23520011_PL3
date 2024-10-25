const path = require("path");
const fs = require("fs-extra");

const uploadDirectory = path.join(__dirname, '../uploads');

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded or invalid file format." });
  }
  res.status(200).json({
    message: "File uploaded successfully.",
    fileName: req.file.filename,
    filePath: `/files/${req.file.filename}`
  });
};

const downloadFile = (req, res) => {
  const filePath = path.join(uploadDirectory, req.params.fileName);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: "File not found" });
    }
    res.download(filePath);
  });
};

module.exports = {
  uploadFile,
  downloadFile
};