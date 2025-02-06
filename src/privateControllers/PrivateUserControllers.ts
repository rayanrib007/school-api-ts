import { ICreateUserProtocol } from "../interfaces/users/IUsers";
import PrivatePrismaController from "../privateControllers/PrivatePrismaController";

class PrivateUserController {
  async store(data: ICreateUserProtocol) {
    const user = await PrivatePrismaController.prisma.users.create({ data });
    return user;
  }
}

export default new PrivateUserController();
