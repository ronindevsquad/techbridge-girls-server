const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().
      replace(/T/, ' ').
      replace(/\..+/, '').
      replace(" ", '') + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

module.exports = upload;