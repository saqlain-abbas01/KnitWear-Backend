import express from "express";
import { addWishList, fecthUserWishtList } from "../controllers/WishList.js";

const router = express.Router();

router.post("/", addWishList);
router.get("/", fecthUserWishtList);

export default router;
