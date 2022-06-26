<template>
  <v-container fluid>
    <v-container fluid>
      <v-row dense>
        <v-carousel :show-arrows="false" :cycle="true" :hide-delimiters="true" :height="400">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <!--<v-row class="fill-height" align="center" justify="center">
              <div class="display-3 white--text">{{ slides[i] }}</div>
            </v-row> -->
          </v-carousel-item>
        </v-carousel>
      </v-row>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" cols="12" md="8">
          <v-card elevation="3" outlined>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
              <v-card-text v-text="card.text"></v-card-text>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <iframe
            src="https://discord.com/widget?id=877644017255465011&theme=dark"
            width="100%"
            height="400"
            allowtransparency="true"
            frameborder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserAPI } from '@/api/UserAPI';

@Component
export default class Home extends Vue {
  private items = [];
  // private slides = ['Innovation', 'Design', 'Technology', 'coucou'];
  private cards = [{ text: 'VlaVlaVla mon text', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 8 }];
  private markdown = '# Hello world';

  mounted() {
    UserAPI.getCarouselImage()
      .then((srcList: any) => {
        this.items = srcList;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
</script>
<style></style>
