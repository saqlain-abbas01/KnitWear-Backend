import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { createProduct } from "./controllers/Products.js";

const server = express();

dotenv.config();

server.use(express.json());

connectDB();

server.post("/products", createProduct);

server.listen(process.env.PORT, () => {
  console.log("server started");
});
