<template>
  <v-container fluid>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Login</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="userName" :rules="userNameRules" label="UserName" required></v-text-field>
                <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid" color="success" class="mt-2 mx-1" @click="validate"> Se Connecter </v-btn>
            <v-btn color="error" class="mt-2 mx-1" @click="reset"> Annuler </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Test extends Vue {
  private dialog = false;
  private valide = true;
  private userName = '';
  private userNameRules = [(v: any) => !!v || 'Un username est requis'];
  private password = '';
  private passwordRules = [(v: any) => !!v || 'Un mot de passe est requis'];

  public validate() {
    this?.$refs.form.validate();
  }
  public reset() {
    this?.$refs.form.reset();
    this.dialog = false;
  }
}
</script>
<style></style>
