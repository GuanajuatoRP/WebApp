<template>
  <v-app-bar app color="secondary" dark src="@/assets/fhd-nav-background.jpg">
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(30,30,30,.7), rgba(255,255,255,.7)"></v-img>
    </template>

    <v-app-bar-nav-icon @click="changeDrawer(!drawer)" class="d-flex"></v-app-bar-nav-icon>

    <v-img
      alt="Guanajuato Logo"
      class="shrink mr-2"
      contain
      src="@/assets/guanajuato_logo_256.png"
      transition="scale-transition"
      width="50"
    />

    <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon href="https://discord.gg/BtkWVH2Kq9" target="_blank">
      <v-icon color="#5865F2">mdi-discord</v-icon>
    </v-btn>

    <!-- Menu Profil à droite -->
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-model="connected" icon v-bind="attrs" v-on="on">
          <v-icon color="black">mdi-account</v-icon>
        </v-btn>
        <v-btn color="primary"> Se connecter </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="right_menu_item in right_menu" :key="right_menu_item" :to="{ path: right_menu_item.route }">
          <v-list-item-icon>
            <v-icon>{{ right_menu_item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ right_menu_item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { RouteConfig } from 'vue-router';
import { routes } from '@/router';
import { PropSync } from 'vue-property-decorator';
import { NavigationModule } from '@/store/modules/NavigationMod';

@Component
export default class NavBar extends Vue {
  @PropSync('NavBar')
  private navbar!: boolean;
  @PropSync('Drawer')
  private drawer!: boolean;
  private routesDisplay: (RouteConfig | undefined)[] = [];

  mounted() {
    this.routesDisplay = routes.flatMap((e) => e.children).filter((r) => r && r.meta && !r.meta.hidden);
  }

  private changeDrawer(drawerOn: boolean) {
    this.drawer = drawerOn;
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

  private isActive(route: RouteConfig): boolean {
    console.log(`Testeur : ${route?.meta?.title}`);
    console.log(`Testeur child : ${route?.children?.map((e) => e.meta?.title)}`);
    console.log(`Route actuelle : ${this.$route?.meta?.title}`);

    if (this.$route?.meta?.title == route?.meta?.title) {
      console.log(true);
      return true;
    }

    if (route.children && route.children.some((e) => e?.meta?.title == this.$route?.meta?.title)) {
      console.log(true);
      return true;
    }
    console.log(false);
    return false;
  }
}
</script>
