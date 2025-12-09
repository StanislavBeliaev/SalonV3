'use client';
import { useEffect } from 'react';
import { useCityStore } from '@/components/shared/stores/cityStore';
import { usePathname } from 'next/navigation';

export function CityInitializer() {
  const initializeCity = useCityStore((state) => state.initializeCity);
  const initializeCityFromUrl = useCityStore((state) => state.initializeCityFromUrl);
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    
    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0];
      const excludedPaths = ['uslugi', 'salons', 'login', 'register', 'api'];
      
      if (!excludedPaths.includes(firstSegment)) {
        const decodedCityName = decodeURIComponent(firstSegment);
        initializeCityFromUrl(decodedCityName)
        return;
      }
    }
    initializeCity();
  }, [pathname, initializeCity, initializeCityFromUrl]);

  return null;
}