'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCityStore } from '@/components/shared/stores/cityStore';

export function CityRedirect() {
  const router = useRouter();
  const city = useCityStore((state) => state.city);
  const isLoading = useCityStore((state) => state.isLoading);

  useEffect(() => {
    if (!isLoading && city?.slug) {
      router.replace(`/${city.slug}`);
    }
  }, [city, isLoading, router]);

  return null;
}

