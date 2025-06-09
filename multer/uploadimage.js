// import express from "express";
// import path from "path";
// import multer from "multer";
// import { fileURLToPath } from "url";

// const server = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const uploadsDir = path.join(__dirname, "../public/Uploads");
// console.log("uploadsDir", uploadsDir);
// server.use("/Uploads", express.static(uploadsDir));

// export const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("is upload image");
//     cb(null, uploadsDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
//     );
//   },
// });

import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
