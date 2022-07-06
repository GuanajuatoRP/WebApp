<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title>
            Liste des voitures des utilisateurs
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Car -- {{ editedItem.model }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Transmission" v-model="editedItem.transmission"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="GearBox" v-model="editedItem.gearBox"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="EngineConfiguration"
                          v-model="editedItem.engineConfiguration"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="PowerBhp" v-model="editedItem.powerBhp"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="powerKw" v-model="editedItem.powerKw"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="torqueLbft" v-model="editedItem.torqueLbft"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="torqueNm" v-model="editedItem.torqueNm"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="weightLbs" v-model="editedItem.weightLbs"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="weightKg" v-model="editedItem.weightKg"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="engineDisplacement" v-model="editedItem.engineDisplacement"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="nbCylindre" v-model="editedItem.nbCylindre"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="aspiration" v-model="editedItem.aspiration"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="enginePosition" v-model="editedItem.enginePosition"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="speed" v-model="editedItem.speed"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="handling" v-model="editedItem.handling"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="accelerate" v-model="editedItem.accelerate"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="launch" v-model="editedItem.launch"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="braking" v-model="editedItem.braking"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="offroad" v-model="editedItem.offroad"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="pi" v-model="editedItem.pi"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="class" v-model="editedItem.class"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="imatriculation" v-model="editedItem.imatriculation"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="totalPrice" v-model="editedItem.totalPrice"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="editPrice" v-model="editedItem.editPrice"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Recherche"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="voitures" :search="search" :items-per-page="15" item-key="model">
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthModule } from '@/store/modules/Authentication';

@Component
export default class Test extends Vue {
  private isConnected = false;
  private search = '';
  private headers = [
    {
      text: 'Username',
      align: 'start',
      value: 'username',
    },
    { text: 'Model', value: 'model' },
    { text: 'Year', value: 'year' },
    { text: 'Type', value: 'type' },
    { text: 'Imatriculation', value: 'imatriculation' },
    { text: 'OriginalPrice', value: 'originalPrice' },
    { text: 'Edit', value: 'actions', sortable: false },
  ];
  private voitures = [
    {
      keyCar: 'b3255a62-0512-40f6-e726-08da5e039900',
      idUser: '2e4c8847-15a7-46ee-a04d-d93a8fcfb08a',
      username: 'stringstring',
      idCar: '71f81953-3e65-4c00-a9f0-018ec4b9473f',
      carId: 630,
      carOrdinal: 1369,
      maker: 'Pagani',
      model: 'Zonda Cinque Roadster',
      year: 2009,
      transmission: 'RWD',
      gearBox: 6,
      type: 'Hypercars',
      rarity: 'Legendary',
      wikiLink: 'https://forza.fandom.com/wiki/Pagani_Zonda_Cinque_Roadster',
      pictureLink: null,
      engineConfiguration: 'V12',
      originalPowerBhp: 678,
      originalPowerKw: 506,
      originalTorqueLbft: 575,
      originalTorqueNm: 780,
      originalWeightLbs: 2858,
      originalWeightKg: 1296,
      originalEngineDisplacement: 7.3,
      originalNbCylindre: 12,
      originalAspiration: 'Naturally_Aspirated ',
      originalEnginePosition: 'Mid_Engine',
      originalSpeed: 7.4,
      originalHandling: 8,
      originalAccelerate: 6.5,
      originalLaunch: 6.9,
      originalBraking: 8.9,
      originalOffroad: 4.5,
      originalPi: 896,
      originalPrice: 2100000,
      originalClass: '896',
      powerBhp: 678,
      powerKw: 506,
      torqueLbft: 575,
      torqueNm: 780,
      weightLbs: 2858,
      weightKg: 1296,
      engineDisplacement: 7.3,
      nbCylindre: 12,
      aspiration: 'Naturally_Aspirated',
      enginePosition: 'Mid_Engine',
      speed: 7.4,
      handling: 8,
      accelerate: 6.5,
      launch: 6.9,
      braking: 8.9,
      offroad: 4.5,
      pi: 896,
      class: '896',
      imatriculation: '',
      totalPrice: 2100000,
      editPrice: 0,
    },
  ];
  private dialog = false;
  private editedIndex = -1;
  private editedItem = {
    transmission: 'RWD',
    gearBox: 6,
    engineConfiguration: 'V12',
    powerBhp: 678,
    powerKw: 506,
    torqueLbft: 575,
    torqueNm: 780,
    weightLbs: 2858,
    weightKg: 1296,
    engineDisplacement: 7.3,
    nbCylindre: 12,
    aspiration: 'Naturally_Aspirated',
    enginePosition: 'Mid_Engine',
    speed: 7.4,
    handling: 8,
    accelerate: 6.5,
    launch: 6.9,
    braking: 8.9,
    offroad: 4.5,
    pi: 896,
    class: '896',
    imatriculation: '',
    totalPrice: 2100000,
    editPrice: 0,
  };

  public editItem(item) {
    this.dialog = true;
    this.editedItem = item;
  }

  async mounted() {
    this.isConnected = await AuthModule.isLoggedIn();
  }
}
</script>
<style></style>
