<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-card-title>
            Liste des sessions
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="createNewSession" v-if="isAdmin"> New Sessions</v-btn>

            <v-dialog v-model="addUserDialog" max-width="75%">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Ajout d'utilisateurs a la sessions</span>
                </v-card-title>

                <v-card-text>
                  <v-col cols="12" sm="6">
                    <v-select
                      prepend-icon="mdi-account-multiple-plus"
                      chips
                      :loading="!isUserLoaded"
                      v-model="usersSelected"
                      :items="userList"
                      label="Selectionne les utilisateurs a ajouter"
                      multiple
                      outlined
                    ></v-select>
                  </v-col>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeAddUserDialog"> Cancel </v-btn>
                  <v-btn color="green darken-1" text @click="addUserIntoSession"> Add Users </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="removeUserDialog" max-width="75%">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Retrait d'utilisateurs de la sessions</span>
                </v-card-title>

                <v-card-text>
                  <v-col cols="12" sm="6">
                    <v-select
                      prepend-icon="mdi-account-multiple-plus"
                      chips
                      :loading="!isUserLoaded"
                      v-model="usersSelected"
                      :items="userList"
                      label="Selectionne les utilisateurs a supprimer de la session"
                      multiple
                      outlined
                    ></v-select>
                  </v-col>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeRemoveUserDialog"> Cancel </v-btn>
                  <v-btn color="red darken-1" text @click="removeUserIntoSession"> Remove Users </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="editSessionDialog" max-width="75%">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Modification de la session</span>
                </v-card-title>

                <v-card-text>
                  <template>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-menu
                          ref="menuStart"
                          v-model="startMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="startTime"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="startTime"
                              label="Set start time"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="startMenu"
                            v-model="startTime"
                            color="green lighten-1"
                            header-color="primary"
                            format="24hr"
                            @click:minute="$refs.menuStart.save(startTime)"
                          ></v-time-picker>
                        </v-menu>
                        <v-menu
                          ref="menuEnd"
                          v-model="endMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="endTime"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="endTime"
                              label="Set start time"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="endMenu"
                            v-model="endTime"
                            color="green lighten-1"
                            header-color="primary"
                            format="24hr"
                            @click:minute="$refs.menuEnd.save(endTime)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </template>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeEditSessionDialog"> Cancel </v-btn>
                  <v-btn color="green darken-1" text @click="editSession"> Valider </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialog" max-width="75%">
              <v-card>
                <v-card-title class="justify-content">
                  <span class="text-h5">Est-tu sur de vouloir delete cette session ?</span>
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="confirmDelete" outlined> Delete </v-btn>
                  <v-btn color="blue darken-1" @click="closeDeleteDialog"> Cancel </v-btn>
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
          <v-data-table
            :headers="headers"
            :items="sessions"
            :search="search"
            :items-per-page="15"
            show-expand
            single-expand
            item-key="sessionNumber"
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" class="pa-5">
                <v-row>
                  <v-container>
                    <ul v-for="user in item.users" :key="user">
                      <li>{{ user.username }}</li>
                    </ul>
                  </v-container>
                </v-row>
                <v-row v-if="isAdmin">
                  <v-btn color="success" col="12" md="4" @click="openAddUserDialog(item)">Add Users</v-btn>
                  <v-btn color="error" col="12" md="4" @click="openRemoveUserDialog(item)">Remove USer</v-btn>
                  <v-btn color="orange" col="12" md="4" @click="openEditSessionDialog(item)">Edit Session</v-btn>
                  <v-btn color="error" col="12" md="4" outlined @click="openDeleteDialog(item)">Delete Session</v-btn>
                </v-row>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SessionsApi } from '@/api/SessionsApi';
import { AuthModule } from '@/store/modules/Authentication';
import { editSessionDateDTO } from '@/models/Sessions/editSessionDateDTO';
import { newSessionDTO } from '@/models/Sessions/newSessionDTO';

@Component
export default class Sessions extends Vue {
  private sessions = [];
  private isAdmin = false;
  private isLoading = true;

