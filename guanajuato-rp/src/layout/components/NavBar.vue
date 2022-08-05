<template>
  <v-app-bar app color="secondary" dark src="@/assets/fhd-nav-background.jpg">
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(30,30,30,.7), rgba(255,255,255,.7)"></v-img>
    </template>

    <v-app-bar-nav-icon class="d-flex" @click="changeDrawer(!drawer)"></v-app-bar-nav-icon>

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
    <!-- Bouton login/ logout-->
    <Login v-if="!isConnected" />
    <v-btn icon color="#FF0000" dark class="ml-3 btn_appBar" @click.stop="logout" v-else>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    <!-- Menu Profil à droite -->
    <v-menu bottom left v-if="isConnected">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" href="http://localhost:8080/profil">
          <v-icon color="black">mdi-account</v-icon>
        </v-btn>
      </template>

      <!--<v-list>
        <v-list-item v-for="right_menu_item in right_menu" :key="right_menu_item" :to="{ path: right_menu_item.route }">
          <v-list-item-icon>
            <v-icon>{{ right_menu_item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ right_menu_item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>-->
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { RouteConfig } from 'vue-router';
import { PropSync } from 'vue-property-decorator';
import { NavigationModule } from '@/store/modules/NavigationMod';
import Login from './Login.vue';
import { AuthModule } from '@/store/modules/Authentication';

@Component({ components: { Login } })
export default class NavBar extends Vue {
  @PropSync('NavBar')
  private navbar!: boolean;
  @PropSync('Drawer')
  private drawer!: boolean;

  private isConnected = false;

  async mounted() {
    this.isConnected = await AuthModule.isLoggedIn();
  }

  private changeDrawer(drawerOn: boolean) {
    this.drawer = drawerOn;
  }

  private async logout() {
    AuthModule.logout();
    if (this.$router.currentRoute.name !== 'Home') {
      await this.$router.push({ name: NavigationModule.home, params: { noAutoLogon: 'true' } });
    }
    this.$router.go();
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
