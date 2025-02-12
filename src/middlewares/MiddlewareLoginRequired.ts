/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { HttpError } from "routing-controllers";
import Jwt from "jsonwebtoken";
import { IRequestAuthenticateRequestProtocol } from "../interfaces/IUsers";

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

      req.user = {
        userId: id,
        userEmail: email,
      };

      next();
    } catch (error: any) {
      return res.status(error.httpCode ? error.httpCode : 401).json({
        message: error.httpCode
          ? error.message
          : "Sessão expirada ou token inválido",
        type: "error",
        data: null,
      });
    }
  }
}
