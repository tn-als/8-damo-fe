'use client'

import { useCallback, useEffect, useState } from 'react'
import { onMessageListener, requestForToken, requestNotificationPermission } from '@/src/lib/firebase/firebase-messaging'

export const useWebPush = () => {
  const [token, setToken] = useState<string | null>(null)
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [loading, setLoading] = useState(false)

  const requestToken = useCallback(async () => {
    setLoading(true)

    const permissionResult = await requestNotificationPermission()
    setPermission(permissionResult)

    if (permissionResult !== 'granted') {
      console.warn('알림 권한이 허용되지 않았습니다.')
      setLoading(false)
      return null
    }

    const issuedToken = await requestForToken()
    setToken(issuedToken)
    setLoading(false)
    return issuedToken
  }, [])

  useEffect(() => {
    if (token) {
      onMessageListener().then((payload) => {
        if (payload) {
          console.log('포그라운드 메시지 수신:', payload)
        }
      })
    }
  }, [token])

  return {
    token,
    permission,
    loading,
    refreshToken: requestToken,
  }
}