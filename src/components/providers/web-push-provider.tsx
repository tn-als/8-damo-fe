'use client'

import { type ReactNode } from 'react'
import { useWebPush } from '@/src/hooks/firebase/use-web-push'

interface WebPushProviderProps {
  children: ReactNode
}

export function WebPushProvider({ children }: WebPushProviderProps) {
  useWebPush()

  return <>{children}</>
}
