import BaseApi from '@/api/BaseApi'
import { LoginModel } from '@/models/Auth/LoginModel'

export default class AuthApi {
    static async login(username: string, password: string) {
      const loginInfo = new LoginModel();
      loginInfo.username = username;
      loginInfo.password = password;
      return await BaseApi.AppAnonymous.post('/Login', loginInfo);
    }

    /*static async isActivated(login: string) {
      const response = await BaseApi.apiAuthNotLogged.get<boolean>(`/isActivated?login=${login}`);
      return response.data;
    }*/
  }