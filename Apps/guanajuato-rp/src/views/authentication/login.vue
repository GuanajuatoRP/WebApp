<template>
  <div style="max-width: 400px">
    <v-card-title style="word-break: keep-all">
      <h2 class="primary--text ml-auto mr-auto font-weight-normal">Connexion</h2>
      <h4 class="ml-auto mr-auto mt-2 font-weight-normal">Veuillez entrer vos identifiants</h4>
    </v-card-title>
    <v-card-text v-if="authErrors" class="pb-0">
      <v-alert class="mb-0" outlined dense type="warning">{{ authErrors }}</v-alert>
    </v-card-text>
    <v-card-text class="mt-5">
      <v-form v-model="isValid">
        <v-text-field
          label="Utilisateur"
          prepend-inner-icon="mdi-account"
          name="login"
          v-model="username"
          class="roundCorners"
          autofocus
          outlined
          :rules="stringRules"
        ></v-text-field>
        <v-text-field
          label="Mot de passe"
          name="password"
          outlined
          class="roundCorners"
          prepend-inner-icon="mdi-lock"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          :rules="stringRules"
          @keypress.enter="login"
          :append-icon="showPassword ? `mdi-eye` : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-form>

      <v-btn class="roundCorners" color="primary" block :loading="authLoading" :disabled="!isValid" @click="login"
        >Connexion</v-btn
      >
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthParams } from '@/models/Authentication/AuthParams';
import { AuthModule } from '@/store/modules/Authentication';
import { NavigationModule } from '@/store/modules/NavigationMod';

@Component
export default class Login extends Vue {
  private username = '';
  private password = '';
  private stringRules: any = [(v: string) => !!v || 'Valeur obligatoire'];
  private isValid = true;
  private showPassword = false;
  private authLoading = false;
  private authErrors = '';

  private login() {
    this.authLoading = true;
    this.authErrors = '';
    const { username, password } = this;
    const authParams = new AuthParams();
    authParams.userName = username;
    authParams.password = password;

    AuthModule.login(authParams)
      .then(() => {
        this.username = '';
        this.password = '';
        this.$router.push(NavigationModule.homeRoute);
      })
      .catch((reason) => {
        this.authErrors = reason;
      })
      .finally(() => {
        this.authLoading = false;
      });
  }
}
</script>
