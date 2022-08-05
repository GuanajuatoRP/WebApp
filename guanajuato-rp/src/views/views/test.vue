<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <h1>UwU</h1>
            <!-- <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
            </v-col> -->
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
  async mounted() {
    this.isConnected = await AuthModule.isLoggedIn();
  }
}
</script>
<style></style>
