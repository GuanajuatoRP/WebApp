module.exports = {
  transpileDependencies: ['vuetify'],
  pwa: {
    name: 'Blank',
    themeColor: '#428ecc',
    msTileColor: '#428ecc',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      msTileImage: 'mstile-150x150.png',
    },
    manifestOptions: {
      name: 'Blank',
      short_name: 'Blank',
      start_url: '.',
      display: 'standalone',
      theme_color: '#428ecc',
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
      background_color: '#428ecc',
    },
  },
};
