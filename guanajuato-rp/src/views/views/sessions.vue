<template>
  <v-container fluid>
    <v-expansion-panels popout>
      <v-expansion-panel v-for="session in sessionsList" :key="session">
        <v-expansion-panel-header v-ripple="{ class: `primary--text` }">
          <p class="text-left">
            Session n°{{ session.sessionNumber }}, Date: {{ session.date }}, Participants: {{ session.nbParticipant }}
          </p>
          <p class="text-right">Type: {{ session.type }}</p></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <ul v-for="user in session.users" :key="user">
            <li>{{ user.username }}</li>
          </ul>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SessionsApi } from '@/api/SessionsApi';

@Component
export default class Sessions extends Vue {
  @Prop()
  sessionsList: any;

  mounted() {
    SessionsApi.getSessionsWithUser()
      .then((response: any) => {
        this.sessionsList = response;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>
<style></style>
