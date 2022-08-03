<template>
  <v-container fluid>
    <v-col cols="12" md="10" v-if="true">
      <v-card>
        <v-card-title>Ton compte est en cours d'activation</v-card-title>
        <v-progress-linear indeterminate color="indigo"></v-progress-linear>
      </v-card>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Validation extends Vue {
  private discordId = '';
  private token = '';
  public updateUsername() {
    this.isUsernameEmpty = this.prenom == '' || this.nom == '' ? true : false;
    this.username = `${this.prenom} ${this.nom}`;
  }

  async mounted() {
    this.discordId = this.$route.query.discordId;
    this.token = this.$route.query.token;
    console.log(this.discordId);
    console.log(this.token);
    if (!this.discordId || !this.token) this.$router.push({ name: 'Home' });
  }
}
</script>
<style></style>