  private search = '';
  private headers = [
    {
      text: 'N° Session',
      align: 'center',
      value: 'sessionNumber',
    },
    { text: 'Date début', value: 'startDate' },
    { text: 'Date Fin', value: 'endDate' },
    { text: 'Type', value: 'type' },
    { text: 'Nb Participants', align: 'center', value: 'nbParticipant' },
  ];

  private addUserDialog = false;
  private removeUserDialog = false;
  private editSessionDialog = false;
  private deleteDialog = false;
  private isUserLoaded = false;
  private userList = [];
  private usersSelected = [];

  private dialog = false;
  private editedItem = {};

  private startMenu = false;
  private endMenu = false;
  private startTime = null;
  private endTime = null;

  public createNewSession() {
    const newSession: newSessionDTO = {
      Type: 0,
    };

    SessionsApi.createNewSession(newSession as newSessionDTO)
      .then(() => {
        SessionsApi.getSessionsWithUser()
          .then((response: any) => {
            this.sessions = response;
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public openDeleteDialog(item: any) {
    this.editItem(item);
    this.deleteDialog = true;
  }

  public closeDeleteDialog() {
    this.deleteDialog = false;
  }

  public confirmDelete() {
    SessionsApi.deleteSession(this.editedItem.sessionId)
      .then(() => {
        this.sessions = this.sessions.filter((item) => item.sessionId !== this.editedItem.sessionId);
        this.closeDeleteDialog();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public editItem(item: any) {
    this.editedItem = item;
  }

  public openAddUserDialog(item: any) {
    this.editItem(item);
    this.addUserDialog = true;
    SessionsApi.getUserAreNotInSessions(this.editedItem.sessionId)
      .then((response: any) => {
        this.userList = response.map((item: any) => item.username);
        this.isUserLoaded = true;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public closeAddUserDialog() {
    this.userList = [];
    this.usersSelected = [];
    this.addUserDialog = false;
  }

  public addUserIntoSession() {
    SessionsApi.addUserIntoSession(this.editedItem.sessionId, this.usersSelected as string[])
      .then(() => {
        this.closeAddUserDialog();
        SessionsApi.getSessionsWithUser()
          .then((response: any) => {
            this.sessions = response;
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public openRemoveUserDialog(item: any) {
    this.editItem(item);
    this.removeUserDialog = true;
    SessionsApi.getUserAreInSessions(this.editedItem.sessionId)
      .then((response: any) => {
        this.userList = response.map((item: any) => item.username);
        this.isUserLoaded = true;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public closeRemoveUserDialog() {
    this.userList = [];
    this.usersSelected = [];
    this.removeUserDialog = false;
  }

  public removeUserIntoSession() {
    SessionsApi.removeUserIntoSession(this.editedItem.sessionId, this.usersSelected as string[])
      .then(() => {
        this.closeRemoveUserDialog();
        SessionsApi.getSessionsWithUser()
          .then((response: any) => {
            this.sessions = response;
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public openEditSessionDialog(item: any) {
    this.editItem(item);
    this.editSessionDialog = true;

    this.startTime = this.editedItem.startDate.slice(
      this.editedItem.startDate.indexOf(' '),
      this.editedItem.startDate.length
    );
    this.endTime = this.editedItem.endDate.slice(this.editedItem.endDate.indexOf(' '), this.editedItem.endDate.length);
  }

  public closeEditSessionDialog() {
    this.editSessionDialog = false;
    this.startTime;
    this.endTime = null;
  }

  public editSession() {
    let editSessionTime = {} as editSessionDateDTO;
    editSessionTime.SessionId = this.editedItem.sessionId;
    editSessionTime.Debut = `${this.editedItem.startDate.split(' ')[0]} ${this.startTime}`;
    editSessionTime.Fin = `${this.editedItem.endDate.split(' ')[0]} ${this.endTime}`;

    SessionsApi.editSessionTime(this.editedItem.sessionId, editSessionTime as editSessionDateDTO)
      .then(() => {
        this.closeEditSessionDialog();
        SessionsApi.getSessionsWithUser()
          .then((response: any) => {
            this.sessions = response;
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  mounted() {
    AuthModule.isAdmin()
      .then((response: any) => {
        this.isAdmin = response;
      })
      .catch((error) => {
        console.log(error);
      });
    SessionsApi.getSessionsWithUser()
      .then((response: any) => {
        this.sessions = response;
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
