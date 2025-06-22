import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

const getSnapshot = () => !!localStorage.getItem('accessToken');

export const useAuth = () => {
  return useSyncExternalStore(subscribe, getSnapshot);
};
