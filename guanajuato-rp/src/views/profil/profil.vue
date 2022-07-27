<template>
  <v-container fluid>
    <v-card>
      <!-- CarList of user-->
      <v-tabs v-model="tabs" background-color="transparent" grow>
        <v-tabs-slider></v-tabs-slider>

        <!--User Profil-->
        <v-tab>
          <v-icon>mdi-account-box</v-icon>
        </v-tab>

        <v-tab-item>
          <v-card class="py-6 mx-auto">
            <v-row class="text-center">
              <v-col cols="6">
                <v-card-text class="my-auto">
                  <v-avatar size="62" class="mx-auto" color="red">
                    <span class="white--text text-h5">{{ user.prenom.charAt(0) }} {{ user.nom.charAt(0) }}</span>
                  </v-avatar>
                  <h3 class="text-h5 mb-2">{{ user.prenom }} {{ user.nom }}</h3>
                  <div class="blue--text subheading font-weight-bold">{{ user.username }}</div>
                  <div class="blue--text">{{ user.createdAt }}</div>
                  <div class="blue--text mb-2">{{ user.sexe }}</div>
                </v-card-text>
              </v-col>
              <v-divider vertical></v-divider>
              <v-row>
                <v-col cols="12">
                  <h3>Argent:</h3>
                  <p>{{ user.argent }}€</p>
                </v-col>
                <v-col cols="6">
                  <h3>Permis:</h3>
                  <p>{{ user.permis }}</p>
                  <h3>Stage:</h3>
                  <p>{{ user.stage.name }}</p>
                  <h3>Sessions Police:</h3>
                  <p>{{ user.nbSessionsPolice }}</p>
                </v-col>
                <v-col cols="6">
                  <h3>Points:</h3>
                  <p>{{ user.points }}</p>
                  <h3>Sessions Permis:</h3>
                  <p>{{ user.nbSessionsPermis }}</p>
                  <h3>Sessions</h3>
                  <p>{{ user.nbSessions }}</p>
                </v-col>
              </v-row>
            </v-row>
          </v-card>
        </v-tab-item>

        <v-tab>
          <v-icon>mdi-car</v-icon>
        </v-tab>

        <v-tab-item>
          <v-container id="user-profile" fluid tag="section">
            <v-row justify="center">
              <v-col>
                <v-card>
                  <v-card-title>
                    Liste des voitures du garage
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Recherche"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    :headers="headers"
                    :items="voitures"
                    :search="search"
                    :items-per-page="15"
                    show-expand
                    single-expand
                    item-key="model"
                  >
                    <template v-slot:expanded-item="{ headers }">
                      <td :colspan="headers.length" class="pa-5">
                        <v-row>
                          <v-img
                            cols="12"
                            md="4"
                            :max-width="300"
                            src="https://cdn.discordapp.com/attachments/729809533756506213/991069237881749585/HOR_XB1_Ferrari_488-removebg-preview.png?size=4096"
                          ></v-img>
                        </v-row>
                      </td>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthModule } from '@/store/modules/Authentication';
import { UserAPI } from '@/api/UserAPI';
import { UserProfil } from '@/store/modules/UserProfil';

@Component
export default class Profile extends Vue {
  private user: UserProfil = {};
  async mounted() {
    AuthModule.loadUser();

    UserAPI.getUserProfile(AuthModule.user.DiscordId)
      .then((user: UserProfil) => {
        this.user = user;
        this.voitures = user.voitures;
        console.log(this.voitures);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  private search = '';
  private headers = [
    {
      text: 'Model',
      align: 'start',
      value: 'model',
    },
    { text: 'Marque', value: 'maker' },
    { text: 'Class', value: 'pi' },
    { text: 'Prix', value: 'originalPrice' },
  ];
  private voitures = [];
  private voiture = { class: 'A' };
}
</script>
<style></style>
