'use client';
import { useState, useEffect } from 'react';
import { MapPoint } from "@/components/shared/icons/mapPoint";
import { geo } from '@/api/geo';

interface LocationDisplayProps {
  className?: string;
}

export const LocationDisplay = ({ 
  className = "" 
}: LocationDisplayProps) => {
  const [cityName, setCityName] = useState<string | null>(null);
  const getCountry = async () => {
    const params = {
      withCities: "true",
      withActiveCities: "true",
    }
    const country = await geo.getCountry(params);
    console.log(country)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCityName = localStorage.getItem('name');
      setCityName(storedCityName);
    }
  }, []);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <MapPoint />
      <p className="hidden sm:block font-600 text-gray-500 text-fs14" onClick={getCountry}>
        {cityName || ""}
      </p>
    </div>
  );
};
