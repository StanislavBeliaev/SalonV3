'use client';
import { useEffect } from 'react';
import { geo } from '@/api/geo';

interface ChosenCity {
  id: number;
  name: string;
  latitude: number;
  longitude: number;    
}
export function SyncWithLocalStorage() {
  useEffect(() => {
    async function getChosenCity() {
    const data = await geo.getChosenCity() as unknown as ChosenCity;
    if (data) {
        for (const item in data) {
            localStorage.setItem(item, data[item as keyof ChosenCity].toString());
        }
    }
    }
    getChosenCity();
  }, []);

  return null;
}