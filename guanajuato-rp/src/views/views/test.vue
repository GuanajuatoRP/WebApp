<template>
  <container
    ><h1 v-if="isConnected">Uwu</h1>
    <p v-if="!isConnected">Not Uwu</p></container
  >
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthModule } from '@/store/modules/Authentication';

@Component
export default class Test extends Vue {
  private isConnected = false;

  async mounted() {
    this.isConnected = await AuthModule.isLoggedIn();
  }
}
</script>
<style></style>
