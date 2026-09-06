import express from "express";
import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";
import crypto from "crypto";
import path from "path";

const router = express.Router();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  console.log("FILE RECEIVED:", {
    originalname: file.originalname,
    mimetype: file.mimetype,
  });

  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image file provided",
      });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();

    const fileName = `movies/${crypto.randomUUID()}${ext}`;

    const command = new PutObjectCommand({
      Bucket: "movie-app-images-muneeb",
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    await s3.send(command);

    const imageUrl = `https://movie-app-images-muneeb.s3.eu-north-1.amazonaws.com/${fileName}`;

    res.status(200).json({
      message: "Image uploaded successfully",
      image: imageUrl,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Image upload failed",
    });
  }
});

export default router;