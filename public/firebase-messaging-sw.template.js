/* global firebase, importScripts, self, clients */

importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
)

firebase.initializeApp({
  apiKey: '__API_KEY__',
  authDomain: '__AUTH_DOMAIN__',
  projectId: '__PROJECT_ID__',
  storageBucket: '__STORAGE_BUCKET__',
  messagingSenderId: '__MESSAGING_SENDER_ID__',
  appId: '__APP_ID__',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const notification = payload?.notification ?? {}
  const data = payload?.data ?? {}

  const title = notification.title || data.title || '새 알림'
  const body = notification.body || data.body || ''
  const icon = notification.icon || '/next.svg'
  const clickAction =
    notification.click_action || data.click_action || data.url || '/'

  self.registration.showNotification(title, {
    body,
    icon,
    data: {
      clickAction,
      ...data,
    },
  })
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const clickAction =
    event.notification?.data?.clickAction ||
    event.notification?.data?.url ||
    '/'

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ('focus' in client) {
            client.navigate(clickAction)
            return client.focus()
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(clickAction)
        }

        return undefined
      })
  )
})
