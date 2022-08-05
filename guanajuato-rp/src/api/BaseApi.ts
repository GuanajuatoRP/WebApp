import { AuthModule } from '@/store/modules/Authentication';
import axios, { AxiosInstance } from 'axios';

export default class BaseApi {
  private static _appAnonymous: AxiosInstance | null;
  private URL = 'https://localhost:49161' as string;
  static get AppAnonymous() {
    if (!this._appAnonymous) {
      this._appAnonymous = axios.create({
        baseURL: 'https://localhost:49161',
      });
    }
    return this._appAnonymous;
  }

  private static _appLogged: AxiosInstance | null;
  static get AppLogged() {
    if (!this._appLogged) {
      this._appLogged = axios.create({
        baseURL: 'https://localhost:49161',
        headers: { Authorization: `Bearer ${AuthModule.token}` },
      });
    }
    return this._appLogged;
  }

  private static _authentication: AxiosInstance | null;
  static get Authentication() {
    if (!this._authentication) {
      this._authentication = axios.create({
        baseURL: 'https://localhost:49161',
      });
    }
    return this._authentication;
  }

  static reset() {
    this._authentication = null;
    this._appAnonymous = null;
    this._appLogged = null;
  }
}
