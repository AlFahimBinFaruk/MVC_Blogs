const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/thumbnails");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const uploadFile = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, res, cb) => {
    const types = /jpeg|jpg|png|gif/;
    const extname = types.test(
      path.extname(file.originalname).toLocaleLowerCase()
    );
    const mimetype = types.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only Image is Allowed"));
    }
  },
});

module.exports = uploadFile;
