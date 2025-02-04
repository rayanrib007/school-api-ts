/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonController, Post } from "routing-controllers";
import PrivatePrismaController from "../privateControllers/PrivateController";
import bcryptjs from "bcryptjs";

@JsonController("/users")
export default class UserController {
  @Post("/create")
  async store() {
    try {
      const user = await PrivatePrismaController.prisma.users.create({
        data: {
          name: "michely silva",
          email: "michely@hotmail.com",
          password_hash: bcryptjs.hashSync("123456", 8),
        },
      });
      return {
        message: "Usuário criado com sucesso!",
        data: user,
      };
    } catch (error: any) {
      return {
        message: "Erro ao criar Usuário!",
        error: error.message,
      };
    }
  }
}
