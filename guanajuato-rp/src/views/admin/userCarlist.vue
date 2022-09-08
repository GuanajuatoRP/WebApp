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
                        <v-autocomplete
                          v-model="addVoiture.keyCar"
                          :items="carListToAdd"
                          item-text="name"
                          item-value="keyCar"
                          outlined
                          dense
                          label="Car Name"
                          solo
                          :loading="isLoading"
                        ></v-autocomplete>
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
                  <span class="text-h5">Edit Car -- {{ editedItem.Model }} of {{ editedItem.Username }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="KeyCar" disabled v-model="editedItem.KeyCar"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="PowerHp" v-model="editedItem.PowerHp"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="WeightKg" v-model="editedItem.WeightKg"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="DriveTrain" v-model="editedItem.DriveTrain"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Class" v-model="editedItem.Class"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Pi" v-model="editedItem.Pi"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="OnRoad" v-model="editedItem.OnRoad"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Speed" v-model="editedItem.Speed"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Handling" v-model="editedItem.Handling"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Accelerate" v-model="editedItem.Accelerate"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Launch" v-model="editedItem.Launch"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Braking" v-model="editedItem.Braking"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Offroad" v-model="editedItem.Offroad"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Imatriculation" v-model="editedItem.Imatriculation"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="TotalPrice" disabled v-model="editedItem.TotalPrice"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="EditPrice" v-model="editedItem.EditPrice"></v-text-field>
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
                  <span class="text-h5">Delete {{ editedItem.Model }} of {{ editedItem.Username }}</span>
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
            <!-- eslint-disable-next-line -->
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
import { CarsApi } from '@/api/CarsApi';
import { Component, Vue } from 'vue-property-decorator';
import { AuthModule } from '@/store/modules/Authentication';
import { AdminAPI } from '@/api/AdminAPI';
import { CarDTO } from '@/models/Cars/CarDTO';

@Component
export default class Test extends Vue {
  private isConnected = false;
  private isLoading = false;
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
    { text: 'OriginalPrice', value: 'price' },
    { text: 'Edit', value: 'actions', sortable: false },
  ];
  private voitures: CarDTO[] = [];
  private carListToAdd = [];
  private VoitureDialog = false;
  private deleteDialog = false;
  private dialog = false;
  private editedIndex = -1;
  private editedItem = {
    Model: '',
    Username: '',
    KeyCar: '',
    PowerHp: 0,
    WeightKg: 0,
    DriveTrain: '',
    Class: '',
    Pi: 0,
    OnRoad: false,
    Speed: 0,
    Handling: 0,
    Accelerate: 0,
    Launch: 0,
    Braking: 0,
    Offroad: 0,
    Imatriculation: '',
    TotalPrice: 0,
    EditPrice: 0,
  };
  private addVoiture = {
    keyCar: '',
    discordId: '',
  };

  public editItem(item: CarDTO) {
    this.dialog = true;
    this.editedItem.Model = item.model;
    this.editedItem.Username = item.username;
    this.editedItem.KeyCar = item.keyCar;
    this.editedItem.PowerHp = item.editPowerHp;
    this.editedItem.WeightKg = item.editWeightKg;
    this.editedItem.DriveTrain = item.editDriveTrain;
    this.editedItem.Class = item.editClass;
    this.editedItem.Pi = item.editPi;
    this.editedItem.OnRoad = item.editOnRoad;
    this.editedItem.Speed = item.editSpeed;
    this.editedItem.Handling = item.editHandling;
    this.editedItem.Accelerate = item.editAccelerate;
    this.editedItem.Launch = item.editLaunch;
    this.editedItem.Braking = item.editBraking;
    this.editedItem.Offroad = item.editOffroad;
    this.editedItem.Imatriculation = item.imatriculation;
    this.editedItem.EditPrice = item.editPrice;
    this.editedItem.TotalPrice = item.editPrice + item.price;
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
    AdminAPI.deleteVoiture(this.editedItem.KeyCar)
      .then(() => {
        this.voitures = this.voitures.filter((item: any) => item.keyCar !== this.editedItem.KeyCar);
        this.closeDelete();
        this.close();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public save() {
    AdminAPI.updateVoiture(this.editedItem)
      .then(() => {
        this.dialog = false;
        this.$router.go(0);
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

    await AdminAPI.getUserCarList()
      .then((carList: any) => {
        this.voitures = carList;
      })
      .catch((err: any) => {
        console.log(err);
      });
    await CarsApi.search('', '', '', '')
      .then((reponse: any) => {
        this.isLoading = true;
        this.carListToAdd = reponse.map((item: any) => {
          return {
            keyCar: item.idCar,
            name: `${item.maker} ${item.model} ${item.year}`,
          };
        });
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
</script>
<style></style>
