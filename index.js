import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();

const server = express();

connectDB();

server.get("/", (req, res) => {
  res.json({ status: "sucess" });
});

server.listen(3000, () => {
  console.log("server started");
});
