/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonController, Get } from "routing-controllers";

@JsonController("/")
export default class HomeController {
  @Get("/")
  async home() {
    try {
      return {
        message: "home",
      };
    } catch (error: any) {
      return {
        message: "Erro home",
        error: error.message,
      };
    }
  }
}
