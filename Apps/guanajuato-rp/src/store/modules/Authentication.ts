import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { JsonConvert } from 'json2typescript';
import jwtDecode from 'jwt-decode';
import api from '@/api/BaseApi';
import { AuthUser } from '@/models/Authentication/AuthUser';
import { AuthParams } from '@/models/Authentication/AuthParams';
import store from '@/store/index';
import { Token } from '@/models/Authentication/Token';

export interface IAuthState {
  token: string;
  expire: string;
  user: AuthUser | null;
  loading: boolean;
  errorMessage: string;
}

@Module({ dynamic: true, store, name: 'Authentication' })
class Authentication extends VuexModule implements IAuthState {
  //#region Propriétés
  public token: string = localStorage.getItem('Auth-Token') || '';
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
  private setToken(token: Token): void {
    localStorage.setItem('Auth-Token', token.value);
    this.token = token.value;
  }

  @Mutation
  private setExpiration(expire: number): void {
    const dateExpire: string = expire.toString();
    localStorage.setItem('token-expire', dateExpire);
    this.expire = dateExpire;
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
  //#endregion

  //#region Actions

  @Action({ rawError: true })
  public login(userInfo: AuthParams): Promise<any> {
    return new Promise((resolve, reject) => {
      api.Authentication.post<Token>('Authentication/LoginApp', userInfo)
        .then((resp) => {
          this.setToken(resp.data);
          const tokenDecode = jwtDecode(resp.data.value);
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
      const tokenDecode = jwtDecode(this.token);
      const jsonConvert: JsonConvert = new JsonConvert();
      this.setUser(jsonConvert.deserializeObject(tokenDecode, AuthUser));
    } catch (err) {
      this.resetToken();
    }
  }

  @Action
  public logout() {
    this.resetToken();
    api.reset();
  }
  //#endregion
}

export const AuthModule = getModule(Authentication);
