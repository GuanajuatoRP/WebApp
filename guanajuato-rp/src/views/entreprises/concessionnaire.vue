<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="3" pa-2>
        <v-combobox v-model="selectedMaker" :items="makers" label="Marque" :loading="makerLoading" outlined ma-1>
        </v-combobox>
      </v-col>
      <v-col cols="12" sm="6" md="3" pa-2>
        <v-combobox v-model="selectedPays" :items="pays" label="Pays" :loading="paysLoading" outlined ma-1>
        </v-combobox>
      </v-col>
      <v-col cols="12" sm="6" md="3" pa-2>
        <v-combobox v-model="selectedType" :items="types" label="Types" :loading="typeLoading" outlined ma-1>
        </v-combobox>
      </v-col>
      <v-col cols="12" sm="6" md="3" pa-2>
        <v-text-field v-model="selectedName" label="Modèle" outlined />
      </v-col>
    </v-row>
    <div>
      <v-btn color="primary" class="float-right">Rechercher</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { CarsApi } from '@/api/CarsApi';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Concessionnaire extends Vue {
  private makers = null;
  private selectedMaker = '';
  private makerLoading = true;

  private pays = null;
  private selectedPays = '';
  private paysLoading = true;

  private types = null;
  private selectedType = '';
  private typeLoading = true;

  private selectedModel = '';

  mounted() {
    this.loadMakers();
    this.loadPays();
    this.loadTypes();
  }

  async loadMakers() {
    await CarsApi.getListMakers()
      .then((response: any) => {
        this.makers = response;
        this.makerLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async loadPays() {
    await CarsApi.getListPays()
      .then((response: any) => {
        this.pays = response;
        this.paysLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async loadTypes() {
    await CarsApi.getListTypes()
      .then((response: any) => {
        this.types = response;
        this.typeLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>
<style></style>
