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
import wishlistRoutes from "./routes/Wishlist.js";
import searchRoutes from "./routes/Search.js";
import messagesRoutes from "./routes/Messages.js";
import "./strategies/local_strategy.js";
import "./strategies/google_strategy.js";
import uploadRoute from "./controllers/uploadImage.js";
import { isAuth } from "./utils/common.js";
import { server, nodeServer } from "./utils/socket.js";

dotenv.config();

server.use(passport.initialize());
// server.use(passport.session());

server.use(express.json());

server.use(
  cors({
    origin: [
      "https://knit-wear.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["X-Total-Count"],
    credentials: true,
  })
);

// const upload = multer({ storage: storage });

server.use("/api", uploadRoute);
server.use("/products", productRoutes);
server.use("/categories", categoriesRoutes);
server.use("/brands", brandsRoutes);
server.use("/user", isAuth(), userRoutes);
server.use("/auth", authRoutes);
server.use("/carts", isAuth(), cartRoutes);
server.use("/orders", isAuth(), orderRoutes);
server.use("/wishlist", isAuth(), wishlistRoutes);
server.use("/search", searchRoutes);
server.use("/messages", isAuth(), messagesRoutes);

server.set("trust proxy", 1); // trust first proxy

connectDB();

const PORT = process.env.PORT || 4000;

nodeServer.listen(PORT, () => {
  console.log("server started");
});
