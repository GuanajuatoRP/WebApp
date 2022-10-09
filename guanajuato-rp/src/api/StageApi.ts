import BaseApi from '@/api/BaseApi';

export class StageApi {
  static async getAllStagesNames() {
    const response = await BaseApi.AppLogged.get('api/Enum/StageName');
    return response.data;
  }
}
