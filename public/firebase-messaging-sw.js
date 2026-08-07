importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js')

// Static, public Firebase Web SDK config — safe to ship, mirrors src/lib/firebaseConfig.ts.
// Kept in sync manually since a service worker script can't import app modules.
firebase.initializeApp({
  apiKey: 'AIzaSyBMiv_0Id2G7jE0wH_rG5Q7Hz62t_yYxJc',
  authDomain: 'urbaneatz.firebaseapp.com',
  projectId: 'urbangoodz',
  storageBucket: 'urbaneatz.firebasestorage.app',
  messagingSenderId: '709013709032',
  appId: '1:709013709032:web:005e6ba3a9b138b041a95d',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Urban Goodz'
  const options = {
    body: payload.notification?.body,
    icon: '/android-chrome-192x192.png',
    badge: '/favicon-32x32.png',
    data: payload.data,
  }
  self.registration.showNotification(title, options)
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'
  event.waitUntil(self.clients.openWindow(url))
})
