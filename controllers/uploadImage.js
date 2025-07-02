import express from "express";
import cloudinary from "../utils/cloudniaryConfig.js";
import upload from "../multer/uploadimage.js";

const router = express.Router();

router.post("/upload", upload.array("images", 5), async (req, res) => {
  try {
    const files = req.files;
  
    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const uploadResults = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path);
      uploadResults.push(result.secure_url);
    }
   
    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: uploadResults,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
});

export default router;
