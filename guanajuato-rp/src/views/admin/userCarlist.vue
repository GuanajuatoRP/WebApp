<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title>
            Liste des voitures des utilisateurs
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="openVoitureDialog"> New Voiture</v-btn>

            <v-dialog v-model="VoitureDialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="addVoiture.discordId" label="DiscordId"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="addVoiture.keyCar" label="Key Car"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeVoitureDialog"> Cancel </v-btn>
                  <v-btn color="green darken-1" text @click="saveNewVoiture"> Save voiture</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialog" max-width="75%">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Car -- {{ editedItem.model }} of {{ editedItem.username }}</span>
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
                  <v-btn color="red darken-1" text @click="openDelete"> Delete </v-btn>
                  <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialog" max-width="75%">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Delete {{ editedItem.model }} Of {{ editedItem.username }}</span>
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="confirmDelete"> Delete </v-btn>
                  <v-btn color="blue darken-1" text @click="closeDelete"> Cancel </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-spacer></v-spacer>

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
import { AdminAPI } from '@/api/AdminAPI';
import { EditCarDTO } from '@/models/Cars/EditCarDTO.ts';

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
  private voitures = [];
  private VoitureDialog = false;
  private deleteDialog = false;
  private dialog = false;
  private editedIndex = -1;
  private editedItem = {
    keyCar: '',
    transmission: '',
    gearBox: 0,
    engineConfiguration: '',
    powerBhp: 0,
    powerKw: 0,
    torqueLbft: 0,
    torqueNm: 0,
    weightLbs: 0,
    weightKg: 0,
    engineDisplacement: 0,
    nbCylindre: 0,
    aspiration: '',
    enginePosition: '',
    speed: 0,
    handling: 0,
    accelerate: 0,
    launch: 0,
    braking: 0,
    offroad: 0,
    pi: 0,
    class: '',
    imatriculation: '',
    totalPrice: 0,
    editPrice: 0,
  };
  private addVoiture = {
    keyCar: '',
    discordId: '',
  };

  public editItem(item: any) {
    this.dialog = true;
    this.editedItem = item;
  }

  public close() {
    this.dialog = false;
  }

  public openDelete() {
    this.deleteDialog = true;
  }
  public openVoitureDialog() {
    this.VoitureDialog = true;
  }

  public closeVoitureDialog() {
    this.addVoiture.discordId = '';
    this.addVoiture.keyCar = '';
    this.VoitureDialog = false;
  }

  public closeDelete() {
    this.deleteDialog = false;
  }

  public confirmDelete() {
    AdminAPI.deleteVoiture(this.editedItem.keyCar)
      .then(() => {
        this.voitures = this.voitures.filter((item) => item.keyCar !== this.editedItem.keyCar);
        this.closeDelete();
        this.close();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public save() {
    let editedCar = new EditCarDTO();
    editedCar.keyCar = this.editedItem.keyCar;
    editedCar.transmission = this.editedItem.transmission;
    editedCar.gearBox = this.editedItem.gearBox;
    editedCar.engineConfiguration = this.editedItem.engineConfiguration;
    editedCar.powerBHP = this.editedItem.powerBhp;
    editedCar.powerKW = this.editedItem.powerKw;
    editedCar.torqueLBFT = this.editedItem.torqueLbft;
    editedCar.torqueNM = this.editedItem.torqueNm;
    editedCar.weightLBS = this.editedItem.weightLbs;
    editedCar.weightKG = this.editedItem.weightKg;
    editedCar.engineDisplacement = this.editedItem.engineDisplacement;
    editedCar.nbCylindre = this.editedItem.nbCylindre;
    editedCar.aspiration = this.editedItem.aspiration;
    editedCar.enginePosition = this.editedItem.enginePosition;
    editedCar.speed = this.editedItem.speed;
    editedCar.handling = this.editedItem.handling;
    editedCar.accelerate = this.editedItem.accelerate;
    editedCar.launch = this.editedItem.launch;
    editedCar.braking = this.editedItem.braking;
    editedCar.offroad = this.editedItem.offroad;
    editedCar.pi = this.editedItem.pi;
    editedCar.class = this.editedItem.class;
    editedCar.imatriculation = this.editedItem.imatriculation ?? '';
    editedCar.prixModif = this.editedItem.totalPrice;
    editedCar.prixModif = this.editedItem.editPrice;

    AdminAPI.updateVoiture(editedCar)
      .then(() => {
        this.dialog = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public saveNewVoiture() {
    AdminAPI.addVoiture(this.addVoiture.discordId, this.addVoiture.keyCar)
      .then(() => {
        this.addVoiture.discordId = '';
        this.addVoiture.keyCar = '';
        this.closeVoitureDialog();

        AdminAPI.getUserCarList()
          .then((carList: any) => {
            this.voitures = carList;
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async mounted() {
    this.isConnected = await AuthModule.isLoggedIn();

    AdminAPI.getUserCarList()
      .then((carList: any) => {
        this.voitures = carList;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>
<style></style>
