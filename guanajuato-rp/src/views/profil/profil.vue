<template>
  <v-container fluid>
    <v-card>
      <v-tabs background-color="transparent" grow>
        <!--User Profil-->
        <v-tab>
          <v-icon class="mr-2">mdi-account-box</v-icon>
          Mon profil
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

        <!-- CarList of user-->

        <v-tabs-slider></v-tabs-slider>
        <v-tab>
          <v-icon class="mr-2">mdi-car</v-icon>
          Mes voitures
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
                    <template v-slot:expanded-item="{ headers, item }">
                      <td :colspan="headers.length" class="pa-5">
                        <v-row>
                          <v-divider vertical></v-divider>
                          <v-col cols="12" md="12">
                            <v-row>
                              <v-card>
                                <v-card-title class="justify-content">
                                  <span class="text-h5">Model de base</span>
                                </v-card-title>

                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12" md="4">
                                        <v-col cols="12" md="4">
                                          <v-img :src="item.pictureLink"></v-img>
                                        </v-col>
                                      </v-col>
                                      <v-col cols="12" md="8"> </v-col>
                                      <!-- <v-col cols="12">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Réference du model"
                                          v-model="item.idCar"
                                        ></v-text-field>
                                      </v-col> -->
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Puissance (cv)"
                                          v-model="item.originalPowerHp"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Poids (kg)"
                                          v-model="item.originalWeightKg"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Transmission"
                                          v-model="item.originalDriveTrain"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Classe"
                                          v-model="item.originalClass"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Indice"
                                          v-model="item.originalPi"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Road legal"
                                          v-model="item.originalOnRoad"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Vitesse"
                                          v-model="item.originalSpeed"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Tenue de route"
                                          v-model="item.originalHandling"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Accélération"
                                          v-model="item.originalAccelerate"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Départ arrêté"
                                          v-model="item.originalLaunch"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Freinage"
                                          v-model="item.originalBraking"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Tout-terrain"
                                          v-model="item.originalOffroad"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Type"
                                          v-model="item.type"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Rareté"
                                          v-model="item.rarity"
                                        ></v-text-field>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>
                              </v-card>
                            </v-row>
                            <v-divider horizontal></v-divider>
                            <v-row>
                              <v-card>
                                <v-card-title>
                                  <span class="text-h5">Model personnel</span>
                                </v-card-title>

                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <!-- <v-col cols="12">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Réference de la voiture"
                                          v-model="item.keyCar"
                                        ></v-text-field>
                                      </v-col> -->
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Puissance (cv)"
                                          v-model="item.editPowerHp"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Poids (kg)"
                                          v-model="item.editWeightKg"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Transmission"
                                          v-model="item.editDriveTrain"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Classe"
                                          v-model="item.editClass"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Indice"
                                          v-model="item.editPi"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Road legal"
                                          v-model="item.editOnRoad"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Vitesse"
                                          v-model="item.editSpeed"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Tenue de route"
                                          v-model="item.editHandling"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Accélération"
                                          v-model="item.editAccelerate"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Départ arrêté"
                                          v-model="item.editLaunch"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Freinage"
                                          v-model="item.editBraking"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Tout-terrain"
                                          v-model="item.editOffroad"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Immatriculation"
                                          v-model="item.imatriculation"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Prix total"
                                          v-model="item.totalPrice"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="2">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Prix des modifications"
                                          v-model="item.editPrice"
                                        ></v-text-field>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>
                              </v-card>
                            </v-row>
                          </v-col>
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
import { UserProfil } from '@/models/User/userProfil';
import { CarDTO } from '@/models/Cars/CarDTO';

@Component
export default class Profile extends Vue {
  private user: UserProfil = new UserProfil();
  private search = '';
  private item = '';
  private headers = [
    {
      text: 'Marque',
      align: 'start',
      value: 'maker',
    },
    { text: 'Modèle', value: 'model' },
    { text: 'Année', value: 'year' },
    { text: "Prix d'origine", value: 'price' },
    { text: 'Classe', value: 'editClass' },
    { text: 'PI', value: 'editPi' },
    { text: 'Immatriculation', value: 'imatriculation' },
  ];
  private voitures: CarDTO[] = [];
  async mounted() {
    AuthModule.loadUser();
    //eslint-disable-next-line
    UserAPI.getUserProfile(AuthModule.user!.DiscordId)
      .then((user: UserProfil) => {
        this.user = user as UserProfil;
        this.voitures = user.voitures as CarDTO[];
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>
<style></style>
