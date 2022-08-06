<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="3" class="pa-2">
        <v-combobox
          v-model="selectedMaker"
          :items="makers"
          label="Marque"
          :loading="makerLoading"
          outlined
          clearable
          hide-details="auto"
        >
        </v-combobox>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="pa-2">
        <v-combobox
          v-model="selectedPays"
          :items="pays"
          label="Pays"
          :loading="paysLoading"
          outlined
          clearable
          hide-details="auto"
        >
        </v-combobox>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="pa-2">
        <v-combobox
          v-model="selectedType"
          :items="types"
          label="Types"
          :loading="typeLoading"
          outlined
          clearable
          hide-details="auto"
        >
        </v-combobox>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="pa-2">
        <v-text-field v-model="selectedName" label="Modèle" outlined hide-details="auto" clearable />
      </v-col>
    </v-row>
    <v-row no-gutters justify="end">
      <v-btn color="primary" class="ma-2" @click.stop="search()">
        <v-icon>mdi-magnify</v-icon>
        Rechercher
      </v-btn>
    </v-row>
    <v-row no-gutters class="px-2, row-pointer">
      <v-data-table
        :items="cars"
        :loading="isLoading"
        :headers="headers"
        style="width: 100%"
        :items-per-page="20"
        hide-default-footer
        :page.sync="page"
        @page-count="pageCount = $event"
        v-touch="rowClicked"
        @click:row="rowClicked"
      >
      </v-data-table>
    </v-row>
    <v-row v-if="pageCount != 1" no-gutters justify="end" class="px-2">
      <v-pagination v-model="page" :length="pageCount" total-visible="7"></v-pagination>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="success" outlined right>
      Reference de modèle copier dans le presse-papier
      <!-- <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template> -->
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { CarsApi } from '@/api/CarsApi';
import { OriginalCarDTO } from '@/models/Cars/OriginalCarDTO';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Concessionnaire extends Vue {
  private makers = [];
  private selectedMaker = '';
  private makerLoading = true;

  private pays = [];
  private selectedPays = '';
  private paysLoading = true;

  private types = [];
  private selectedType = '';
  private typeLoading = true;

  private selectedName = '';

  private isLoading = false;
  private cars: OriginalCarDTO[] = [];

  private snackbar = false;
  private timeout = 2000;

  private get headers() {
    return [
      {
        text: 'Marque',
        sortable: true,
        value: 'maker',
      },
      {
        text: 'Modèle',
        sortable: true,
        value: 'model',
      },
      {
        text: 'Année',
        sortable: true,
        value: 'year',
      },
      {
        text: 'Pays',
        sortable: true,
        value: 'origin',
      },
      {
        text: 'Type',
        sortable: true,
        value: 'type',
      },
      {
        text: 'Classe',
        sortable: true,
        value: 'pi',
      },
      {
        text: 'Prix',
        sortable: true,
        value: 'price',
      },
    ];
  }
  private page = 1;
  private pageCount = 0;

  mounted() {
    this.loadMakers();
    this.loadPays();
    this.loadTypes();

    this.search();
  }

  async loadMakers() {
    this.makerLoading = true;
    await CarsApi.getListMakers()
      .then((response: any) => {
        this.makers = response;
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        this.makerLoading = false;
      });
  }

  async loadPays() {
    this.paysLoading = true;
    await CarsApi.getListPays()
      .then((response: any) => {
        this.pays = response;
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        this.paysLoading = false;
      });
  }

  async loadTypes() {
    this.typeLoading = true;
    await CarsApi.getListTypes()
      .then((response: any) => {
        this.types = response;
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        this.typeLoading = false;
      });
  }

  async search() {
    this.isLoading = true;
    await CarsApi.search(this.selectedMaker, this.selectedPays, this.selectedType, this.selectedName)
      .then((reponse: any) => {
        this.cars = reponse;
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  rowClicked(row: OriginalCarDTO) {
    const clipboardData =
      event.clipboardData || window.clipboardData || event.originalEvent?.clipboardData || navigator.clipboard;
    clipboardData.writeText(row.idCar);
    this.snackbar = true;
  }
}
</script>
<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
