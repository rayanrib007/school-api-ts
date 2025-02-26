import { HttpError } from "routing-controllers";
import PrivatePrismaController from "./PrivatePrismaController";
import { IStudentsRegisterProtocol } from "../interfaces/IStudents";
import StudentValidate from "../utils/validations/StudentValidate";

class PrivateStudentController {
  async index() {
    const students = await PrivatePrismaController.prisma.students.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        age: true,
        weight: true,
        height: true,
        photos: {
          select: {
            id: true,
            original_name: true,
            file_name: true,
            student_id: true,
            url: true,
          },
          orderBy: {
            id: "desc",
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    return students;
  }

  async show(id: number) {
    if (!id || isNaN(id)) {
      throw new HttpError(400, "Id inválido");
    }
    const student = await PrivatePrismaController.prisma.students.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        age: true,
        weight: true,
        height: true,
        photos: {
          select: {
            id: true,
            original_name: true,
            file_name: true,
            student_id: true,
            url: true,
          },
          orderBy: {
            id: "desc",
          },
        },
      },
    });

    if (!student) {
      throw new HttpError(400, "Aluno não encontrado");
    }

    return student;
  }

  async create(data: IStudentsRegisterProtocol) {
    const studentValidateData =
      StudentValidate.validateStudentRegisterData(data);

    if (studentValidateData.length > 0) {
      throw new HttpError(400, studentValidateData[0]);
    }

    const student = await PrivatePrismaController.prisma.students.findUnique({
      where: {
        email: data.email,
      },
    });

    if (student) {
      throw new HttpError(
        400,
        "E-mail já cadastrado em nosso sistema. Por favor, utilize um endereço diferente",
      );
    }

    const studentUpdated = await PrivatePrismaController.prisma.students.create(
      {
        data,
      },
    );

    return studentUpdated;
  }

  async update(id: number, data: IStudentsRegisterProtocol) {
    if (!id || isNaN(id)) {
      throw new HttpError(400, "Id inválido");
    }
    const studentValidateData =
      StudentValidate.validateStudentRegisterData(data);

    if (studentValidateData.length > 0) {
      throw new HttpError(400, studentValidateData[0]);
    }
    const student = await PrivatePrismaController.prisma.students.findUnique({
      where: {
        id,
      },
    });
    if (!student) {
      throw new HttpError(400, "Aluno não encontrado");
    }
    const userEmail = await PrivatePrismaController.prisma.students.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userEmail && userEmail.id !== id) {
      throw new HttpError(
        400,
        "E-mail já cadastrado em nosso sistema. Por favor, utilize um endereço diferente",
      );
    }
    const studentUpdated = await PrivatePrismaController.prisma.students.update(
      {
        where: {
          id,
        },
        data,
      },
    );

    return studentUpdated;
  }

  async delete(id: number) {
    if (!id || isNaN(id)) {
      throw new HttpError(400, "Id inválido");
    }
    const student = await PrivatePrismaController.prisma.students.delete({
      where: {
        id,
      },
    });

    if (!student) {
      throw new HttpError(400, "Aluno não encontrado");
    }

    return student;
  }
}

export default new PrivateStudentController();
