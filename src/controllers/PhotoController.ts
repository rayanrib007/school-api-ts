/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonController, Post, Req, Res, UseBefore } from "routing-controllers";
import { Request, Response } from "express";
import multerConfig from "../config/multer";
import multer from "multer";
import PrivatePhotosControllers from "../privateControllers/PrivatePhotosControllers";

const upload = multer(multerConfig);

@JsonController("/photos")
export default class PhotoController {
  @Post("/uploads")
  @UseBefore(upload.single("file"))
  async Store(@Req() req: Request, @Res() res: Response) {
    try {
      const data = await PrivatePhotosControllers.store(req.file);
      return {
        message: "photos routes",
        file: data,
      };
    } catch (error: any) {
      return res.status(error.httpCode ? error.httpCode : 500).json({
        message: error.httpCode ? error.message : "Falha interna do servidor",
        type: "error",
        data: null,
      });
    }
  }
}
