<template>
  <v-container fluid>
    <v-col cols="12" md="10" v-if="!checkServer">
      <v-card>
        <v-card-title
          >Formulaire d'inscription <v-progress-circular indeterminate color="primary"></v-progress-circular
        ></v-card-title>
        <v-card-text
          >Ton formulaire est en cours de création, il seras disponnible dans quelques instants !</v-card-text
        >
        <v-skeleton-loader type="article,actions"></v-skeleton-loader>
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="checkServer && IsAlradyRegistred">
      <v-card>
        <v-card-title>Doucement!! Un compte sa suffit pas besoin de deux</v-card-title>
        <v-btn class="ma-2" dark large to="/" color="indigo">Retour a l'Accueil</v-btn>
      </v-card>
    </v-col>

    <v-col cols="12" md="10" v-if="checkServer && IsOnServer && !IsAlradyRegistred && !registrationEffectued">
      <v-card>
        <v-card-title>Formulaire d'inscription - {{ discordDisplayName }}</v-card-title>
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
                (v) => (v && v.length >= 5) || 'Password must have 5+ characters',
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
    <v-col cols="12" md="10" v-if="checkServer && !IsOnServer && !IsAlradyRegistred">
      <v-card>
        <v-card-title>Oupss... il semblerais que tu ne sois pas encors sur le serveur discord !</v-card-title>

        <v-btn class="ma-2" dark large href="https://discord.gg/aFaBD4wKfM" color="indigo"
          >Rejoindre le serveur discord !</v-btn
        >
      </v-card>
    </v-col>
    <v-col cols="12" md="10" v-if="checkServer && IsOnServer && !IsAlradyRegistred && registrationEffectued">
      <v-card>
        <v-card-title>Ton compte a été crée !</v-card-title>
        <v-card-text>Tu va recevoir un message discord, pour activé ton compte !</v-card-text>
        <v-card-text>Cette étape est importante. Si ton compte n'est pas activé tu n'auras pas accès au RP</v-card-text>

        <v-btn class="ma-2" dark large to="/" color="indigo">Retour a l'Accueil</v-btn>
      </v-card>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterApi } from '@/api/RegisterApi';
import { RegisterModel } from '@/models/Auth/RegisterModel.ts';

@Component
export default class Register extends Vue {
  private IsAlradyRegistred = false;
  private checkServer = false;
  private IsOnServer = false;
  private isUsernameEmpty = true;
  private isValid = false;

  private prenom = '';
  private nom = '';
  private username = `${this.prenom} ${this.nom}`;
  private sexe = '';
  private sexeChoices = ['Homme', 'Femme', 'Autre'];
  private password = '';

  private discordId = '';
  private discordDisplayName = '';

  private registrationEffectued = false;

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
    console.log(this.discordId);

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
    this.discordId = this.$route.query.discordId as string;
    if (!this.discordId) this.$router.push({ name: 'Home' });

    await RegisterApi.isUserOnDB(this.discordId)
      .then((res: any) => {
        if (res.status == 200) this.IsAlradyRegistred = true;
        else this.IsAlradyRegistred = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
    await RegisterApi.isUserOnServer(this.discordId)
      .then((userOnServer: any) => {
        this.checkServer = true;
        this.IsOnServer = userOnServer.isOnServeur;
        this.discordDisplayName = userOnServer.username;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>
<style></style>
