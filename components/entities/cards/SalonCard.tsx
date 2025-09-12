import { Card, CardBody, CardFooter, Image } from "@heroui/react";

interface Salon {
  id: number;
  name: string;
  contactAddress: string;
  smallAvatar?: string;
  rating?: number;
}

interface SalonCardProps {
  salon: Salon;
}

export default function SalonCard({ salon }: SalonCardProps) {
  return (
    <Card 
      isPressable 
      shadow="sm" 
      className="h-full w-full"
      onPress={() => console.log("salon pressed", salon.id)}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          alt={salon.name}
          className="w-full object-cover h-[240px]"
          radius="lg"
          shadow="sm"
          src={salon.smallAvatar || "/placeholder-image.jpg"}
          width="100%"
        />
      </CardBody>
      <CardFooter className="text-small justify-between flex-col items-start gap-1">
        <p className="text-base font-bold">{salon.name}</p>
        <p className="text-default-500 text-xs line-clamp-2 text-start">{salon.contactAddress}</p>
      </CardFooter>
    </Card>
  );
}