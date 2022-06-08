import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import fr from 'vuetify/src/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { fr },
    current: 'fr',
  },
  theme: {
    themes: {
      light: {
        primary: '#428ecc',
        accent: '#e30613',
        secondary: '#db5353',
        warning: '#db6027',
        error: '#b33636',
        info: '#2196F3',
        success: '#4CAF50',
      },
    },
  },
});
