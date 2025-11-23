'use client';
import { MapPoint } from "@/components/shared/ui/icons";
import { geo } from '@/api/geo';
import { useCityStore } from '@/components/shared/stores/cityStore';

interface LocationDisplayProps {
  className?: string;
  onClick?: () => void;
}

export const LocationDisplay = ({ 
  className = "",
  onClick
}: LocationDisplayProps) => {
  const city = useCityStore((state) => state.city);

  const getCountry = async () => {
    const params = {
      withCities: "true",
      withActiveCities: "true",
    }
    const country = await geo.getCountry(params);
  }

  return (
    <div className={`flex items-center gap-1 ${className}`} onClick={onClick}>
      <MapPoint />
      <p className="font-600 text-gray-500 text-fs14" onClick={getCountry}>
        {city?.name || ""}
      </p>
    </div>
  );
};
