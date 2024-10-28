import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { Capacitor } from '@capacitor/core'
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

export default boot(async () => {
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

  if (Capacitor.isNativePlatform()) {
    // Dành cho Android (và iOS nếu có)
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Google to receive push via FCM
        PushNotifications.register()
      } else {
        console.error('Push notification permission not granted on Android')
      }
    })

    // Nhận token đăng ký
    await PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token:', token.value)
      localStorage.setItem('fcm_token', token.value) // Lưu token FCM vào localStorage nếu cần
    })

    // Xử lý lỗi đăng ký thông báo
    await PushNotifications.addListener('registrationError', (error) => {
      console.error('Error on registration:', JSON.stringify(error))
    })

    // Hiển thị payload khi ứng dụng đang mở
    await PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Push received:', notification)
    })

    // Xử lý khi người dùng nhấn vào thông báo
    await PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      console.log('Push action performed:', notification)
    })
  } else {
    // Dành cho Web
    const messaging = getMessaging(firebaseApp)
    const vapidKey = 'BObKM0eVy8drvHZ-37B7rZlstO0T_o3VDtpFBKnVTkhAOjOWUlKOqB8hFuomtEIrQ0R72jX-P0p5jw5sAunCpFw'

    // Yêu cầu và lấy FCM Token cho Web
    getToken(messaging, { vapidKey })
      .then((token) => {
        if (token) {
          localStorage.setItem('fcm_token', token)
          console.log('FCM Token on Web:', token)
        }
      })
      .catch((err) => {
        console.error('Unable to get FCM Token on Web', err)
      })

    // Lắng nghe thông báo khi ứng dụng đang mở trên Web
    onMessage(messaging, (payload) => {
      console.log('Message received on Web:', payload)
    })
  }
})
