<template>
  <v-container fluid>
    <v-card>
      <v-tabs v-model="model" background-color="transparent" grow>
        <v-tab app v-for="tab in tabs" :key="tab">
          {{ tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="model">
        <v-tab-item v-for="(tab, i) in tabs" :key="i"
          ><v-container
            ><v-card flat>
              <v-card-text>
                <v-row justify="center">
                  <v-expansion-panels popout hover>
                    <v-expansion-panel v-for="(item, j) in text[i].panel" :key="j" class="pannelsRules">
                      <v-expansion-panel-header>{{ item }}</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        {{ text[i].content[j] }}<br />
                        {{ markdown }}
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-row></v-card-text
              >
            </v-card></v-container
          >
        </v-tab-item>
      </v-tabs-items>
    </v-card></v-container
  >
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

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
}
</script>
<style></style>
