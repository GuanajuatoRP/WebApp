import BaseApi from '@/api/BaseApi';

export class PermisApi {
  static async getAllPermisNames() {
    const response = await BaseApi.AppLogged.get('api/Enum/PermisName');
    return response.data;
  }
}
