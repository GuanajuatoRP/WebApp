<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title>
            Liste des utilisateurs
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="openUserDialog"> New User</v-btn>

            <v-dialog v-model="UserDialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="addUser.DiscordId" label="DiscordId"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="addUser.Prenom" label="Prenom"></v-text-field>
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
                      <v-col cols="12">
                        <v-text-field v-model="addUser.Argent" label="Argent"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeUserDialog"> Cancel </v-btn>
                  <v-btn color="green darken-1" text @click="saveNewUser"> Register user</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialog" max-width="75%">
              <v-card>
                <v-card-title>
                  <span class="text-h5">User -- {{ editedItem.username }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="id" v-model="editedItem.id" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="prenom" v-model="editedItem.prenom" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="nom" v-model="editedItem.nom" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="username" v-model="editedItem.username" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="discordId" v-model="editedItem.discordId" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="sexe" v-model="editedItem.sexe" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="createdAt" v-model="editedItem.createdAt" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="argent" v-model="editedItem.argent"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="permis" v-model="editedItem.permis"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="points" v-model="editedItem.points"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="nbSessionsPermis" v-model="editedItem.nbSessionsPermis"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="nbSessionsPolice" v-model="editedItem.nbSessionsPolice"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="nbSessions" v-model="editedItem.nbSessions"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="openDelete"> Delete </v-btn>
                  <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                  <v-btn color="green darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialog" max-width="75%">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Delete {{ editedItem.username }}</span>
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
import { UserDTO } from '@/models/User/UserDTO';
import { userRegister } from '@/models/User/userRegister';

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
    { text: 'NbSessions', value: 'nbSessions' },
    { text: 'Edit', value: 'actions', sortable: false },
  ];
  private users: UserDTO[] = [];
  private UserDialog = false;
  private deleteDialog = false;
  private dialog = false;
  private editedIndex = -1;
  private editedItem: UserDTO = new UserDTO();
  private addUser = {
    DiscordId: '',
    Prenom: '',
    Nom: '',
    Sexe: '',
    Password: '',
    Argent: '',
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
    editedUser.permis = this.editedItem.permis;
    editedUser.points = this.editedItem.points;
    editedUser.nbSessionsPermis = this.editedItem.nbSessionsPermis;
    editedUser.nbSessionsPolice = this.editedItem.nbSessionsPolice;
    editedUser.nbSessions = this.editedItem.nbSessions;

    AdminAPI.updateUser(editedUser as any)
      .then(() => {
        this.dialog = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public saveNewUser() {
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
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>
<style></style>
