const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/data");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    //reject file
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: fileFilter,
});

module.exports = uploadMiddleware;
