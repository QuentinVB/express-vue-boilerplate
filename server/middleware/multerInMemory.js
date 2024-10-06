const multer = require('multer');


const storage = multer.memoryStorage();

/*
const storage = multer.diskStorage(
  {
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../medias"));
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
*/
module.exports = multer({storage}).single('profilePic');