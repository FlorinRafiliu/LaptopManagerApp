import { useEffect, useState } from 'react';

export function useNetworkStatus(pingUrl) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isServerUp, setIsServerUp] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    const checkServer = async () => {
      try {
        const res = await fetch(pingUrl, { cache: 'no-store' });
        setIsServerUp(res.ok);
      } catch {
        setIsServerUp(false);
      }
    };

    const interval = setInterval(() => {
      if (navigator.onLine) checkServer();
    }, 3000);

    checkServer();
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      clearInterval(interval);
    };
  }, [pingUrl]);

  return { isOnline, isServerUp };
}