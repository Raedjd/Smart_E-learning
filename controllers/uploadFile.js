const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(path.dirname(__dirname), `client/public/uploads/profil/`)
    );
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

module.exports.upload = multer({ storage });
