<template>
  <v-container fluid>
    <v-card>
      <v-tabs v-model="model" background-color="transparent" grow>
        <v-tab app v-for="cat in textList" :key="cat">
          {{ cat.title }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="model">
        <v-tab-item v-for="cat in textList" :key="cat"
          ><v-container
            ><v-card flat>
              <v-card-text>
                <v-row justify="center">
                  <v-expansion-panels popout hover>
                    <v-expansion-panel v-for="tab in cat.categories" :key="tab" class="pannelsRules">
                      <v-expansion-panel-header>{{ tab.title }}</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        {{ tab.rawText }}
                        <!--<div v-html="">{{ tab.rawText }}</div>-->
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-row></v-card-text
              >
            </v-card></v-container
          >
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { InfoGeneralApi } from '@/api/InfoGeneralApi';

@Component
export default class Rules extends Vue {
  private markdown = '# Hello World';
  private model = null;
  private tabs = ['Règlements', 'Info Générale', 'GameModes'];
  private text = [
    { panel: ['Discord', 'Serveur'], content: ['aaa', 'bbb'] },
    { panel: ['Achat Voiture', 'Imatriculation', 'vente'], content: ['aaa', 'bbb', 'ccc'] },
    { panel: ['Livreur', 'Balade'], content: ['aaa', 'bbb'] },
  ];

  @Prop()
  textList: any;

  mounted() {
    InfoGeneralApi.getText()
      .then((response: any) => {
        this.textList = response;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>
<style></style>
