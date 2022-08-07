<template>
  <v-navigation-drawer v-model="drawer" app width="220" class="pt-0">
    <v-list nav dense flat>
      <v-list-item align="center" justify="center">
        <v-list-item-content>
          <v-list-item-title class="text-h6"> {{ nomApp }} </v-list-item-title>
          <v-list-item-subtitle> Forza Horizon 5 </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-group
        v-for="route in routesDisplay"
        :key="route.meta.title"
        no-action
        class="m-0 p-0"
        active-class="list-item-selected"
        append-icon=""
      >
        <template v-slot:activator>
          <v-list-item :to="route" active-class="list-item-selected">
            <v-list-item-icon>
              <v-icon> {{ route.meta.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="route.meta.title"></v-list-item-title>
          </v-list-item>
        </template>
      </v-list-group>
    </v-list>

    <v-container style="position: absolute; bottom: 5px">
      <v-row align="center" justify="center">
        <v-switch v-model="darktheme" label="Dark Theme" append-icon="mdi-theme-light-dark" dense />
      </v-row>
      <v-row align="center" justify="center">
        <v-img src="@/assets/guanajuato_logo_256.png" max-height="30" max-width="30"></v-img>
        <span class="ml-2 font-weight-light">Version {{ version }}</span>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { RouteConfig } from 'vue-router';
import { routes } from '@/router';
import { PropSync } from 'vue-property-decorator';
import { NavigationModule } from '@/store/modules/NavigationMod';
import { CookieAndStorage } from '@/store/modules/CookieAndStorage';
import { AuthModule } from '@/store/modules/Authentication';

@Component
export default class Menu extends Vue {
  @PropSync('Drawer')
  private drawer!: boolean;
  private routesDisplay: (RouteConfig | undefined)[] = [];
  private isConnected = false;
  private haveAdminRole = false;

  private get darktheme() {
    return CookieAndStorage.darkTheme;
  }
  private set darktheme(value: boolean) {
    this.$vuetify.theme.dark = value;
    CookieAndStorage.setDarkTheme(value);
  }

  async mounted() {
    this.isConnected = await AuthModule.isLoggedIn();
    this.haveAdminRole = await AuthModule.isAdmin();
    console.log('haveAdminRole', this.haveAdminRole);

    this.$vuetify.theme.dark = CookieAndStorage.darkTheme;
    this.routesDisplay = routes.flatMap((e) => e.children).filter((r) => r && r.meta && !r.meta.hidden);
    if (!this.haveAdminRole) {
      this.routesDisplay = routes
        .flatMap((e) => e.children)
        .filter((r) => r && r.meta && !r.meta.hidden && !r.meta.needAdmin);
    }
    if (!this.isConnected) {
      this.routesDisplay = routes
        .flatMap((e) => e.children)
        .filter((r) => r && r.meta && !r.meta.hidden && r.meta.allowAnonymous);
    }
  }

  get currentRouteName() {
    return this.$route?.meta?.title;
  }

  get nomApp() {
    return NavigationModule.nomApp;
  }
  get version() {
    return NavigationModule.version;
  }
  get home() {
    return NavigationModule.homeRoute;
  }
}
</script>
