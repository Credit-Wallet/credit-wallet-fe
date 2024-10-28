import { boot } from 'quasar/wrappers'
import { Capacitor } from '@capacitor/core';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  if (!Capacitor.isNativePlatform()) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service worker registered:', registration)
      })
      .catch((err) => {
        console.error('Service worker registration failed:', err)
      })
  }
})
