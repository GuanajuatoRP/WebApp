<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title>
            Liste des voitures des utilisateurs
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="openVoitureDialog">
              <v-icon class="mr-2">mdi-plus</v-icon>
              Ajouter
            </v-btn>

            <!-- Dialog - Ajouter une voiture -->
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
                  <v-btn color="blue darken-1" text @click="closeVoitureDialog">
                    <v-icon class="mr-2">mdi-cancel</v-icon>
                    Annuler
                  </v-btn>
                  <v-btn color="green darken-1" text @click="saveNewVoiture">
                    <v-icon class="mr-2">mdi-check</v-icon>
                    Sauvegarder
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- Dialog - Modifier une voiture -->
            <v-dialog v-model="dialog" max-width="75%">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Modification -- {{ editedItem.Model }} de {{ editedItem.Username }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="KeyCar" disabled v-model="editedItem.KeyCar"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Puissance (cv)" v-model="editedItem.PowerHp"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Poids (kg)" v-model="editedItem.WeightKg"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Transmission" v-model="editedItem.DriveTrain"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Classe" v-model="editedItem.Class"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Indice de Performance" v-model="editedItem.Pi"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="OnRoad" v-model="editedItem.OnRoad"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Vitesse" v-model="editedItem.Speed"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Tenue de route" v-model="editedItem.Handling"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Accélération" v-model="editedItem.Accelerate"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Départ arrêté" v-model="editedItem.Launch"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Freinage" v-model="editedItem.Braking"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Tout-terrain" v-model="editedItem.Offroad"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Immatriculation" v-model="editedItem.Imatriculation"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Prix total" disabled v-model="editedItem.TotalPrice"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Prix des modifications" v-model="editedItem.EditPrice"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="openChangeOwner">
                    <v-icon class="mr-2">mdi-account-switch</v-icon>
                    Changer de propriétaire
                  </v-btn>
                  <v-btn color="red darken-1" text @click="openDelete">
                    <v-icon class="mr-2">mdi-delete</v-icon>
                    Supprimer
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="close">
                    <v-icon class="mr-2">mdi-cancel</v-icon>
                    Annuler
                  </v-btn>
                  <v-btn color="green darken-1" text @click="save">
                    <v-icon class="mr-2">mdi-check</v-icon>
                    Sauvegarder
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- Dialog - Supprimer une voiture -->
            <v-dialog v-model="deleteDialog" max-width="50%">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Supprimer {{ editedItem.Model }} de {{ editedItem.Username }} ?</span>
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="confirmDelete">
                    <v-icon class="mr-2">mdi-delete</v-icon>
                    Supprimer
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="closeDelete">
                    <v-icon class="mr-2">mdi-cancel</v-icon>
                    Annuler
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- Dialog - Modifier le propriétaire d'une voiture -->
            <v-dialog v-model="changeOwnerDialog" max-width="50%">
              <v-card>
                <v-card-title>
                  <span class="text-h5">À qui transférer {{ editedItem.Model }} de {{ editedItem.Username }} ?</span>
                </v-card-title>
                <v-card-text>
                  <v-autocomplete
                    placeholder="Nouveau propriétaire"
                    :items="users"
                    v-model="selectedUser"
                    outlined
                    item-text="username"
                    item-value="discordId"
                  >
                    <!-- <template v-slot:item="data">
                      <span> {{ data.prenom }} {{ data.nom }} </span>
                    </template>
                    <template v-slot:selection="data">
                      <span> {{ data.prenom }} {{ data.nom }} </span>
                    </template> -->
                  </v-autocomplete>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="success darken-1"
                    text
                    @click="confirmChangeOwner"
                    :disabled="!canChangeOwner"
                    :loading="isChangeOwnerLoading"
                  >
                    <v-icon class="mr-2">mdi-account-switch</v-icon>
                    Changer de propriétaire
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="closeChangeOwner">
                    <v-icon class="mr-2">mdi-cancel</v-icon>
                    Annuler
                  </v-btn>
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
          <v-data-table :headers="headers" :items="voitures" :search="search" :items-per-page="15" item-key="KeyCar">
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
import { UserDTO } from '@/models/User/UserDTO';

@Component
export default class Test extends Vue {
  private isConnected = false;
  private isLoading = false;
  private isChangeOwnerLoading = false;
  private search = '';
  private headers = [
    {
      text: 'Username',
      align: 'start',
      value: 'username',
    },
    { text: 'Modèle', value: 'model' },
    { text: 'Année', value: 'year' },
    { text: 'Type', value: 'type' },
    { text: 'Puissance Cv', value: 'editPowerHp' },
    { text: 'Immatriculation', value: 'imatriculation' },
    { text: 'Prix de base', value: 'price' },
    { text: '', value: 'actions', sortable: false },
  ];
  private voitures: CarDTO[] = [];
  private carListToAdd = [];
  private VoitureDialog = false;
  private deleteDialog = false;
  private changeOwnerDialog = false;
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

  //changeOwner
  private users: UserDTO[] = [];
  private selectedUser = '';

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
  public openChangeOwner() {
    this.changeOwnerDialog = true;
  }

  public closeVoitureDialog() {
    this.addVoiture.discordId = '';
    this.addVoiture.keyCar = '';
    this.VoitureDialog = false;
  }

  public closeDelete() {
    this.deleteDialog = false;
  }
  public closeChangeOwner() {
    this.changeOwnerDialog = false;
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

  public get canChangeOwner() {
    return this.selectedUser != null;
  }
  public async confirmChangeOwner() {
    if (this.selectedUser) {
      try {
        this.isChangeOwnerLoading = true;
        await AdminAPI.changeOwner(this.selectedUser, this.editedItem.KeyCar);
        this.closeChangeOwner();
        this.close();
        this.selectedUser = '';
        await this.reload();
      } catch (err: any) {
        console.log(err);
      } finally {
        this.isChangeOwnerLoading = false;
      }
    }
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

    await this.reload();

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
    await AdminAPI.getUserList()
      .then((userList: any) => {
        this.users = userList;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  async reload() {
    await AdminAPI.getUserCarList()
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
