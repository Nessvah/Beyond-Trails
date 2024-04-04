const multer = require('multer');

const uploader = multer({
  dest: '/tmp',
  fileFilter: (req, file, callback) => {
    // Realize as verificações necessárias no arquivo aqui
    if (!file.mimetype.toLowerCase().startsWith('application/pdf')) {
      callback(new Error('Not a PDF file'));
      return;
    }

    if (file.size > 10_000_000) {
      callback(new Error('File larger than 10MB'));
      return;
    }

    callback(null, true);
  },
});

module.exports = uploader;
