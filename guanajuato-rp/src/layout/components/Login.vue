<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Se connecter </v-btn>
    </template>
    <v-card>
      <v-card-title style="word-break: keep-all">
        <h2 class="primary--text ml-auto mr-auto font-weight-normal">Connexion</h2>
        <h4 class="ml-auto mr-auto mt-2 font-weight-normal">Veuillez entrer vos identifiants</h4>
      </v-card-title>
      <v-card-text v-if="authErrors" class="pb-0">
        <v-alert class="mb-0" outlined dense type="warning">{{ authErrors }}</v-alert>
      </v-card-text>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="isValid">
            <v-text-field
              v-model="username"
              label="Username"
              placeholder="PénomRP_NomRP"
              prepend-inner-icon="mdi-account"
              name="login"
              class="roundCorners"
              autofocus
              outlined
              :rules="stringRules"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Mot de passe"
              name="password"
              outlined
              class="roundCorners"
              prepend-inner-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'"
              :rules="stringRules"
              :append-icon="showPassword ? `mdi-eye` : 'mdi-eye-off'"
              @keypress.enter="login()"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-form>
          <v-btn
            class="roundCorners mb-3"
            color="success"
            block
            :loading="authLoading"
            :disabled="!isValid"
            @click="login()"
            >Connexion</v-btn
          >
          <v-btn class="roundCorners mb-3" color="error" block @click="cancel">Annuler</v-btn>
          <v-btn
            class="roundCorners mb-3"
            :href="linkFrogetPasswordToDiscord"
            color="primary"
            outlined
            block
            @click="cancel"
            >Mot de passe oublier</v-btn
          >
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthParams } from '@/models/Authentication/AuthParams';
import { AuthModule } from '@/store/modules/Authentication';

@Component
export default class Login extends Vue {
  private dialog = false;

  private linkFrogetPasswordToDiscord = process.env.VUE_APP_URI_FROGETPASSWD_DISCORD;
  private username = '';
  private password = '';
  private stringRules: any = [(v: string) => !!v || 'Valeur obligatoire'];
  private isValid = true;
  private showPassword = false;
  private authLoading = false;
  private authErrors = '';

  public cancel() {
    //eslint-disable-next-line
    (this.$refs.form! as any).reset();
    this.authErrors = '';
    this.dialog = false;
  }
  private login() {
    this.authLoading = true;
    this.authErrors = '';
    const { username, password } = this;
    const authParams = new AuthParams();
    authParams.username = username;
    authParams.password = password;

    AuthModule.login(authParams)
      .then(async () => {
        this.username = '';
        this.password = '';
        //eslint-disable-next-line
        (this.$refs.form! as any).reset();
        this.dialog = false;

        this.$router.go(0);
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
<style></style>
