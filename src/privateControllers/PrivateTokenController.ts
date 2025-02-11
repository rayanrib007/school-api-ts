import { HttpError } from "routing-controllers";
import PrivatePrismaController from "../privateControllers/PrivatePrismaController";
import { ICreateUserTokenProtocol } from "../interfaces/tokens/IToken";
import Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export class PrivateTokenController {
  async store(body: ICreateUserTokenProtocol) {
    if (!body.email || !body.password) {
      throw new HttpError(400, "Dados inválidos");
    }

    const user = await PrivatePrismaController.prisma.users.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      throw new HttpError(400, "Email inválido");
    }

    if (!bcryptjs.compareSync(body.password, user.password_hash)) {
      throw new HttpError(400, "Senha inválida");
    }

    const token = Jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SECRET as string,
      { expiresIn: `${Number(process.env.TOKEN_EXPIRATION)}d` },
    );

    return { token };
  }
}

export default new PrivateTokenController();
