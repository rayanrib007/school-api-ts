import { IStudentsRegisterProtocol } from "../../interfaces/IStudents";

class StudentValidate {
  private readonly emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  validateStudentRegisterData(data: IStudentsRegisterProtocol) {
    const errorsMessage: string[] = [];

    if (!data.name) {
      errorsMessage.push("O campo nome é obrigatório");
    }
    if (!data.surname) {
      errorsMessage.push("O campo sobrenome é obrigatório");
    }
    if (!data.email || !this.emailRegex.test(data.email)) {
      errorsMessage.push("Email inválido");
    }
    if (!data.age) {
      errorsMessage.push("O campo idade é obrigatório");
    }
    if (!data.weight) {
      errorsMessage.push("O campo peso é obrigatório");
    }
    if (!data.height) {
      errorsMessage.push("O campo altura é obrigatório");
    }
    return errorsMessage;
  }
}

export default new StudentValidate();
