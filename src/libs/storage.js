const multer = require("multer");
const path = require("path");

//Le decimos donde almacenar las imagenes
const storage = multer.diskStorage({
  /* destination: path.join(__dirname, "../public/img"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }, */
});

//Le decimos como almacenar las imagenes
const upload = multer({
  storage,
  dest: path.join(__dirname, "../public/img"),
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const minetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (minetype && extname) {
      return cb(null, true);
    }
    cb("Error: Debe ser una imagen valida");
  },
}).single("image");

module.exports = upload;
