import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
// import session from "express-session";
import passport from "passport";
import productRoutes from "./routes/Products.js";
import categoriesRoutes from "./routes/Category.js";
import brandsRoutes from "./routes/Brand.js";
import userRoutes from "./routes/User.js";
import authRoutes from "./routes/Auth.js";
import cartRoutes from "./routes/Cart.js";
import orderRoutes from "./routes/Order.js";
import "./strategies/local_strategy.js";
import multer from "multer";
import { uploadImage } from "./controllers/Products.js";
import { isAuth } from "./utils/common.js";
import { storage } from "./multer/uploadimage.js";
// import { fileURLToPath } from "url";
// import path from "path";
// import { storage } from "./multer/uploadimage.js";

// import { isAuth } from "./utils/common.js";

const server = express();

dotenv.config();

// server.use(
//   session({
//     secret: "keyboard cart",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

server.use(passport.initialize());
// server.use(passport.session());

server.use(express.json());

server.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["X-Total-Count"],
    credentials: true,
  })
);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const uploadsDir = path.join(__dirname, "/public/uploads");
// server.use("/uploads", express.static(uploadsDir));

// server.use(
//   "/public/uploads",
//   express.static(path.join(__dirname, "public/uploads"))
// );

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
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

const upload = multer({ storage: storage });

server.use("/api/upload", upload.array("images"), uploadImage);
server.use("/products", productRoutes);
server.use("/categories", categoriesRoutes);
server.use("/brands", brandsRoutes);
server.use("/user", isAuth(), userRoutes);
server.use("/auth", authRoutes);
server.use("/carts", isAuth(), cartRoutes);
server.use("/orders", isAuth(), orderRoutes);

connectDB();

server.listen(process.env.PORT, () => {
  console.log("server started");
});
