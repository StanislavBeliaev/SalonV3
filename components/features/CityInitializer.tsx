'use client';
import { useEffect } from 'react';
import { useCityStore } from '@/components/shared/stores/cityStore';

export function CityInitializer() {
  const initializeCity = useCityStore((state) => state.initializeCity);

  useEffect(() => {
    initializeCity();
  }, [initializeCity]);

  return null;
}

