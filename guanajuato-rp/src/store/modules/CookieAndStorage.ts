import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store/index';

@Module({ dynamic: true, store, name: 'CookieAndLocalStorage' })
class CookieAndLocalStorage extends VuexModule {
  get darkTheme() {
    let darktheme: boolean;
    if (localStorage.getItem('dark-theme') != null) darktheme = localStorage.getItem('dark-theme') === 'true' || false;
    else darktheme = true;
    return darktheme;
  }

  @Mutation
  public setDarkTheme(value: boolean) {
    localStorage.setItem('dark-theme', String(value));
  }
}

export const CookieAndStorage = getModule(CookieAndLocalStorage);
