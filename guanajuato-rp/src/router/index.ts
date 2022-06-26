import Vue from 'vue';
import VueRouter, { Route, RouteConfig } from 'vue-router';
// import LayoutNotLogged from '@/layout/LayoutNotConnected.vue';
import LayoutBase from '@/layout/LayoutBase.vue';
import { AuthModule } from '@/store/modules/Authentication';
import { NavigationModule } from '@/store/modules/NavigationMod';

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  /* ##### Home ##### */
  {
    path: NavigationModule.homeRoute,
    component: LayoutBase,
    children: [
      {
        path: '',
        name: NavigationModule.home,
        component: () => import('@/views/views/home.vue'),
        meta: {
          hidden: false,
          icon: 'mdi-home-variant-outline',
          title: NavigationModule.homeTitle,
          allowAnonymous: true,
        },
      },
    ],
  },
  /* ##### Réglements ##### */
  {
    path: NavigationModule.rulesRoute,
    component: LayoutBase,
    children: [
      {
        path: '',
        name: NavigationModule.rules,
        component: () => import('@/views/views/rules.vue'),
        meta: {
          hidden: false,
          icon: 'mdi-file-document-multiple-outline',
          title: NavigationModule.rulesTitle,
          allowAnonymous: true,
        },
      },
    ],
  },
  /* ##### Sessions ##### */
  {
    path: NavigationModule.sessionsRoute,
    component: LayoutBase,
    children: [
      {
        path: '',
        name: NavigationModule.sessions,
        component: () => import('@/views/views/sessions.vue'),
        meta: {
          hidden: false,
          icon: 'mdi-gamepad-variant-outline',
          title: NavigationModule.sessionsTitle,
        },
      },
    ],
  },
  /* ##### Entreprises/Concessionnaire ##### */
  {
    path: NavigationModule.entreprisesConcessionnaireRoute,
    component: LayoutBase,
    children: [
      {
        path: '',
        name: NavigationModule.entreprisesConcessionnaire,
        component: () => import('@/views/entreprises/concessionnaire.vue'),
        meta: {
          hidden: false,
          icon: 'mdi-car-key',
          title: NavigationModule.entreprisesConcessionnaireTitle,
        },
      },
    ],
  },
  /* ##### Test ##### */
  {
    path: NavigationModule.TestRoute,
    component: LayoutBase,
    children: [
      {
        path: '',
        name: NavigationModule.Test,
        component: () => import('@/views/views/test.vue'),
        meta: {
          hidden: false,
          icon: 'mdi-xml',
          title: NavigationModule.TestTitle,
          allowAnonymous: true,
        },
      },
    ],
  },
  // /* ##### Calendrier ##### */
  // {
  //   path: NavigationModule.calendarRoute,
  //   component: LayoutBase,
  //   children: [
  //     {
  //       path: '',
  //       name: NavigationModule.calendar,
  //       component: () => import('@/views/views/calendar.vue'),
  //       meta: {
  //         hidden: false,
  //         icon: 'mdi-calendar',
  //         title: NavigationModule.calendarTitle,
  //       },
  //     },
  //   ],
  // },
  // /* ##### News ##### */
  // {
  //   path: NavigationModule.newsRoute,
  //   component: LayoutBase,
  //   children: [
  //     {
  //       path: '',
  //       name: NavigationModule.news,
  //       component: () => import('@/views/views/news.vue'),
  //       meta: {
  //         hidden: false,
  //         icon: 'mdi-newspaper-variant-outline',
  //         title: NavigationModule.newsTitle,
  //       },
  //     },
  //   ],
  // },

  // /* ##### Entreprises ##### */
  // {
  //   path: NavigationModule.entreprisesRoute,
  //   component: LayoutBase,
  //   children: [
  //     {
  //       path: '',
  //       name: NavigationModule.entreprises,
  //       component: () => import('@/views/entreprises/entreprises.vue'),
  //       meta: {
  //         hidden: false,
  //         icon: 'mdi-office-building-outline',
  //         title: NavigationModule.entreprisesTitle,
  //       },
  //     },
  //   ],
  // },

  // /* ##### Entreprises/Mecano ##### */
  // {
  //   path: NavigationModule.entreprisesMecanoRoute,
  //   component: LayoutBase,
  //   children: [
  //     {
  //       path: '',
  //       name: NavigationModule.entreprisesMecano,
  //       component: () => import('@/views/entreprises/mecano.vue'),
  //       meta: {
  //         hidden: false,
  //         icon: 'mdi-car-cog',
  //         title: NavigationModule.entreprisesMecanoTitle,
  //       },
  //     },
  //   ],
  // },
  // /* ##### Statistiques ##### */
  // /* ##### Mentions légales ##### */
  // {
  //   path: NavigationModule.legalRoute,
  //   component: LayoutBase,
  //   children: [
  //     {
  //       path: '',
  //       name: NavigationModule.legal,
  //       component: () => import('@/views/views/legal.vue'),
  //       meta: {
  //         hidden: true,
  //         icon: 'mdi-scale-balance',
  //         title: NavigationModule.legalTitle,
  //       },
  //     },
  //   ],
  // },
  // /* ##### Auth/logout ##### */
  // {
  //   path: NavigationModule.logoutRoute,
  //   component: LayoutBase,
  //   children: [
  //     {
  //       path: '',
  //       name: NavigationModule.logout,
  //       component: () => import('@/views/authentication/logout.vue'),
  //       meta: {
  //         hidden: true,
  //         icon: 'mdi-logout-variant',
  //         title: NavigationModule.logoutTitle,
  //       },
  //     },
  //   ],
  // },
  // /* ##### Auth/confirmaccount ##### */
  // {
  //   path: NavigationModule.confirmAccountRoute,
  //   component: LayoutBase,
  //   children: [
  //     {
  //       path: '',
  //       name: NavigationModule.confirmAccount,
  //       component: () => import('@/views/authentication/confirmaccount.vue'),
  //       meta: {
  //         hidden: true,
  //         icon: 'mdi-account-outline',
  //         title: NavigationModule.confirmAccountTitle,
  //       },
  //     },
  //   ],
  // },
  // /* ##### Auth/forgotpassword ##### */
  // {
  //   path: NavigationModule.forgotPasswordRoute,
  //   component: LayoutBase,
  //   children: [
  //     {
  //       path: '',
  //       name: NavigationModule.forgotPassword,
  //       component: () => import('@/views/authentication/forgotpassword.vue'),
  //       meta: {
  //         hidden: true,
  //         icon: 'mdi-account-outline',
  //         title: NavigationModule.forgotPasswordTitle,
  //       },
  //     },
  //   ],
  // },
  // /* ##### Auth/resetpassword ##### */
  // {
  //   path: NavigationModule.resetPasswordRoute,
  //   component: LayoutBase,
  //   children: [
  //     {
  //       path: '',
  //       name: NavigationModule.resetPassword,
  //       component: () => import('@/views/authentication/resetpassword.vue'),
  //       meta: {
  //         hidden: true,
  //         icon: 'mdi-account-outline',
  //         title: NavigationModule.resetPasswordTitle,
  //       },
  //     },
  //   ],
  // },
  // /* ##### Profile ##### */
  // {
  //   path: NavigationModule.profileRoute,
  //   component: LayoutBase,
  //   children: [
  //     {
  //       path: '',
  //       name: NavigationModule.profile,
  //       component: () => import('@/views/profile/profile.vue'),
  //       meta: {
  //         hidden: true,
  //         icon: 'mdi-account-outline',
  //         title: NavigationModule.profileTitle,
  //       },
  //     },
  //   ],
  // },
  /* autre => redirect to home */
  {
    path: '*',
    redirect: NavigationModule.home,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  base: '',
  // process.env.VUE_APP_BASE_URL,
});

router.beforeEach(async (to: Route, from: Route, next: any) => {
  const loggedIn = await AuthModule.isLoggedIn();
  if (!to.meta.allowAnonymous && !loggedIn) {
    router.push(NavigationModule.home);
    //TODO crée une popup d'alerte
    alert('Veuillez vous connecter pour accéder à cette page');
  } else next();
});

//défini le titre du tab
router.afterEach((to: any) => {
  document.title = `${to.meta.title as string} · ${NavigationModule.nomApp}`;
});

export default router;
