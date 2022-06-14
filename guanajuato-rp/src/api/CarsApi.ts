import BaseApi from '@/api/BaseApi';

export class CarsApi {
  static async getListMakers() {
    const response = await BaseApi.CarsApi.get('api/Infos/Makers');
    return response.data;
  }
  static async getListTypes() {
    const response = await BaseApi.CarsApi.get('api/Infos/Types');
    return response.data;
  }
  static async getListPays() {
    const response = await BaseApi.CarsApi.get('api/Infos/Pays');
    return response.data;
  }
}
