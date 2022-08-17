import { AuthModule } from '@/store/modules/Authentication';
import axios, { AxiosInstance } from 'axios';

export default class BaseApi {
  private static _appAnonymous: AxiosInstance | null;
  static get AppAnonymous() {
    if (!this._appAnonymous) {
      this._appAnonymous = axios.create({
        baseURL: process.env.VUE_APP_USER_API_URL,
      });
      console.log('process.env.VUE_APP_USER_API_URL', process.env.VUE_APP_USER_API_URL);
    }
    return this._appAnonymous;
  }

  private static _appLogged: AxiosInstance | null;
  static get AppLogged() {
    if (!this._appLogged) {
      this._appLogged = axios.create({
        baseURL: process.env.VUE_APP_USER_API_URL,
        headers: { Authorization: `Bearer ${AuthModule.token}` },
      });
    }
    return this._appLogged;
  }

  private static _authentication: AxiosInstance | null;
  static get Authentication() {
    if (!this._authentication) {
      this._authentication = axios.create({
        baseURL: process.env.VUE_APP_USER_API_URL,
      });
    }
    return this._authentication;
  }

  private static _appToBotApi: AxiosInstance | null;
  static get AppToBotApi() {
    if (!this._appToBotApi) {
      this._appToBotApi = axios.create({
        baseURL: process.env.VUE_APP_BOT_API_URL,
      });
    }
    return this._appToBotApi;
  }

  static reset() {
    this._authentication = null;
    this._appAnonymous = null;
    this._appLogged = null;
    this._appToBotApi = null;
  }
}
