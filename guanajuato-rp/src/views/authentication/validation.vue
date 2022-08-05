<template>
  <v-container fluid>
    <v-col cols="12" md="10" v-if="!dbCheck && !acountActivated">
      <v-card>
        <v-card-title>Ton compte est en cours d'activation</v-card-title>
        <v-progress-linear indeterminate color="indigo"></v-progress-linear>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="dbCheck && acountActivated">
      <v-card>
        <v-card-title>Ton compte a bien été activé <v-icon large color="green">mdi-account-check</v-icon></v-card-title>
        <v-btn class="ma-2" dark large to="/" color="indigo">Retour a l'Accueil</v-btn>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="dbCheck && !acountActivated">
      <v-card>
        <v-card-title
          >Une erreur c'est produite, ton compte ne peut pas être activé
          <v-icon large color="red">mdi-close-circle</v-icon></v-card-title
        >
        <v-card-text
          ><v-icon large color="indigo">mdi-information-variant</v-icon>Contacte un membre du staff sur
          discord</v-card-text
        >
        <v-btn class="ma-2" dark large to="/" color="indigo">Retour a l'Accueil</v-btn>
      </v-card>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterApi } from '@/api/RegisterApi';
import { ValidationModel } from '@/models/Auth/ValidationModel.ts';

@Component
export default class Validation extends Vue {
  private dbCheck = false;
  private acountActivated = false;

  private discordId = '';
  private token = '';
  public updateUsername() {
    this.isUsernameEmpty = this.prenom == '' || this.nom == '' ? true : false;
    this.username = `${this.prenom} ${this.nom}`;
  }

  async mounted() {
    this.discordId = this.$route.query.discordId;
    this.token = this.$route.query.token;
    if (!this.discordId || !this.token) this.$router.push({ name: 'Home' });

    let validateUser = new ValidationModel();
    validateUser.discordId = this.discordId;
    validateUser.token = this.token;

    await RegisterApi.registrationValidation(validateUser)
      .then((response) => {
        if (response.status == 200) {
          this.dbCheck = true;
          this.acountActivated = true;
        }
      })
      .catch((error) => {
        this.dbCheck = true;
        this.acountActivated = false;
        console.log(error.message);
      });
  }
}
</script>
<style></style>
