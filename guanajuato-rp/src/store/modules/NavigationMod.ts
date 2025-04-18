import { Module, VuexModule, getModule } from 'vuex-module-decorators';
import store from '@/store/index';

@Module({ dynamic: true, store, name: 'NavigationMod' })
class NavigationMod extends VuexModule {
  public nomApp = 'Guanajuato RP';
  public version = '1.0.0';

  /* ##### Home ##### */
  public homeRoute = '';
  public homeTitle = 'Accueil';
  public home = 'Home';

  /* ##### Calendrier ##### */
  public calendarRoute = '/calendrier';
  public calendarTitle = 'Calendrier';
  public calendar = 'Calendrier';

  /* ##### News ##### */
  public newsRoute = '/news';
  public newsTitle = 'News';
  public news = 'News';

  /* ##### Réglements ##### */
  public rulesRoute = '/info';
  public rulesTitle = 'Informations Générales';
  public rules = 'Info';

  /* ##### Sessions ##### */
  public sessionsRoute = '/sessions';
  public sessionsTitle = 'Sessions';
  public sessions = 'Sessions';

  /* ##### Entreprises ##### */
  public entreprisesRoute = '/entreprises';
  public entreprisesTitle = 'Entreprises';
  public entreprises = 'Entreprises';

  //test
  public TestRoute = '/Test';
  public TestTitle = 'Test';
  public Test = 'Test';

  //dealership
  public entreprisesConcessionnaireRoute = '/entreprises/concessionnaire';
  public entreprisesConcessionnaireTitle = 'Concessionnaire';
  public entreprisesConcessionnaire = 'Concessionnaire';

  //mécano
  public entreprisesMecanoRoute = '/entreprises/mecano';
  public entreprisesMecanoTitle = 'Mécano';
  public entreprisesMecano = 'Mécano';

  // TODO : agent immobilier
  //public entreprisesImmobilierRoute = '/entreprises/immo';
  //public entreprisesImmobilierTitle = 'Agent Immobilier';
  //public entreprisesImmobilier = 'Immobilier';

  /* ##### TODO : Statistiques ##### */
  public statsRoute = '/stats';
  public statsTitle = 'Statistiques';
  public stats = 'Statistiques';

  /* ##### Mentions légales ##### */
  public legalRoute = '/legal';
  public legalTitle = 'Mentions légales';
  public legal = 'Legal';

  //logout
  public logoutRoute = '/logout';
  public logoutTitle = 'Déconnexion';
  public logout = 'Logout';

  //register
  public registerRoute = '/register';
  public registerTitle = "S'enregistrer";
  public register = 'Register';

  //confirm account
  public confirmAccountRoute = '/confirmaccount';
  public confirmAccountTitle = 'Valider son compte';
  public confirmAccount = 'ConfirmAccount';

  //forgot password
  public forgotPasswordRoute = '/forgotpassword';
  public forgotPasswordTitle = 'Mot de passe oublié';
  public forgotPassword = 'ForgotPassword';

  //reset password
  public resetPasswordRoute = '/resetpassword';
  public resetPasswordTitle = 'Reset de mot de passe';
  public resetPassword = 'ResetPassword';

  /* ##### Profile ##### */
  public profilRoute = '/profil';
  public profilTitle = 'Profil';
  public profil = 'Profil';

  /* ##### ADMIN userCarlist ##### */
  public userCarlistRoute = '/admin/userCarlist';
  public userCarlistTitle = 'userCarlist';
  public userCarlist = 'userCarlist';

  /* ##### ADMIN userList ##### */
  public userListRoute = '/admin/userList';
  public userListTitle = 'userList';
  public userList = 'userList';

  public currentPageName = '';
  public previousTarget = '';
}

export const NavigationModule = getModule(NavigationMod);
