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
                        <div v-html="tab.rawText"></div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels> </v-row
              ></v-card-text> </v-card
          ></v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { InfoGeneralApi } from '@/api/InfoGeneralApi';
import { marked } from 'marked';

@Component
export default class Rules extends Vue {
  private model = null;

  @Prop()
  textList: any;

  mounted() {
    InfoGeneralApi.getText()
      .then((response: any) => {
        this.textList = response;
        this.textList.forEach((category: any) => {
          category.categories.forEach((tab: any) => {
            tab.rawText = marked(tab.rawText);
          });
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>
<style></style>
