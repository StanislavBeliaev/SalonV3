"use client";
import { Card, CardFooter, Image } from "@heroui/react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
  smallPhoto?: string;
}

interface CategoryCardProps {
  category: Category;
  href?: string;
}

export default function CategoryCard({ category, href }: CategoryCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <Card 
      isPressable 
      shadow="sm"
      isFooterBlurred
      className="w-full aspect-[1/1] max-w-[400px] h-auto xl:h-[324px]"
      onPress={handlePress}
    >
    <Image
      removeWrapper
      alt={category.name}
      className="z-0 w-full h-full object-cover"
      src={category.smallPhoto || "/placeholder-image.jpg"}
    />
    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
      <div className="flex items-center justify-center w-full">
        <p className="text-[#232323] text-fs16 md:text-fs16 lg:text-fs20 font-600 w-full text-center">{category.name}</p>
      </div>
    </CardFooter>
  </Card>
  );
}