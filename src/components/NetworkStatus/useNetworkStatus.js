import { useEffect, useState } from 'react';

export function useNetworkStatus(pingUrl) {
  const [isOnline, setIsOnline] = useState(true);
  const [isServerUp, setIsServerUp] = useState(true);

  useEffect(() => {
    // const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    // window.addEventListener('online', updateOnlineStatus);
    // window.addEventListener('offline', updateOnlineStatus);

    const checkServer = async () => {
      try {
        const res = await fetch(pingUrl, { method: 'GET', mode: 'no-cors', cache: 'no-store' });
        setIsServerUp(true);
      } catch {
        setIsServerUp(false);
      }

      try {
        const res = await fetch("https://clients3.google.com/generate_204", { method: 'GET', mode: 'no-cors', cache: 'no-store' });
        setIsOnline(true);
      } catch {
        setIsOnline(false);
      }
    };

    const interval = setInterval(() => {
      // if (navigator.onLine) 
      checkServer();
    }, 3000);

    checkServer();
    return () => {
      // window.removeEventListener('online', updateOnlineStatus);
      // window.removeEventListener('offline', updateOnlineStatus);
      clearInterval(interval);
    };
  }, [pingUrl]);

  return { isOnline, isServerUp };
}