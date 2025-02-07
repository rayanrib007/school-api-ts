/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  JsonController,
  Post,
  Res,
  Body,
  Get,
  Req,
  Param,
  Put,
  Delete,
} from "routing-controllers";
import { Response, Request } from "express";
import {
  ICreateUserProtocol,
  IUptateUserProtocol,
} from "../interfaces/users/IUsers";
import PrivateUserController from "../privateControllers/PrivateUserControllers";

@JsonController("/users")
export default class UserController {
  @Post("/create")
  async store(@Body() body: ICreateUserProtocol, @Res() res: Response) {
    try {
      const user = await PrivateUserController.store(body);

      return res.status(201).json({
        message: "Usuário criado com sucesso!",
        type: "success",
        data: user,
      });
    } catch {
      return res.status(500).json({
        message: "Erro ao criar Usuário!",
        type: "error",
        data: null,
      });
    }
  }

  @Get("/all")
  async getUsers(@Res() res: Response) {
    try {
      const users = await PrivateUserController.index();

      return res.status(201).json({
        type: "success",
        data: users,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno do servidor",
        type: "error",
        data: null,
      });
    }
  }

  @Get(`/:id`)
  async getOneUser(@Param("id") id: string, @Res() res: Response) {
    try {
      const user = await PrivateUserController.show(Number(id));

      return res.status(201).json({
        type: "success",
        data: user,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno do servidor",
        type: "error",
        data: null,
      });
    }
  }

  @Put(`/update/:id`)
  async updateUser(
    @Param("id") id: string,
    @Body() body: IUptateUserProtocol,
    @Res() res: Response,
  ) {
    try {
      const user = await PrivateUserController.update(Number(id), body);

      return res.status(201).json({
        type: "success",
        data: user,
      });
    } catch (error: any) {
      return res.status(error.httpCode ? error.httpCode : 500).json({
        message: error.httpCode ? error.message : "Erro interno do servidor",
        type: "error",
        data: null,
      });
    }
  }

  @Delete(`/delete/:id`)
  async deleteUser(@Param("id") id: string, @Res() res: Response) {
    try {
      const user = await PrivateUserController.delete(Number(id));

      return res.status(201).json({
        type: "success",
        data: user,
      });
    } catch (error: any) {
      return res.status(error.httpCode ? error.httpCode : 500).json({
        message: error.httpCode ? error.message : "Erro interno do servidor",
        type: "error",
        data: null,
      });
    }
  }
}
