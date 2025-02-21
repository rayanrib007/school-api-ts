import { HttpError } from "routing-controllers";
import PrivatePrismaController from "./PrivatePrismaController";
import { IPhotosUploadProtocol } from "../interfaces/IPhotos";

class PrivatePhotosControllers {
  async store(file: IPhotosUploadProtocol | undefined, student_id: number) {
    if (!file) {
      throw new HttpError(400, "Arquivo inválido");
    }
    const student = await PrivatePrismaController.prisma.students.findUnique({
      where: {
        id: student_id,
      },
    });
    if (!student) {
      throw new HttpError(400, "Aluno não encontrado");
    }
    const photo = await PrivatePrismaController.prisma.photos.create({
      data: {
        student_id,
        original_name: file.originalname,
        file_name: file.filename,
      },
    });
    return photo;
  }
}

export default new PrivatePhotosControllers();
