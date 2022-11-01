<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title>
            Liste des utilisateurs
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="openUserDialog">
              <v-icon class="mr-2">mdi-plus</v-icon>
              Ajouter
            </v-btn>

            <v-dialog v-model="UserDialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="addUser.DiscordId" label="DiscordId"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="addUser.Prenom" label="Prénom"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="addUser.Nom" label="Nom"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="addUser.Sexe" label="Sexe"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="addUser.Password" label="Password"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeUserDialog">
                    <v-icon class="mr-2">mdi-cancel</v-icon>
                    Annuler
                  </v-btn>
                  <v-btn color="green darken-1" text @click="saveNewUser">
                    <v-icon class="mr-2">mdi-check</v-icon>
                    Sauvegarder
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialog" max-width="75%">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Utilisateur -- {{ editedItem.username }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="ID" v-model="editedItem.id" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Prénom" v-model="editedItem.prenom" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Nom" v-model="editedItem.nom" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Username" v-model="editedItem.username" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="DiscordId" v-model="editedItem.discordId" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Sexe" v-model="editedItem.sexe" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Création le" v-model="editedItem.createdAt" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Argent" v-model="editedItem.argent" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select v-model="editedItem.permis" :items="permisListe" item-text="name" label="Permis">
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select v-model="editedItem.stage" :items="stagesListe" item-text="name" label="Stage">
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Points" v-model="editedItem.points"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Sessions en probatoire restantes"
                          v-model="editedItem.nbSessionsPermis"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Nombre de sessions en policier"
                          v-model="editedItem.nbSessionsPolice"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Nombre de sessions total"
                          v-model="editedItem.nbSessions"
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
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

            <v-dialog v-model="deleteDialog" max-width="75%">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Supprimer {{ editedItem.username }} ?</span>
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

            <v-spacer></v-spacer>

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Recherche"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="users" :search="search" :items-per-page="15" item-key="model">
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
import { Component, Vue } from 'vue-property-decorator';
import { AuthModule } from '@/store/modules/Authentication';
import { AdminAPI } from '@/api/AdminAPI';
import { StageApi } from '@/api/StageApi';
import { PermisApi } from '@/api/PermisApi';
import { UserDTO } from '@/models/User/UserDTO';
import { userRegister } from '@/models/User/userRegister';
import { StageDTO } from '@/models/Stage/StageDTO';
import { PermisDTO } from '@/models/Permis/PermidDTO';

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
    { text: 'DiscordId', value: 'discordId' },
    { text: 'Argent', value: 'argent' },
    { text: 'Permis', value: 'permis' },
    { text: 'Points', value: 'points' },
    { text: 'Stage', value: 'stage' },
    { text: 'NbSessions', value: 'nbSessions' },
    { text: 'NbSessionsRestante', value: 'nbSessionsPermis' },
    { text: 'Edit', value: 'actions', sortable: false },
  ];
  private users: UserDTO[] = [];
  private UserDialog = false;
  private deleteDialog = false;
  private dialog = false;
  private editedIndex = -1;
  private editedItem: UserDTO = new UserDTO();
  private stagesListe: StageDTO[] = [];
  private permisListe: PermisDTO[] = [];
  private addUser = {
    DiscordId: '',
    Prenom: '',
    Nom: '',
    Sexe: '',
    Password: '',
  } as userRegister;

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
  public openUserDialog() {
    this.UserDialog = true;
  }

  public closeUserDialog() {
    //eslint-disable-next-line
    this.addUser = new userRegister();
    this.UserDialog = false;
  }

  public closeDelete() {
    this.deleteDialog = false;
  }

  public confirmDelete() {
    AdminAPI.deleteUser(this.editedItem.discordId)
      .then(() => {
        this.users = this.users.filter((item) => item.id !== this.editedItem.id);
        this.closeDelete();
        this.close();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public save() {
    let editedUser = new UserDTO();
    editedUser.id = this.editedItem.id;
    editedUser.prenom = this.editedItem.prenom;
    editedUser.nom = this.editedItem.nom;
    editedUser.username = this.editedItem.username;
    editedUser.discordId = this.editedItem.discordId;
    editedUser.sexe = this.editedItem.sexe;
    editedUser.createdAt = this.editedItem.createdAt;
    editedUser.argent = this.editedItem.argent;
    editedUser.permis = this.permisListe.map((p) => p.name).find((p) => p == this.editedItem.permis) as string;
    editedUser.stage = this.stagesListe.map((s) => s.name).find((s) => s == this.editedItem.stage) as string;
    editedUser.points = this.editedItem.points;
    editedUser.nbSessionsPermis = this.editedItem.nbSessionsPermis;
    editedUser.nbSessionsPolice = this.editedItem.nbSessionsPolice;
    editedUser.nbSessions = this.editedItem.nbSessions;
    console.log(editedUser);
    AdminAPI.updateUser(editedUser as any)
      .then(() => {
        this.dialog = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public saveNewUser() {
    this.addUser.Prenom = this.addUser.Prenom.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replaceAll(/'/g, '')
      .replaceAll(/"/g, '');
    this.addUser.Nom = this.addUser.Nom.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replaceAll(/'/g, '')
      .replaceAll(/"/g, '');
    AdminAPI.register(this.addUser)
      .then(() => {
        this.closeUserDialog();

        AdminAPI.getUserList()
          .then((userList: any) => {
            this.users = userList;
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

    AdminAPI.getUserList()
      .then((userList: any) => {
        this.users = userList;
        console.log(userList);
      })
      .catch((err: any) => {
        console.log(err);
      });
    StageApi.getAllStagesNames()
      .then((stagesListe: any) => {
        this.stagesListe = stagesListe;
      })
      .catch((err: any) => {
        console.log(err);
      });
    PermisApi.getAllPermisNames()
      .then((permisListe: any) => {
        this.permisListe = permisListe;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>
<style></style>
