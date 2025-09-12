import { Card, CardFooter, Image } from "@heroui/react";

interface Category {
  id: number;
  name: string;
  smallPhoto?: string;
}

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Card 
      isPressable 
      shadow="sm"
      isFooterBlurred
      className="h-[324px] w-full"
      onPress={() => console.log("category pressed", category.id)}
    >
    <Image
      removeWrapper
      alt={category.name}
      className="z-0 w-full h-full object-cover"
      src={category.smallPhoto || "/placeholder-image.jpg"}
    />
    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
      <div className="flex items-center justify-center w-full">
        <p className="text-black text-base font-bold w-full text-center">{category.name}</p>
      </div>
    </CardFooter>
  </Card>
  );
}