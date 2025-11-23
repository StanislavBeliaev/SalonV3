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
    async function fetchCity() {
      try {
        const cityIdLastFetch = localStorage.getItem('local_city_id_last_fetch');
        let cityName = localStorage.getItem('local_city_name');
        
        const shouldFetch = !cityName || !cityIdLastFetch || 
          (Date.now() - new Date(cityIdLastFetch).getTime()) > 30000;

        if (shouldFetch) {
          if (!cityName) {
            cityName = await geo.getCityByIp();
          }
          
          await setChosenCity(cityName);
        }
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    }

    async function setChosenCity(cityName: string | null) {
      try {
        const data = await geo.getChosenCity(cityName || undefined, true) as unknown as ChosenCity;
        
        if (data) {
          localStorage.setItem('local_city_lat', data.latitude?.toString() || '');
          localStorage.setItem('local_city_lng', data.longitude?.toString() || '');
          localStorage.setItem('local_city_id', data.id?.toString() || '');
          localStorage.setItem('local_city_name', data.name || '');
          localStorage.setItem('local_city_id_last_fetch', new Date().toISOString());
          
          for (const item in data) {
            const value = data[item as keyof ChosenCity];
            if (value !== null && value !== undefined) {
              localStorage.setItem(item, value.toString());
            }
          }
        }
      } catch (error) {
        console.error('Error setting chosen city:', error);
      }
    }

    fetchCity();
  }, []);

  return null;
}