import BaseApi from '@/api/BaseApi';

export class InfoGeneralApi {
  static async getText() {
    const response = await BaseApi.AppAnonymous.get('api/Markdowns/web');
    return response.data;
  }
}
