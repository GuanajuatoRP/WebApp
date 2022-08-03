import BaseApi from '@/api/BaseApi';

export class RegisterApi {
  static async isUserOnServer(discordId) {
    const response = await BaseApi.AppToBotApi.get(`/isUserOnServer/${discordId}`);
    return response.data;
  }
  static async isUserOnDB(discordId) {
    const response = await BaseApi.AppAnonymous.get(`/UserExist/${discordId}`);
    return response;
  }
  static async registerUser(registerModel) {
    const response = await BaseApi.AppAnonymous.post(`/register/${registerModel.discordId}`, registerModel);
    return response;
  }
}
