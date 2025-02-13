/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonController, Get, Res } from "routing-controllers";
import { Response } from "express";
import PrivateStudentController from "../privateControllers/PrivateStudentController";

@JsonController("/students")
export default class StudentController {
  @Get("/all")
  async index(@Res() res: Response) {
    try {
      const studens = await PrivateStudentController.index();

      return res.status(201).json({
        type: "success",
        data: studens,
      });
    } catch (error: any) {
      return res.status(error.httpCode ? error.httpCode : 500).json({
        message: error.httpCode ? error.message : "Falha interna do servidor",
        type: "error",
        data: null,
      });
    }
  }
}
