/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonController, Get } from "routing-controllers";
import PrivatePrismaController from "../privateControllers/PrivatePrismaController";

@JsonController("/")
export default class HomeController {
  @Get("/")
  async getAll() {
    try {
      const student = await PrivatePrismaController.prisma.students.create({
        data: {
          name: "michely",
          surname: "silva",
          email: "michely@hotmail.com",
          age: 20,
          weight: 70.5,
          height: 1.75,
        },
      });
      return {
        message: "Estudante criado com sucesso!",
        student,
      };
    } catch (error: any) {
      return {
        message: "Erro ao criar estudante",
        error: error.message,
      };
    }
  }
}
