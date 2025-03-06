import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import productRoutes from "./routes/Products.js";

const server = express();

dotenv.config();

server.use(express.json());
server.use("/products", productRoutes);

connectDB();

server.listen(process.env.PORT, () => {
  console.log("server started");
});
