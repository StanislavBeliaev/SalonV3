import { create } from "zustand";
import { geo } from "@/api/geo";

export interface City {
  id: number;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
}

interface CityStore {
  city: City | null;
  isLoading: boolean;
  error: string | null;
  initializeCity: () => Promise<void>;
  initializeCityFromUrl: (cityName: string) => Promise<void>;
  setCity: (city: City) => void;
  getCityFromStorage: () => City | null;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

export const useCityStore = create<CityStore>((set, get) => ({
  city: null,
  isLoading: false,
  error: null,

  getCityFromStorage: () => {
    if (typeof window === 'undefined') return null;
    
    const cityId = localStorage.getItem('local_city_id');
    const cityName = localStorage.getItem('local_city_name');
    const citySlug = localStorage.getItem('local_city_slug');
    const latitude = localStorage.getItem('local_city_lat');
    const longitude = localStorage.getItem('local_city_lng');

    if (cityId && cityName) {
      return {
        id: Number(cityId),
        name: cityName,
        slug: citySlug || cityName.toLowerCase().replace(/\s+/g, '-'),
        latitude: latitude ? Number(latitude) : 0,
        longitude: longitude ? Number(longitude) : 0,
      };
    }
    return null;
  },

  setCity: (city: City) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('local_city_lat', city.latitude?.toString() || '');
      localStorage.setItem('local_city_lng', city.longitude?.toString() || '');
      localStorage.setItem('local_city_id', city.id?.toString() || '');
      localStorage.setItem('local_city_name', city.name || '');
      localStorage.setItem('local_city_slug', city.slug || city.name.toLowerCase().replace(/\s+/g, '-'));
      localStorage.setItem('local_city_id_last_fetch', new Date().toISOString());
      
      localStorage.setItem('id', city.id?.toString() || '');
      localStorage.setItem('name', city.name || '');
      localStorage.setItem('slug', city.slug || city.name.toLowerCase().replace(/\s+/g, '-'));
      localStorage.setItem('latitude', city.latitude?.toString() || '');
      localStorage.setItem('longitude', city.longitude?.toString() || '');
    }
    set({ city });
  },

  initializeCityFromUrl: async (cityName: string) => {
    if (typeof window === 'undefined') return;

    const currentCity = get().city;
    const citySlugFromName = cityName.toLowerCase().replace(/\s+/g, '-');
    
    if (currentCity && currentCity.slug === citySlugFromName) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const data = await geo.getChosenCity(cityName, true) as any;

      if (data) {
        const city: City = {
          id: data.id,
          name: data.name,
          slug: data.slug || data.name?.toLowerCase().replace(/\s+/g, '-') || '',
          latitude: data.latitude,
          longitude: data.longitude,
        };

        if (typeof window !== 'undefined') {
          for (const item in data) {
            const value = data[item];
            if (value !== null && value !== undefined) {
              localStorage.setItem(item, value.toString());
            }
          }
        }
        get().setCity(city);
      }
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при определении города';
      set({ error: errorMessage });
      console.error('Error initializing city from URL:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  initializeCity: async () => {
    if (typeof window === 'undefined') return;

    const storedCity = get().getCityFromStorage();
    if (storedCity) {
      set({ city: storedCity });
    }

    const cityIdCookie = getCookie('City_id');
    const cityIdLocalStorage = localStorage.getItem('local_city_id');
    const cityNameLocalStorage = localStorage.getItem('local_city_name');
    const cityIdLastFetch = localStorage.getItem('local_city_id_last_fetch');

    const hasCookie = !!cityIdCookie;
    const hasLocalStorage = !!cityIdLocalStorage && !!cityNameLocalStorage;
    const isCacheValid = cityIdLastFetch &&
      (Date.now() - new Date(cityIdLastFetch).getTime()) <= 30000;

    if (hasCookie && hasLocalStorage && isCacheValid) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      let cityName: string | null = cityNameLocalStorage;

      if (!cityName) {
        cityName = await geo.getCityByIp();
      }

      if (cityName) {
        const data = await geo.getChosenCity(cityName, true) as any;

        if (data) {
          const city: City = {
            id: data.id,
            name: data.name,
            slug: data.slug || data.name?.toLowerCase().replace(/\s+/g, '-') || '',
            latitude: data.latitude,
            longitude: data.longitude,
          };

          if (typeof window !== 'undefined') {
            for (const item in data) {
              const value = data[item];
              if (value !== null && value !== undefined) {
                localStorage.setItem(item, value.toString());
              }
            }
          }

          get().setCity(city);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при определении города';
      set({ error: errorMessage });
      console.error('Error initializing city:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

