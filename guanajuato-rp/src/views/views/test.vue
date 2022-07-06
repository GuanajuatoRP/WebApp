<template>
  <h1>UwU</h1>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthModule } from '@/store/modules/Authentication';
import { UserAPI } from '@/api/UserAPI';
import { UserProfil } from '@/store/modules/UserProfil';

@Component
export default class Test extends Vue {
  private isConnected = false;

  async mounted() {
    this.isConnected = await AuthModule.isLoggedIn();
  }
}
</script>
<style></style>
