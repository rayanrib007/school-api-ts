/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, JsonController, Post, Res } from "routing-controllers";
import { ICreateUserTokenProtocol } from "../interfaces/IToken";
import PrivateTokenController from "../privateControllers/PrivateTokenController";
import { Response } from "express";

@JsonController("/tokens")
export default class HomeController {
  @Post("/create")
  async store(@Body() body: ICreateUserTokenProtocol, @Res() res: Response) {
    try {
      const token = await PrivateTokenController.store(body);

      return {
        message: "Ok",
        type: "success",
        data: token,
      };
    } catch (error: any) {
      return res.status(error.httpCode ? error.httpCode : 500).json({
        message: error.httpCode ? error.message : "Erro interno do servidor",
        type: "sdfsdf",
        data: null,
      });
    }
  }
}
