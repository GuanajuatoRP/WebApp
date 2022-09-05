<template>
  <v-container fluid>
    <v-col cols="12" md="10" v-if="!IsDiscordAutentified && !haveError">
      <v-card>
        <v-card-title
          >Formulaire d'inscription<v-progress-circular indeterminate color="primary"></v-progress-circular
        ></v-card-title>
        <v-card-text>Ton formulaire est en cours de création, il sera disponible dans quelques instants !</v-card-text>
        <v-skeleton-loader type="article,actions"></v-skeleton-loader>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="IsDiscordAutentified && !IsOnServer && !haveError">
      <v-card>
        <v-card-title>Oupss... il semblerait que tu ne sois pas encore sur le serveur discord !</v-card-title>

        <v-btn class="ma-2" dark large href="https://discord.gg/rGPzz6BjuA" color="indigo"
          >Rejoindre le serveur discord !</v-btn
        >
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="IsDiscordAutentified && IsOnServer && IsAlradyRegistred && !haveError">
      <v-card>
        <v-card-title>Doucement!! Un compte ça suffit pas besoin de deux</v-card-title>
        <v-btn class="ma-2" dark large to="/" color="indigo">Retour à l'Accueil</v-btn>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="true">
      <v-card>
        <v-card-title>Formulaire d'inscription - {{ discordDisplayName }}#{{ discordDiscriminator }}</v-card-title>
        <v-card-text>
          <v-form v-model="isValid">
            <v-text-field
              label="Prénom RôlePlay"
              placeholder="Attention ! Ce prénom est définitif"
              v-model="prenom"
              :rules="[(v) => !!v || 'Un prénom RP est requis']"
              @input="updateUsername"
              autofocus
              outlined
              required
            ></v-text-field>
            <v-text-field
              label="Nom RôlePlay"
              placeholder="Attention ! Ce nom est définitif"
              v-model="nom"
              :rules="[(v) => !!v || 'Un nom RP est requis']"
              @input="updateUsername"
              outlined
              required
            ></v-text-field>
            <v-text-field
              label="UserName RôlePlay"
              v-model="username"
              outlined
              :loading="isUsernameEmpty"
              disabled
            ></v-text-field>
            <v-select
              :items="sexeChoices"
              label="Sexe"
              v-model="sexe"
              outlined
              required
              :rules="[(v) => !!v || 'Le sexe est requis']"
            ></v-select>
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
              @keypress.enter="RegisterUser"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :disabled="!isValid" @click="RegisterUser">Register</v-btn>
          <v-btn color="red darken-4" @click="clearForm">Vider le formulaire</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      md="10"
      v-if="IsDiscordAutentified && IsOnServer && !IsAlradyRegistred && registrationEffectued && !haveError"
    >
      <v-card>
        <v-card-title>Ton compte a été créé, tu peut a présent aller partous sur le site</v-card-title>
        <v-card-title
          >Attention ce pendant il faut aussi que tu active ton compte sur discord, tu as un bouton pour cela dans le
          règlement !</v-card-title
        >
        <v-btn class="ma-2" dark large to="/" color="indigo">Retour à l'Accueil</v-btn>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="haveError">
      <v-card>
        <v-card-title
          >Oupss... il semblerait qu'une erreur soit survenue lors de la création de ton compte.</v-card-title
        >
        <v-card-subtitle> Réessaye plus tard. Si le problème persiste contacte le staff.</v-card-subtitle>

        <v-btn class="ma-2" dark large to="/" color="indigo">Retour à l'Accueil</v-btn>
      </v-card>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterApi } from '@/api/RegisterApi';
import { DiscordApi } from '@/api/DiscordApi';
import { RegisterModel } from '@/models/Auth/RegisterModel';
import { DiscordGetTokenModel } from '@/models/Auth/DiscordGetTokenModel';
import { DiscordAuthTokenModel } from '@/models/Auth/DiscordAuthTokenModel';

@Component
export default class Register extends Vue {
  private IsDiscordAutentified = false;
  private IsOnServer = false;
  private IsAlradyRegistred = true;
  private registrationEffectued = false;
  private haveError = false;

