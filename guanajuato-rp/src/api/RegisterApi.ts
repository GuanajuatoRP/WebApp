import BaseApi from '@/api/BaseApi';
import { RegisterModel } from '@/models/Auth/RegisterModel';
import { ValidationModel } from '@/models/Auth/ValidationModel';

export class RegisterApi {
  static async isUserOnServer(discordId: string) {
    const response = await BaseApi.AppToBotApi.get(`/isUserOnServer/${discordId}`);
    return response.data;
  }
  static async isUserOnDB(discordId: string) {
    const response = await BaseApi.AppAnonymous.get(`/UserExist/${discordId}`);
    return response;
  }
  static async registerUser(registerModel: RegisterModel) {
    const response = await BaseApi.AppAnonymous.post(`/register/${registerModel.DiscordId}`, registerModel);
    return response;
  }
  static async registrationValidation(validationModel: ValidationModel) {
    const response = await BaseApi.AppAnonymous.post(
      `register/validation/${validationModel.discordId}`,
      validationModel
    );
    return response;
  }
}
