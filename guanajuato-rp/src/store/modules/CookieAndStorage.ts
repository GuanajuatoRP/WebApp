import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store/index';

@Module({ dynamic: true, store, name: 'CookieAndLocalStorage' })
class CookieAndLocalStorage extends VuexModule {
  get darkTheme() {
    const darktheme = localStorage.getItem('dark-theme') === 'true' || false;
    console.log('DarkTheme : ', darktheme);
    return darktheme;
  }

  @Mutation
  public setDarkTheme(value: boolean) {
    localStorage.setItem('dark-theme', String(value));
  }
}

export const CookieAndStorage = getModule(CookieAndLocalStorage);
