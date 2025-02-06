import { JsonController, Post, Res, Body } from "routing-controllers";
import { Response } from "express";
import bcryptjs from "bcryptjs";
import { ICreateUserProtocol } from "../interfaces/users/IUsers";
import PrivateUserController from "../privateControllers/PrivateUserControllers";

@JsonController("/users")
export default class UserController {
  @Post("/create")
  async store(@Body() body: ICreateUserProtocol, @Res() res: Response) {
    try {
      const user = await PrivateUserController.store({
        name: body.name,
        email: body.email,
        password_hash: bcryptjs.hashSync(body.password_hash, 8),
      });

      return res.status(201).json({
        message: "Usuário criado com sucesso!",
        type: "success",
        data: user,
      });
    } catch {
      return res.status(500).json({
        message: "Erro ao criar Usuário!",
        type: "error",
        data: "",
      });
    }
  }
}
