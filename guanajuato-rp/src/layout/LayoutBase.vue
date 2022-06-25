<template>
  <v-app>
    <Menu :Drawer.sync="drawer"></Menu>
    <NavBar :NavBar.sync="navbar" :Drawer.sync="drawer"></NavBar>

    <!--<v-app-bar app color="primary" dark elevation="0">
      <v-btn icon rounded @click.stop="drawer = !drawer" class="ml-0 mr-2" small>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title class="d-flex justify-center"> {{ currentRouteName }} </v-toolbar-title>
      <v-spacer></v-spacer>
      <span>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{ userID }}</v-list-item-title>
            <v-list-item-subtitle>{{ userName }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </span>
      <v-btn icon class="ml-3 btn_appBar" @click.stop="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>-->
    <v-main class="backgroundImg" style="height: 100%">
      <app-main class="ml-auto mr-auto" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import { AuthModule } from '@/store/modules/Authentication';
import { routes } from '@/router';
import { NavigationModule } from '@/store/modules/NavigationMod';
import Menu from './components/Menu.vue';
import NavBar from './components/NavBar.vue';
import AppMain from './components/AppMain.vue';

@Component({ components: { Menu, NavBar, AppMain } })
export default class LayoutBase extends Vue {
  private routesDisplay: (RouteConfig | undefined)[] = [];
  private drawer = true;
  private navbar = true;

  mounted() {
    this.routesDisplay = routes.flatMap((e) => e.children).filter((r) => r && r.meta && !r.meta.hidden);
  }

  private logout() {
    AuthModule.logout();
    this.$router.push({ name: NavigationModule.home, params: { noAutoLogon: 'true' } });
  }

  get userID() {
    return AuthModule.user ? `${AuthModule.user.DiscordId}` : '';
  }

  get userName() {
    return AuthModule.user ? `${AuthModule.user.Name}` : '';
  }

  get currentRouteName() {
    return this.$route?.meta?.title;
  }
}
</script>
