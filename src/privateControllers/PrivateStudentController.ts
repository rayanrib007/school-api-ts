import PrivatePrismaController from "./PrivatePrismaController";

class PrivateStudentController {
  async index() {
    const students = PrivatePrismaController.prisma.students.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        age: true,
        weight: true,
        height: true,
      },
    });
    return students;
  }
}

export default new PrivateStudentController();
