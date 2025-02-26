import { FileFilterCallback } from "multer";
import multer from "multer";
import { Request } from "express";
import { extname, resolve } from "path";

const randomKey = () => Math.floor(Math.random() * 1000000 + 1000000);

export default {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg"
    ) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${randomKey()}${extname(file.originalname)}`);
    },
  }),
};
