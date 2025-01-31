import { JsonController, Get } from "routing-controllers";

@JsonController("/")
export default class HomeController {
  @Get("/")
  getAll() {
    return {
      message: "Hello World",
    };
  }
}
