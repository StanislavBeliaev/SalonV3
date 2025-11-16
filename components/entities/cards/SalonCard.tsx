"use client";
import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import { salons } from "@/api/salons";
import { HeartIcon } from "@/components/shared/ui/icons";

interface Salon {
  id: number;
  name: string;
  contactAddress: string;
  smallAvatar?: string;
  rating?: number;
  liked?: boolean;
}

interface SalonCardProps {
  salon: Salon;
}

export default function SalonCard({ salon }: SalonCardProps) {
  const [isFavorite, setIsFavorite] = useState(salon.liked || false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(salon.liked || false);
  }, [salon.id, salon.liked]);

  const handleFavoriteClick = async () => {
    if (isLoading) return;
    
    const previousState = isFavorite;
    setIsFavorite(!previousState);
    setIsLoading(true);

    try {
      if (previousState) {
        await salons.unlikeSalon(salon.id);
      } else {
        await salons.likeSalon(salon.id);
      }
    } catch (error) {
      setIsFavorite(previousState);
      console.error("Failed to toggle favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card 
      isPressable 
      shadow="sm" 
      className="h-full w-full"
      onPress={() => console.log("salon pressed", salon.id)}
    >
      <CardBody className="overflow-visible p-0 relative">
        <Image
          alt={salon.name}
          className="w-full object-cover h-[240px]"
          radius="lg"
          shadow="sm"
          src={salon.smallAvatar || "/placeholder-image.jpg"}
          width="100%"
        />
        <Button
          isIconOnly
          variant="light"
          isDisabled={isLoading}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full min-w-10 h-10 z-10"
          onPress={handleFavoriteClick}
          aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
        >
          <HeartIcon
            size={20}
            filled={isFavorite}
            className={isFavorite ? "text-primary" : "text-gray-600"}
          />
        </Button>
      </CardBody>
      <CardFooter className="text-small justify-between flex-col items-start gap-1">
        <p className="text-base font-bold">{salon.name}</p>
        <p className="text-default-500 text-fs14 line-clamp-2 text-start">{salon.contactAddress}</p>
      </CardFooter>
    </Card>
  );
}