import { PrismaClient } from "@prisma/client";

export default class PrivatePrismaController {
  static prisma = new PrismaClient().$extends({
    result: {
      photos: {
        url: {
          needs: { file_name: true },
          compute(photo) {
            return `${process.env.API_URL}/images/${photo.file_name}`;
          },
        },
      },
    },
  });
}
