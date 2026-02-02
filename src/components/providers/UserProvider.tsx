'use client';

import { useEffect, ReactNode } from 'react';
import { useUserStore } from '@/src/stores/user-store';
import { getMe } from '@/src/lib/actions/user';

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const { user, setUser, setLoading, setInitialized, isInitialized } = useUserStore();

  useEffect(() => {
    if (isInitialized) return;

    const initializeUser = async () => {
      setLoading(true);

      try {
        const result = await getMe();
        if (result.httpStatus === "200 OK" && result.data) {
          setUser(result.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeUser();
  }, [isInitialized, setUser, setLoading, setInitialized]);

  return <>{children}</>;
}
