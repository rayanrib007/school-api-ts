/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  JsonController,
  Post,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { Response } from "express";
import multerConfig from "../config/multer";
import multer from "multer";
import PrivatePhotosControllers from "../privateControllers/PrivatePhotosControllers";
import { MiddlewareLoginRequired } from "../middlewares/MiddlewareLoginRequired";
import { IRequestAuthenticateRequestProtocol } from "../interfaces/IUsers";

const upload = multer(multerConfig);

@JsonController("/photos")
@UseBefore(MiddlewareLoginRequired)
export default class PhotoController {
  @Post("/uploads")
  @UseBefore(upload.single("file"))
  async Store(
    @Req() req: IRequestAuthenticateRequestProtocol,
    @Res() res: Response,
    @Body() body: { student_id: string },
  ) {
    const { student_id } = body;
    try {
      const data = await PrivatePhotosControllers.store(
        req.file,
        Number(student_id),
      );
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
