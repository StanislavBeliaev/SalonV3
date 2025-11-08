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
      try {
        const data = await geo.getChosenCity() as unknown as ChosenCity;
        if (data) {
          for (const item in data) {
            const value = data[item as keyof ChosenCity];
            if (value !== null && value !== undefined) {
              localStorage.setItem(item, value.toString());
            }
          }
        }
      } catch (error) {
        console.error('Error syncing city data:', error);
      }
    }
    getChosenCity();
  }, []);

  return null;
}