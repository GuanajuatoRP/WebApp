import BaseApi from '@/api/BaseApi';
import { LoginModel } from '@/models/Auth/LoginModel';

export class UserAPI {
  static async login(username: string, password: string) {
    const loginInfo = new LoginModel();
    loginInfo.username = username;
    loginInfo.password = password;
    return await BaseApi.AppAnonymous.post('/Login', loginInfo);
  }

  static async getCarouselImage() {
    return await BaseApi.AppAnonymous.get('api/Web/CarouselImages');
  }
}
