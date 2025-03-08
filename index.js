import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import productRoutes from "./routes/Products.js";
import categoriesRoutes from "./routes/Category.js";
import brandsRoutes from "./routes/Brand.js";

const server = express();

dotenv.config();

server.use(express.json());
server.use("/products", productRoutes);
server.use("/categories", categoriesRoutes);
server.use("/brands", brandsRoutes);

connectDB();

server.listen(process.env.PORT, () => {
  console.log("server started");
});
