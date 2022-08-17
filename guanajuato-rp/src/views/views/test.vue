<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <h1>{{ process.env.VUE_APP_TEST }}</h1>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthModule } from '@/store/modules/Authentication';

@Component
export default class Test extends Vue {
  private isConnected = false;
  private dialog = true;
  private formTitle = process.env.VUE_APP_TEST;
  async mounted() {
    console.log(process.env.VUE_APP_TEST);
    console.log(process.env.VUE_APP_TEST);
    this.isConnected = await AuthModule.isLoggedIn();
  }
}
</script>
<style></style>
