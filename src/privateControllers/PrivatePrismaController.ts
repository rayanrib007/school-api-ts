import { PrismaClient } from "@prisma/client";

class PrivatePrismaController {
  public prisma = new PrismaClient();
}

export default new PrivatePrismaController();
