import BaseApi from '@/api/BaseApi';

export class CarsApi {
  static async getListMakers() {
    const response = await BaseApi.AppLogged.get('api/Infos/Makers');
    return response.data;
  }
  static async getListTypes() {
    const response = await BaseApi.AppLogged.get('api/Infos/Types');
    return response.data;
  }
  static async getListPays() {
    const response = await BaseApi.AppLogged.get('api/Infos/Pays');
    return response.data;
  }

  static async search(marque: string, pays: string, type: string, modele: string) {
    const response = await BaseApi.AppLogged.get(
      `api/OriginalCar/Search?marque=${marque}&pays=${pays}&type=${type}&modele=${modele}`
    );
    return response.data;
  }
}
