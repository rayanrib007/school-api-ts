/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { HttpError } from "routing-controllers";
import Jwt from "jsonwebtoken";
import { IRequestAuthenticateRequestProtocol } from "../interfaces/IUsers";
import PrivatePrismaController from "../privateControllers/PrivatePrismaController";

export class MiddlewareLoginRequired implements ExpressMiddlewareInterface {
  async use(
    req: IRequestAuthenticateRequestProtocol,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw new HttpError(401, "Requer login");
      }

      const token = authorization.split(" ")[1];
      const data = Jwt.verify(token, process.env.TOKEN_SECRET as string);
      const { id, email } = data as Jwt.JwtPayload;

      const user = await PrivatePrismaController.prisma.users.findUnique({
        where: {
          id,
          email,
        },
      });

      if (!user) {
        throw new HttpError(401, "Sessão expirada ou token inválido");
      }

      req.user = {
        userId: Number(id),
        userEmail: email,
      };

      next();
    } catch (error: any) {
      return res.status(error.httpCode ? error.httpCode : 500).json({
        message: error.httpCode ? error.message : "Falha interna no servidor",
        type: "error",
        data: null,
      });
    }
  }
}
