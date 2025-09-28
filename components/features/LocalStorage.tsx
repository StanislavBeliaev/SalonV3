'use client';
import { useEffect } from 'react';

interface SyncWithLocalStorageProps {
  data: any;
  storageKey: string;
}

export function SyncWithLocalStorage({ data, storageKey }: SyncWithLocalStorageProps) {
  useEffect(() => {
    if (data) {
        for (const item in data) {
            localStorage.setItem(item, JSON.stringify(data[item]));
        }
    }
  }, [data, storageKey]);

  return null;
}