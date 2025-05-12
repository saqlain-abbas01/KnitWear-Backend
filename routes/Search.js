import express from "express";
import fetchSearchProduct from "../controllers/Search.js";

const route = express.Router();

route.get("/", fetchSearchProduct);

export default route;
