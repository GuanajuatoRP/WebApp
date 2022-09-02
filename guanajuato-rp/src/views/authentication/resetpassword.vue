<template>
  <v-container fluid>
    <v-col cols="12" md="10" v-if="!IsDiscordAutentified">
      <v-card>
        <v-card-title
          >Réinitialisation de mot de passe<v-progress-circular indeterminate color="primary"></v-progress-circular
        ></v-card-title>
        <v-card-text
          >Ton formulaire de réinitialisation de mot de passe en cours de création, il sera disponible dans quelques
          instants !</v-card-text
        >
        <v-skeleton-loader type="article,actions"></v-skeleton-loader>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="IsDiscordAutentified && !IsOnServer && !haveError">
      <v-card>
        <v-card-title>Oupss... il semblerait que tu ne sois pas encore sur le serveur discord !</v-card-title>

        <v-btn class="ma-2" dark large href="https://discord.gg/aFaBD4wKfM" color="indigo"
          >Rejoindre le serveur Discord !</v-btn
        >
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="IsDiscordAutentified && IsOnServer && !IsRegistred && !haveError">
      <v-card>
        <v-card-title>Il semblerait que tu n'aies pas encore de compte sur le site</v-card-title>
        <v-card-text>Pour t'inscrire, tu dois passer sur discord</v-card-text>
        <v-btn class="ma-2" dark large href="https://discord.gg/aFaBD4wKfM" color="indigo">Serveur Discord !</v-btn>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="IsDiscordAutentified && IsOnServer && IsRegistred && !PasswordEdited && !haveError">
      <v-card>
        <v-card-title
          >Réinitialisation du mot de passe - {{ discordDisplayName }}#{{ discordDiscriminator }} -
          {{ username }}</v-card-title
        >
        <v-card-text>
          <v-form v-model="isValid">
            <v-text-field
              v-model="password"
              label="Mot de passe"
              :rules="passwordRules"
              error-count="5"
              outlined
              required
              prepend-inner-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? `mdi-eye` : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :disabled="!isValid" @click="UpdatePassword">Valider</v-btn>
          <v-btn color="red darken-4" @click="clearForm">Vider le formulaire</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="IsDiscordAutentified && IsOnServer && IsRegistred && PasswordEdited && !haveError">
      <v-card>
        <v-card-title>Ton mot de passe a bien été modifié.</v-card-title>
        <v-btn class="ma-2" dark large to="/" color="indigo">Retour à l'Accueil</v-btn>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="haveError">
      <v-card>
        <v-card-title
          >Oupss... Il semblerait qu'une erreur soit survenue lors de la réinitialisation de ton mot de
          passe..</v-card-title
        >
        <v-card-subtitle> Réessaye plus tard. Si le problème persiste, contacte le staff.</v-card-subtitle>

        <v-btn class="ma-2" dark large to="/" color="indigo">Retour à l'Accueil</v-btn>
      </v-card>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterApi } from '@/api/RegisterApi';
import { DiscordApi } from '@/api/DiscordApi';
import { DiscordGetTokenModel } from '@/models/Auth/DiscordGetTokenModel';
import { DiscordAuthTokenModel } from '@/models/Auth/DiscordAuthTokenModel';
import { ResetPasswordModel } from '@/models/Auth/ResetPasswordModel';
import { FrogotPasswordModel } from '@/models/Auth/FrogotPasswordModel';

@Component
export default class ResetPassword extends Vue {
  private IsDiscordAutentified = false;
  private IsOnServer = false;
  private IsRegistred = false;
  private PasswordEdited = false;
  private haveError = false;
  private isValid = false;

  private username = ``;
  private passwordRules = [
    (v: string) => !!v || 'Un mot de passe est requis',
    (v: string) => (v && v.length >= 8) || 'Le mot de passe doit faire au moins 8 caractères',
    (v: string) => /(?=.*[A-Z])/.test(v) || 'Doit avoir au moins une majuscule',
    (v: string) => /(?=.*\d)/.test(v) || 'Doit avoir au moins un chiffre',
    (v: string) => /([!@€#$%-])/.test(v) || 'Doit avoir au moins un caractère spécial !@€#_$%-',
  ];
  private password = '';
  private showPassword = false;
  private discordId = '';
  private discordDisplayName = '';
  private discordDiscriminator = '';

  private code = '';
  private discordGetTokenDTO: DiscordGetTokenModel = new DiscordGetTokenModel();
  private discordAuthTokenDTO: DiscordAuthTokenModel = new DiscordAuthTokenModel();
  private frogotPasswordModel: FrogotPasswordModel = new FrogotPasswordModel();
  private resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();

  public clearForm() {
    this.password = '';
  }
  public async UpdatePassword() {
    if (this.isValid) {
      this.resetPasswordModel.Password = this.password;
      this.resetPasswordModel.ConfirmPassword = this.password;

      await RegisterApi.resetPassword(this.resetPasswordModel)
        .then((response: any) => {
          this.PasswordEdited = true;
          console.log(response);
        })
        .catch((error: Error) => {
          this.haveError = true;
          console.log(error);
        });
    }
  }

  async mounted() {
    this.code = this.$route.query.code as string;
    if (!this.code) this.$router.push({ name: 'Home' });
    else {
      /* eslint-disable */
      this.discordGetTokenDTO.client_id = process.env.VUE_APP_CLIENT_ID;
      this.discordGetTokenDTO.client_secret = process.env.VUE_APP_CLIENT_SECRET;
      this.discordGetTokenDTO.grant_type = process.env.VUE_APP_GRANT_TYPE;
      this.discordGetTokenDTO.redirect_uri = process.env.VUE_APP_REDIRECT_URI_FROGETPASSWD;
      /* eslint-disable */
      this.discordGetTokenDTO.code = this.code as string;
      await DiscordApi.getToken(this.discordGetTokenDTO).then((response: any) => {
        this.discordAuthTokenDTO.token = response.access_token;
      }).catch((error: Error) => {
          this.haveError = true;
          console.log("error : ", error);
        })
      
      await DiscordApi.getIdentity(this.discordAuthTokenDTO).then((response: any) => {
        this.discordId = response.id;
        this.discordDisplayName = response.username;
        this.discordDiscriminator = response.discriminator;
        this.frogotPasswordModel.DiscordId = this.discordId;
        this.resetPasswordModel.DiscordId = this.discordId;
      })
      .catch((error: Error) => {
          this.haveError = true;
          console.log(error);
        })
      
      await DiscordApi.getGuilds(this.discordAuthTokenDTO).then((response: any) => {
        if (response.some((guild: any) => guild.id == process.env.VUE_APP_GUILD_ID)) this.IsOnServer = true;
      })
      .catch((error: Error) => {
          this.haveError = true;
          console.log(error);
        })
      
      await RegisterApi.isUserOnDB(this.discordId)
        .then((response: any) => {
          if (response.status == 200) {
            this.IsRegistred = true
            this.username = response.data;
          };
        })
        .catch((error: Error) => {
          this.haveError = true;
          console.log(error);
        })
        
        await RegisterApi.frogotPassword(this.frogotPasswordModel)
        .then((response: any) => {
          this.resetPasswordModel.Token = response;
        })
        .catch((error: Error) => {
          this.haveError = true;
          console.log(error);
        })
        .finally(() => {
          this.IsDiscordAutentified = true;          
        })
    }
  }
}
</script>
<style></style>
