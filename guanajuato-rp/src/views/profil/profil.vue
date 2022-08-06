<template>
  <v-container fluid>
    <v-card>
      <!-- CarList of user-->
      <v-tabs background-color="transparent" grow>
        <v-tabs-slider></v-tabs-slider>
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
                    <template v-slot:expanded-item="{ headers, item }">
                      <td :colspan="headers.length" class="pa-5">
                        <v-row>
                          <v-divider vertical></v-divider>
                          <v-col cols="12" md="12">
                            <v-row>
                              <v-card>
                                <v-card-title class="justify-content">
                                  <span class="text-h5">Model Originel</span>
                                </v-card-title>

                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12" md="4">
                                        <v-col cols="12" md="4">
                                          <v-img v-model="item.pictureLink"></v-img>
                                        </v-col>
                                      </v-col>
                                      <v-col cols="12" md="8"> </v-col>
                                      <v-col cols="12">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Reference du model"
                                          v-model="item.idCar"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Transmission"
                                          v-model="item.transmission"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="GearBox"
                                          v-model="item.gearBox"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="EngineConfiguration"
                                          v-model="item.engineConfiguration"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="PowerBhp"
                                          v-model="item.originalPowerBhp"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="powerKw"
                                          v-model="item.originalPowerKw"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="torqueLbft"
                                          v-model="item.originalTorqueLbft"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="torqueNm"
                                          v-model="item.originalTorqueNm"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="weightLbs"
                                          v-model="item.originalWeightLbs"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="weightKg"
                                          v-model="item.originalWeightKg"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="engineDisplacement"
                                          v-model="item.originalEngineDisplacement"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="nbCylindre"
                                          v-model="item.originalNbCylindre"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="aspiration"
                                          v-model="item.originalAspiration"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="enginePosition"
                                          v-model="item.originalEnginePosition"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="speed"
                                          v-model="item.originalSpeed"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="handling"
                                          v-model="item.originalHandling"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="accelerate"
                                          v-model="item.originalAccelerate"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="launch"
                                          v-model="item.originalLaunch"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="braking"
                                          v-model="item.originalBraking"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="offroad"
                                          v-model="item.originalOffroad"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="class"
                                          v-model="item.originalClass"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="pi"
                                          v-model="item.originalPi"
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
                                  <span class="text-h5">Model-Personnel</span>
                                </v-card-title>

                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12" md="4">
                                        <v-img v-model="item.pictureLink"></v-img>
                                      </v-col>
                                      <v-col cols="12" md="8"> </v-col>
                                      <v-col cols="12">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Reference de la voiture"
                                          v-model="item.keyCar"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="Transmission"
                                          v-model="item.transmission"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="GearBox"
                                          v-model="item.gearBox"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="EngineConfiguration"
                                          v-model="item.engineConfiguration"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="PowerBhp"
                                          v-model="item.powerBhp"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="powerKw"
                                          v-model="item.powerKw"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="torqueLbft"
                                          v-model="item.torqueLbft"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="torqueNm"
                                          v-model="item.torqueNm"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="weightLbs"
                                          v-model="item.weightLbs"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="weightKg"
                                          v-model="item.weightLbs"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="engineDisplacement"
                                          v-model="item.engineDisplacement"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="nbCylindre"
                                          v-model="item.nbCylindre"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="aspiration"
                                          v-model="item.aspiration"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="enginePosition"
                                          v-model="item.enginePosition"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="speed"
                                          v-model="item.speed"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="handling"
                                          v-model="item.handling"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="accelerate"
                                          v-model="item.accelerate"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="launch"
                                          v-model="item.launch"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="braking"
                                          v-model="item.braking"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="offroad"
                                          v-model="item.offroad"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="class"
                                          v-model="item.class"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="pi"
                                          v-model="item.pi"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="totalPrice"
                                          v-model="item.totalPrice"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="1">
                                        <v-text-field
                                          outlined
                                          dense
                                          disabled
                                          readonly
                                          label="editPrice"
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
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthModule } from '@/store/modules/Authentication';
import { UserAPI } from '@/api/UserAPI';
import { UserProfil, VoitureDTO } from '@/models/User/userProfil';

@Component
export default class Profile extends Vue {
  private user: UserProfil = new UserProfil();
  private search = '';
  private item = 'AAAA';
  private headers = [
    {
      text: 'Marque',
      align: 'start',
      value: 'maker',
    },
    { text: 'Model', value: 'model' },
    { text: 'Année', value: 'year' },
    { text: 'Prix', value: 'originalPrice' },
    { text: 'Class', value: 'class' },
    { text: 'PI', value: 'pi' },
    { text: 'Immatriculation', value: 'imatriculation' },
  ];
  private voitures: VoitureDTO[] = [];
  async mounted() {
    AuthModule.loadUser();

    UserAPI.getUserProfile(AuthModule.user.DiscordId)
      .then((user: UserProfil) => {
        this.user = user as UserProfil;
        this.voitures = user.voitures as VoitureDTO[];
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>
<style></style>
