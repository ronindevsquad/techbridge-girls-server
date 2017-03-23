const multer = require('multer');
const upload = multer({
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype !== 'image/jpeg')
  //     return cb(null, false);
  //   return cb(null, true);
  // },
  storage: multer.memoryStorage()
});

module.exports = upload;