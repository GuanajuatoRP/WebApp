import { AuthModule } from '@/store/modules/Authentication';
import axios, { AxiosInstance } from 'axios';

export default class BaseApi {
  private static _appAnonymous: AxiosInstance | null;
  static get AppAnonymous() {
    if (!this._appAnonymous) {
      this._appAnonymous = axios.create({
        baseURL: 'https://localhost:49155',
        // baseURL: process.env.VUE_APP_USERAP  I,
      });
    }
    return this._appAnonymous;
  }

  private static _appLogged: AxiosInstance | null;
  static get AppLogged() {
    if (!this._appLogged) {
      this._appLogged = axios.create({
        baseURL: process.env.VUE_APP_CARAPI,
        headers: { Authorization: `Bearer ${AuthModule.token}` },
      });
    }
    return this._appLogged;
  }

  private static _authentication: AxiosInstance | null;
  static get Authentication() {
    if (!this._authentication) {
      this._authentication = axios.create({
        baseURL: process.env.VUE_APP_USERAPI,
      });
    }
    return this._authentication;
  }

  private static _carsApi: AxiosInstance | null;
  static get CarsApi() {
    if (!this._carsApi) {
      this._carsApi = axios.create({
        //baseURL: process.env.VUE_APP_CARAPI,
        baseURL: 'https://localhost:49159',
      });
    }
    return this._carsApi;
  }

  static reset() {
    this._authentication = null;
    this._appAnonymous = null;
    this._appLogged = null;
    this._carsApi = null;
  }
}
