import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import productRoutes from "./routes/Products.js";
import categoriesRoutes from "./routes/Category.js";
import brandsRoutes from "./routes/Brand.js";
import userRoutes from "./routes/User.js";
import authRoutes from "./routes/Auth.js";
import cartRoutes from "./routes/Cart.js";
import orderRoutes from "./routes/Order.js";
import "./strategies/local_strategy.js";
// import { isAuth } from "./utils/common.js";

const server = express();

dotenv.config();

server.use(
  session({
    secret: "keyboard cart",
    resave: false,
    saveUninitialized: false,
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use(express.json());

server.use(
  cors({
    origin: "*", // Allow all origins (you can restrict this if needed)
    allowedHeaders: ["*"], // Allow all headers (for requests)
    exposedHeaders: ["X-Total-Count"], // Expose specific custom headers to the client
    credentials: true, // Set to true if you need cookies/auth
  })
);
server.use("/products", productRoutes);
server.use("/categories", categoriesRoutes);
server.use("/brands", brandsRoutes);
server.use("/user", userRoutes);
server.use("/auth", authRoutes);
server.use("/carts", cartRoutes);
server.use("/orders", orderRoutes);

connectDB();

server.listen(process.env.PORT, () => {
  console.log("server started");
});
