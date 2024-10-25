import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

export default boot(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCNSvww9HKdUazQl90f3cukITegj7C-0Hs',
    authDomain: 'friendspay-dd09b.firebaseapp.com',
    projectId: 'friendspay-dd09b',
    storageBucket: 'friendspay-dd09b.appspot.com',
    messagingSenderId: '878396231145',
    appId: '1:878396231145:web:50a0033651507caa120f78'
  }

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig)

  // Initialize Firebase Cloud Messaging
  const messaging = getMessaging(firebaseApp)

  // Get FCM Token
  getToken(messaging, { vapidKey: 'BObKM0eVy8drvHZ-37B7rZlstO0T_o3VDtpFBKnVTkhAOjOWUlKOqB8hFuomtEIrQ0R72jX-P0p5jw5sAunCpFw' }).then((token) => {
    if (token) {
      localStorage.setItem('fcm_token', token) // Store FCM token in localStorage
    }
  }).catch((err) => {
    console.error('Unable to get FCM Token', err)
  })

  // Listen for messages when the app is open
  onMessage(messaging, (payload) => {
    console.log('Message received: ', payload)
  })
})