  private isUsernameEmpty = true;
  private isValid = false;

  private prenom = '';
  private nom = '';
  private username = `${this.prenom}_${this.nom}`;
  private sexe = '';
  private sexeChoices = ['Homme', 'Femme', 'Autre'];
  private passwordRules = [
    (v: string) => !!v || 'Un mot de passe est requies',
    (v: string) => (v && v.length >= 8) || 'Le mot de passe doit faire au moins 8 caractères',
    (v: string) => /(?=.*[A-Z])/.test(v) || 'Doit avoir au moins une majuscule',
    (v: string) => /(?=.*[a-z])/.test(v) || 'Doit avoir au moins une minuscule',
    (v: string) => /(?=.*\d)/.test(v) || 'Doit avoir au moins un chiffre',
    (v: string) => /([!@€#$%-])/.test(v) || 'Doit avoir au moins un caractère spécial !@€#_$%-',
  ];
  private password = '';
  private showPassword = false;
  private discordId = '';
  private discordDisplayName = '';
  private discordDiscriminator = '';

  private dialog = false;
  private code = '';
  private discordGetTokenDTO: DiscordGetTokenModel = new DiscordGetTokenModel();
  private discordAuthTokenDTO: DiscordAuthTokenModel = new DiscordAuthTokenModel();

  public updateUsername() {
    this.isUsernameEmpty = this.prenom == '' || this.nom == '' ? true : false;
    this.username = `${this.prenom.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}_${this.nom
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replaceAll(/'/g, '')
      .replaceAll(/"/g, '')}`;
  }

  public clearForm() {
    this.dialog = true;
    this.isUsernameEmpty = true;
    this.prenom = '';
    this.nom = '';
    this.username = `${this.prenom} ${this.nom}`;
    this.sexe = '';
    this.password = '';
  }

  public RegisterUser() {
    this.isValid = true;
    if (this.isValid) {
      let registerModel = new RegisterModel();
      registerModel.DiscordId = this.discordId as string;
      registerModel.Prenom = this.prenom as string;
      registerModel.Nom = this.nom as string;
      registerModel.Sexe = this.sexe as string;
      registerModel.Password = this.password as string;

      RegisterApi.registerUser(registerModel)
        .then((response) => {
          if (response.status == 200) this.registrationEffectued = true;
        })
        .catch((error) => {
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
      this.discordGetTokenDTO.redirect_uri = process.env.VUE_APP_REDIRECT_URI;
      /* eslint-disable */
      this.discordGetTokenDTO.code = this.code as string;
      await DiscordApi.getToken(this.discordGetTokenDTO).then((response: any) => {
        this.discordAuthTokenDTO.token = response.access_token;
      }).catch((error: Error) => {
          this.haveError = true;
          console.log(error);
        })
        .finally(() => (this.IsDiscordAutentified = true));;
      
      await DiscordApi.getIdentity(this.discordAuthTokenDTO).then((response: any) => {
        this.discordId = response.id;
        this.discordDisplayName = response.username;
        this.discordDiscriminator = response.discriminator;
      })
      .catch((error: Error) => {
          this.haveError = true;
          console.log(error);
        })
        .finally(() => (this.IsDiscordAutentified = true));;
      
      await DiscordApi.getGuilds(this.discordAuthTokenDTO).then((response: any) => {
        if (response.some((guild: any) => guild.id == process.env.VUE_APP_GUILD_ID)) this.IsOnServer = true;
      })
      .catch((error: Error) => {
          this.haveError = true;
          console.log(error);
        })
        .finally(() => (this.IsDiscordAutentified = true));;
      
      await RegisterApi.isUserOnDB(this.discordId)
        .then((response: any) => {
          console.log("this.IsAlradyRegistred : ", this.IsAlradyRegistred);
          if (response.status != 200) this.IsAlradyRegistred = false;
          console.log("response.status != 200 : ", response.status != 200);
          console.log("this.IsAlradyRegistred : ", this.IsAlradyRegistred);
        })
        .catch((error: Error) => {
          this.haveError = true;
          console.log(error);
        })
        .finally(() => (this.IsDiscordAutentified = true));
    }
  }
}
</script>
<style></style>
