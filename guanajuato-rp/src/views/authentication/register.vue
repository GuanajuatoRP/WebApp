<template>
  <v-container fluid>
    <v-col cols="12" md="10" v-if="!IsDiscordAutentified">
      <v-card>
        <v-card-title
          >Formulaire d'inscription<v-progress-circular indeterminate color="primary"></v-progress-circular
        ></v-card-title>
        <v-card-text>Ton formulaire est en cours de création, il sera disponible dans quelques instants !</v-card-text>
        <v-skeleton-loader type="article,actions"></v-skeleton-loader>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="IsDiscordAutentified && !IsOnServer">
      <v-card>
        <v-card-title>Oupss... il semblerait que tu ne sois pas encore sur le serveur discord !</v-card-title>

        <v-btn class="ma-2" dark large href="https://discord.gg/aFaBD4wKfM" color="indigo"
          >Rejoindre le serveur discord !</v-btn
        >
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="IsDiscordAutentified && IsOnServer && IsAlradyRegistred">
      <v-card>
        <v-card-title>Doucement!! Un compte ça suffit pas besoin de deux</v-card-title>
        <v-btn class="ma-2" dark large to="/" color="indigo">Retour à l'Accueil</v-btn>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="IsDiscordAutentified && IsOnServer && !IsAlradyRegistred && !registrationEffectued">
      <v-card>
        <v-card-title>Formulaire d'inscription - {{ discordDisplayName }}#{{ discordDiscriminator }}</v-card-title>
        <v-card-text>
          <v-form v-model="isValid">
            <v-text-field
              label="Prénom"
              v-model="prenom"
              :rules="[(v) => !!v || 'Le Prénom est requis']"
              @input="updateUsername"
              autofocus
              outlined
              required
            ></v-text-field>
            <v-text-field
              label="Nom"
              v-model="nom"
              :rules="[(v) => !!v || 'Le Nom est requis']"
              @input="updateUsername"
              outlined
              required
            ></v-text-field>
            <v-text-field
              label="UserName"
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
              :rules="[(v) => !!v || 'Le Sexe est requis']"
            ></v-select>
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              :rules="[
                (v) => !!v || 'Password is required',
                (v) => (v && v.length >= 10) || 'Password must have 10+ characters',
                (v) => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
                (v) => /(?=.*\d)/.test(v) || 'Must have one number',
                (v) => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]',
              ]"
              error-count="5"
              outlined
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :disabled="!isValid" @click="RegisterUser">Register</v-btn>
          <v-btn color="red darken-4" @click="clearForm">Vider le formulaire</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="IsDiscordAutentified && IsOnServer && !IsAlradyRegistred && registrationEffectued">
      <v-card>
        <v-card-title>Ton compte a été créé !</v-card-title>
        <v-btn class="ma-2" dark large to="/" color="indigo">Retour à l'Accueil</v-btn>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="IsDiscordAutentified && haveError">
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
  private password = '';

  private discordId = '';
  private discordDisplayName = '';
  private discordDiscriminator = '';

  private dialog = false;
  private code = '';
  private discordGetTokenDTO: DiscordGetTokenModel = new DiscordGetTokenModel();
  private discordAuthTokenDTO: DiscordAuthTokenModel = new DiscordAuthTokenModel();

  public clearForm() {
    this.dialog = true;
    this.isUsernameEmpty = true;
    this.prenom = '';
    this.nom = '';
    this.username = `${this.prenom} ${this.nom}`;
    this.sexe = '';
    this.password = '';
  }

  public updateUsername() {
    this.isUsernameEmpty = this.prenom == '' || this.nom == '' ? true : false;
    this.username = `${this.prenom} ${this.nom}`;
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
      });
      
      await DiscordApi.getIdentity(this.discordAuthTokenDTO).then((response: any) => {
        this.discordId = response.id;
        this.discordDisplayName = response.username;
        this.discordDiscriminator = response.discriminator;
      });
      
      await DiscordApi.getGuilds(this.discordAuthTokenDTO).then((response: any) => {
        if (response.some((guild: any) => guild.id == process.env.VUE_APP_GUILD_ID)) this.IsOnServer = true;
      });
      
      await RegisterApi.isUserOnDB(this.discordId)
        .then((response: any) => {
          if (response.status != 200) this.IsAlradyRegistred = false;
        })
        .catch((error: Error) => {
          console.log(error);
        })
        .finally(() => (this.IsDiscordAutentified = true));
    }
  }
}
</script>
<style></style>
