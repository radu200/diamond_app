import multer from "multer";
import request from "request";
import path from "path";
const maxSizeFile = 5e8; ///500mb

const uploadFilter = async (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    return cb(new Error("Wrong file type"));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({
  fileFilter: uploadFilter,
  storage: storage,
  limits: { fileSize: maxSizeFile },
}).single("file");

export const fileHandler = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve(req.file);
    });
  });
};

export const requestHandler = (url, formData) => {
  return new Promise((resolve, reject) => {
    request.post({ url, formData }, function (err, result, body) {
      if (err) {
        return reject(err);
      }
      return resolve({ result, body });
    });
  });
};
