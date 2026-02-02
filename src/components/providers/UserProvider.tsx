'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/src/stores/user-store';
import { getMe } from '@/src/lib/actions/user';
import { ROUTES } from '@/src/constants/routes';

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const router = useRouter();
  const { user, setUser, setLoading, setInitialized, isInitialized } = useUserStore();

  useEffect(() => {
    if (isInitialized) return;

    const initializeUser = async () => {
      setLoading(true);

      try {
        const result = await getMe();
        const isUnauthorized =
          result.httpStatus.startsWith('401') || result.httpStatus.startsWith('403');

        if (result.httpStatus === "200 OK" && result.data) {
          setUser(result.data);
        } else {
          setUser(null);
          if (isUnauthorized) {
            router.replace(ROUTES.LOGIN);
          }
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
