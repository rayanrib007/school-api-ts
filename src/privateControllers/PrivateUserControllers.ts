import { ICreateUserProtocol, IUptateUserProtocol } from "../interfaces/IUsers";
import { HttpError } from "routing-controllers";
import PrivatePrismaController from "../privateControllers/PrivatePrismaController";
import bcryptjs from "bcryptjs";

class PrivateUserController {
  async store(body: ICreateUserProtocol) {
    const data = {
      name: body.name,
      email: body.email,
      password_hash: bcryptjs.hashSync(body.password, 8),
    };
    const user = await PrivatePrismaController.prisma.users.create({
      data,
      select: { id: true, name: true, email: true },
    });
    return user;
  }

  async index() {
    const users = PrivatePrismaController.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return users;
  }

  async show(id: number) {
    const user = await PrivatePrismaController.prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }

  async update(id: number, body: IUptateUserProtocol) {
    if (!id || !body.name || !body.email || !body.password) {
      throw new HttpError(400, "Dados inválidos ou faltando");
    }
    const user = await PrivatePrismaController.prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpError(400, "Usuário nao encontrado");
    }
    const data = {
      name: body.name,
      email: body.email,
      password_hash: bcryptjs.hashSync(body.password, 8),
    };
    const userUpdated = await PrivatePrismaController.prisma.users.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return userUpdated;
  }

  async delete(id: number) {
    const user = await PrivatePrismaController.prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpError(400, "Usuário não encontrado");
    }
    const userDeleted = await PrivatePrismaController.prisma.users.delete({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return userDeleted;
  }
}

export default new PrivateUserController();
