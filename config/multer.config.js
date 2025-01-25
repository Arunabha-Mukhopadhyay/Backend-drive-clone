const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storageConfig = multer.memoryStorage();

const upload = multer({
  storage: storageConfig,
  fileFilter: (req, file, cb) => {
    // You can add file type validation here if needed
    cb(null, true);
  }
});

module.exports = upload;