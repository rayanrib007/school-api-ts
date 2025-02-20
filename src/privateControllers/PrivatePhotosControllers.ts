import { HttpError } from "routing-controllers";
import { IPhotosUploadProtocol } from "../interfaces/IPhotos";

class PrivatePhotosControllers {
  async store(file: IPhotosUploadProtocol | undefined) {
    if (!file) {
      throw new HttpError(400, "Arquivo inválido");
    }
    return file;
  }
}

export default new PrivatePhotosControllers();
