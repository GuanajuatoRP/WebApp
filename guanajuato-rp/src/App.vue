<template>
  <v-app>
    <router-view />
    <v-alert
      v-if="updateAvailable"
      style="position: fixed; left: 0; bottom: 0; width: 100%; margin-bottom: 0px"
      app
      class="text-center"
      color="#d3f5d7"
      dense
    >
      <span class="mt-2"> Une nouvelle version de l'application est disponible ! </span>
      <v-btn class="ml-5" color="success" small @click.stop="updateApp">
        <v-icon left>mdi-sync-circle</v-icon> Mettre à jour
      </v-btn>
    </v-alert>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class App extends Vue {
  private refreshing = false;
  private updateAvailable = false;
  private registration: ServiceWorkerRegistration | null = null;

  created() {
    document.addEventListener('swUpdated', this.showRefreshButton, {
      once: true,
    });
    if (navigator && navigator.serviceWorker)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) return;
        this.refreshing = true;
        window.location.reload();
      });
  }

  private showRefreshButton(e: Event) {
    this.registration = (e as CustomEvent).detail;
    this.updateAvailable = true;
  }
  private updateApp() {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      this.registration.update();
      location.reload();
    }
  }
}
</script>

<style lang="scss">
@import '@/scss/styles.scss';
</style>
