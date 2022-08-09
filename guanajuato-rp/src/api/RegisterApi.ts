import BaseApi from '@/api/BaseApi';

export class RegisterApi {
  static async isUserOnServer(discordId: any) {
    const response = await BaseApi.AppToBotApi.get(`/isUserOnServer/${discordId}`);
    return response.data;
  }
  static async isUserOnDB(discordId: any) {
    const response = await BaseApi.AppAnonymous.get(`/UserExist/${discordId}`);
    return response;
  }
  static async registerUser(registerModel: any) {
    const response = await BaseApi.AppAnonymous.post(`/register/${registerModel.discordId}`, registerModel);
    return response;
  }
  static async registrationValidation(validationModel: any) {
    const response = await BaseApi.AppAnonymous.post(
      `register/validation/${validationModel.discordId}`,
      validationModel
    );
    return response;
  }
}
