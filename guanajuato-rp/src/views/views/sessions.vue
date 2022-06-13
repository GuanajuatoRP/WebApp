<template>
  <v-container fluid>
    <v-expansion-panels popout>
      <v-expansion-panel v-for="session in sessions" :key="session.id">
        <v-expansion-panel-header v-ripple="{ class: `primary--text` }">
          <p class="text-left">
            Session n°{{ session.number }}, Date: {{ session.date }}, Participants: {{ session.nbParticipants }}
          </p>
          <p class="text-right">Type: {{ session.type }}</p></v-expansion-panel-header
        >
        <v-expansion-panel-content> Liste nom des participants + role </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Sessions extends Vue {
  data() {
    return {
      sessions: [
        {
          id: 'eee',
          number: 5,
          date: '13/06/2022',
          nbParticipants: 6,
          type: 'Livreur',
        },
        {
          id: 'ddd',
          number: 4,
          date: '12/06/2022',
          nbParticipants: 8,
          type: 'Livreur',
        },
        {
          id: 'ccc',
          number: 3,
          date: '11/06/2022',
          nbParticipants: 3,
          type: 'Livreur',
        },
        {
          id: 'bbb',
          number: 2,
          date: '10/06/2022',
          nbParticipants: 12,
          type: 'Livreur',
        },
        {
          id: 'aaa',
          number: 1,
          date: '10/06/2022',
          nbParticipants: 5,
          type: 'Livreur',
        },
      ],
      active: [],
      avatar: null,
      open: [],
      users: [],
    };
  }
}
</script>
<style></style>
