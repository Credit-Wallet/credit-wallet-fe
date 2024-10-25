// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: 'AIzaSyCNSvww9HKdUazQl90f3cukITegj7C-0Hs',
  authDomain: 'friendspay-dd09b.firebaseapp.com',
  projectId: 'friendspay-dd09b',
  storageBucket: 'friendspay-dd09b.appspot.com',
  messagingSenderId: '878396231145',
  appId: '1:878396231145:web:50a0033651507caa120f78'
}

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-messaging] Background Message Received]', payload)
})
