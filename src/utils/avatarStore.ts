import { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

const STORAGE_KEY = 'portfolio_custom_avatar';
const EVENT_KEY = 'portfolio_avatar_updated';

export const getStoredAvatar = (): string => {
  if (typeof window !== 'undefined') {
    try {
      const custom = localStorage.getItem(STORAGE_KEY);
      if (custom && custom.startsWith('data:image')) {
        return custom;
      }
    } catch {
      // Ignore localStorage errors
    }
  }
  return PERSONAL_INFO.avatarUrl || '/profile.png';
};

export const saveAvatarFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      try {
        localStorage.setItem(STORAGE_KEY, result);
        window.dispatchEvent(new Event(EVENT_KEY));
      } catch (err) {
        console.warn('Could not save avatar to localStorage:', err);
      }
      resolve(result);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const resetStoredAvatar = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(EVENT_KEY));
  } catch (err) {
    console.warn('Could not clear avatar from localStorage:', err);
  }
};

export const useAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>(() => getStoredAvatar());
  const [isCustom, setIsCustom] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    }
    return false;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const current = getStoredAvatar();
      setAvatarUrl(current);
      setIsCustom(Boolean(localStorage.getItem(STORAGE_KEY)));
    };

    window.addEventListener(EVENT_KEY, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(EVENT_KEY, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    avatarUrl,
    isCustom,
    saveAvatar: saveAvatarFile,
    resetAvatar: resetStoredAvatar,
  };
};
