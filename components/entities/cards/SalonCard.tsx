"use client";
import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import { salons, Salon } from "@/api/salons";
import { HeartIcon } from "@/components/shared/ui/icons";

interface SalonCardProps {
  salon: Salon;
}

const StarRating = ({ rating = 0 }: { rating: number }) => {
  const validRating = Math.max(0, Math.min(5, rating || 0));
  const fullStars = Math.max(0, Math.floor(validRating));
  const hasHalfStar = validRating % 1 >= 0.5 && validRating < 5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className="flex items-center gap-0.5" aria-label={`Рейтинг: ${validRating} из 5`}>
      {fullStars > 0 && Array.from({ length: fullStars }).map((_, i) => (
        <svg key={`full-${i}`} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      {hasHalfStar && (
        <svg width="16" height="16" viewBox="0 0 24 24" className="text-yellow-400" aria-hidden="true">
          <defs>
            <linearGradient id={`half-fill-${validRating}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#half-fill-${validRating})`}/>
        </svg>
      )}
      {emptyStars > 0 && Array.from({ length: emptyStars }).map((_, i) => (
        <svg key={`empty-${i}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
};

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

  const getReviewText = (count?: number) => {
    if (!count || count === 0) return "0 Отзывов";
    if (count === 1) return "1 Отзыв";
    if (count >= 2 && count <= 4) return `${count} Отзыва`;
    return `${count} Отзывов`;
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
        <p className="text-default-500 text-fs14 text-start">{salon.contactAddress}</p>
      </CardFooter>
    </Card>
  );
}