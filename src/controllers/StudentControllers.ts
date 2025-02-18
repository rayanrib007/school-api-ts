/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  JsonController,
  Get,
  Res,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseBefore,
} from "routing-controllers";
import { Response } from "express";
import PrivateStudentController from "../privateControllers/PrivateStudentController";
import { IStudentsRegisterProtocol } from "../interfaces/IStudents";
import { MiddlewareLoginRequired } from "../middlewares/MiddlewareLoginRequired";

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

  @Get("/:id")
  async show(@Param("id") id: string, @Res() res: Response) {
    try {
      const student = await PrivateStudentController.show(Number(id));
      return res.status(201).json({
        type: "success",
        data: student,
      });
    } catch (error: any) {
      return res.status(error.httpCode ? error.httpCode : 500).json({
        message: error.httpCode ? error.message : "Falha interna do servidor",
        type: "error",
        data: null,
      });
    }
  }

  @Post("/create")
  @UseBefore(MiddlewareLoginRequired)
  async store(@Body() body: IStudentsRegisterProtocol, @Res() res: Response) {
    try {
      const student = await PrivateStudentController.create(body);
      return res.status(201).json({
        type: "success",
        data: student,
      });
    } catch (error: any) {
      return res.status(error.httpCode ? error.httpCode : 500).json({
        message: error.httpCode ? error.message : "Falha interna do servidor",
        type: "error",
        data: null,
      });
    }
  }

  @Put("/update/:id")
  @UseBefore(MiddlewareLoginRequired)
  async update(
    @Param("id") id: string,
    @Body() body: IStudentsRegisterProtocol,
    @Res() res: Response,
  ) {
    try {
      const student = await PrivateStudentController.update(Number(id), body);

      return res.status(201).json({
        type: "success",
        data: student,
      });
    } catch (error: any) {
      return res.status(error.httpCode ? error.httpCode : 500).json({
        message: error.httpCode ? error.message : "Falha interna do servidor",
        type: "error",
        data: null,
      });
    }
  }

  @Delete("/delete/:id")
  @UseBefore(MiddlewareLoginRequired)
  async delete(@Param("id") id: string, @Res() res: Response) {
    try {
      await PrivateStudentController.delete(Number(id));
      return res.status(201).json({
        type: "success",
        data: true,
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
