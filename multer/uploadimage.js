import express from "express";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const server = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "../public/uploads");
server.use("/uploads", express.static(uploadsDir));

server.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("is upload image");
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});
