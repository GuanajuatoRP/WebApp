<template>
  <v-container fluid>
    <v-container fluid>
      <v-row dense>
        <v-carousel :show-arrows="false" :cycle="true" :hide-delimiters="true" :height="400" class="rounded-lg">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3 white--text">{{ getRandomWord() }}</div>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-row>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" cols="12" md="8">
          <v-card elevation="3" outlined>
            <v-img
              src="@/assets/Forza-Horizon-5.jpg"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
              <v-card-text>{{ card.text }} <a href="https://discord.gg/rGPzz6BjuA">Serveur Discord</a></v-card-text>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <iframe
            src="https://discord.com/widget?id=854140376867930122&theme=dark"
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
  private slides = [
    'Guanajuato RolePlay sur Forza Horizon 5',
    'Des modes de jeu exclusifs',
    'Passage de Permis',
    'Une économie accessible à tous',
  ];
  private tmpSlides: string[] = [];
  private cards = [
    {
      text: `Tu cherches un serveur Forza Horizon 5 Full RolePlay, où le moindre détail a son importance ? 
Alors viens sur discord ! Nous t’attendons :
`,
      src: '../../assets/Forza-Horizon-5.jpg',
      flex: 8,
    },
  ];

  getRandomWord() {
    const randomIdx = Math.floor(Math.random() * this.slides.length);
    const randomword = this.slides[randomIdx] as string;
    return randomword;
  }
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
