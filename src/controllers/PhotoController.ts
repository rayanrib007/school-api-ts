/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonController, Post, Req, UseBefore } from "routing-controllers";
import { Request } from "express";
import multerConfig from "../config/multer";
import multer from "multer";

const upload = multer(multerConfig);

@JsonController("/photos")
export default class PhotoController {
  @Post("/uploads")
  @UseBefore(upload.single("file"))
  async Store(@Req() req: Request) {
    try {
      return {
        message: "photos routes",
        file: req.file,
      };
    } catch (error: any) {
      return {
        message: "Erro home",
        error: error.message,
      };
    }
  }
}
