import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { JsonConvert } from 'json2typescript';
import jwtDecode from 'jwt-decode';
import api from '@/api/BaseApi';
import { AuthUser } from '@/models/Authentication/AuthUser';
import { AuthParams } from '@/models/Authentication/AuthParams';
import { Token } from '@/models/Authentication/Token';
import store from '@/store/index';

export interface IAuthState {
  token: string | null;
  expire: string;
  user: AuthUser | null;
  loading: boolean;
  errorMessage: string;
}

@Module({ dynamic: true, store, name: 'Authentication' })
class Authentication extends VuexModule implements IAuthState {
  //#region Propriétés
  public token: string | null = localStorage.getItem('Auth-Token');
  public expire: string = localStorage.getItem('token-expire') || '';
  public user: AuthUser | null = null;
  public errorMessage = '';
  public loading = false;
  //#endregion

  //#region Mutations
  @Mutation
  private setLoading(value: boolean) {
    this.loading = value;
  }

  @Mutation
  private setErrorMessage(value: string) {
    this.errorMessage = value;
  }

  @Mutation
  private setToken(token: string): void {
    localStorage.setItem('Auth-Token', token);
  }

  @Mutation
  private setExpiration(expire: number): void {
    const dateExpire: string = expire.toString();
    localStorage.setItem('token-expire', dateExpire);
    this.expire = dateExpire;
  }

  @Action
  private getTokenExpirationDate(encodedToken: Token) {
    const token: Token = jwtDecode(encodedToken as unknown as string);
    if (!token.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  }

  @Mutation
  private isTokenExpired(encodedToken: Token): boolean {
    const token: Token = jwtDecode(encodedToken as unknown as string);

    if (!token || !token.exp) {
      return false;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);
    // eslint-disable-next-line
    return date! > new Date();
  }
  @Mutation
  private setUser(user: AuthUser): void {
    this.user = user;
  }

  @Mutation
  public resetToken(): void {
    localStorage.removeItem('Auth-Token');
    localStorage.removeItem('token-expire');
    this.expire = '';
    this.token = '';
    this.user = null;
  }

  @Mutation
  public getUserInfo(): any {
    if (this.isLoggedIn()) {
      // eslint-disable-next-line
      return jwtDecode(this.getToken()! as unknown as string);
    }
  }

  //#endregion

  //#region Actions

  @Action({ rawError: true })
  public login(userInfo: AuthParams): Promise<any> {
    return new Promise((resolve, reject) => {
      api.Authentication.post<any>('/Login', userInfo)
        .then((resp) => {
          const token: string = resp.data.token;

          this.setToken(token);
          const tokenDecode = jwtDecode(token);
          const jsonConvert: JsonConvert = new JsonConvert();
          const user = jsonConvert.deserializeObject(tokenDecode, AuthUser);

          this.setExpiration(user.Exp);
          this.setUser(user);
          resolve(resp);
        })
        .catch((err) => {
          this.resetToken();
          let errorMessage = "Impossible de se connecter au serveur d'authentification";
          if (err.response && err.response.status === 400) {
            errorMessage = err.response.data.Message;
          }
          reject(errorMessage);
        });
    });
  }

  @Action({ rawError: true })
  public loadUser(): void {
    try {
      const tokenDecode = jwtDecode(this.token as unknown as string);
      const jsonConvert: JsonConvert = new JsonConvert();
      this.setUser(jsonConvert.deserializeObject(tokenDecode, AuthUser));
    } catch (err) {
      this.resetToken();
    }
  }

  @Action
  private async getToken(): Promise<Token> {
    return localStorage.getItem('Auth-Token') as unknown as Token;
  }

  @Action
  public async isLoggedIn(): Promise<boolean> {
    // eslint-disable-next-line
    const token = await this.getToken();

    if (!!token && !this.isTokenExpired(token)) {
      return true;
    } else return false;
  }
  @Action
  public async isAdmin(): Promise<boolean> {
    // eslint-disable-next-line
    const token: Token = jwtDecode(this.token as unknown as string);

    if (token.Roles.includes('Admin')) {
      return true;
    } else return false;
  }

  @Action
  public logout() {
    this.resetToken();
    api.reset();
  }
  //#endregion
}

export const AuthModule = getModule(Authentication);
