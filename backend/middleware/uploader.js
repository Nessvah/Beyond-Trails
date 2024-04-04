// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {

//     callback(null, 'uploads/');
//   },
//   filename: (req, file, callback) => {
//     // gera um nome de arquivo único para cada imagem.
//     callback(null, Date.now() + '_' + file.originalname);
//   }
// });

// const uploader = multer({
//   storage: storage,
//   fileFilter: (request, file, callback) => {
//     if (file.size > 5_000_000) {
//       callback(new Error('File larger than 5MB'));
//       return;
//     }

//     callback(null, true);
//   },
// });

// module.exports = uploader;
const multer = require('multer');

const uploader = multer({
  dest: '/uploads',
  fileFilter: (request, file, callback) => {
    if (!file.mimetype.toLowerCase().startsWith('image/')) {
      callback(new Error('Not an image'));
      return;
    }

    if (file.size > 5_000_000) {
      callback(new Error('File larger than 5MB'));
      return;
    }

    callback(null, true);
  },
});
module.exports = uploader;