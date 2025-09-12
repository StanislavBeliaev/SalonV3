import Image from "next/image";
import { Button } from "@heroui/react";
import minutesToHour from "@/utils/minutesToHour";
interface Service {
  id: number;
  name: string;
  smallAvatar?: string;
  salon: {
    name: string;
  };
  exactPrice: number;
  minPrice: number;
  maxPrice: number;
  duration: number;
  pictures: Array<{
    smallAvatar: string;
  }>;
}

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col w-full h-full rounded-lg shadow-md border-t-2 border-l-2 border-r-2 border-gray-100">
      <div className="flex items-center justify-between w-full h-full pt-4 px-4 ">
        <p className="font-bold">
          {service.name}{" "}
          <span className="text-gray-500 text-sm font-normal"> — {minutesToHour(service.duration)}</span>
        </p>
        {service.pictures[0]?.smallAvatar && (
        <Image
          src={service.pictures[0]?.smallAvatar || ""}
          alt={service.name}
          width={48}
          height={48}
          className="object-cover rounded-full min-w-[48px] min-h-[48px]"
        />
        )}
      </div>
      <div className="flex items-center justify-between w-full h-full px-4 ">
        <p className="text-sm text-gray-500">{service.salon.name}</p>
      </div>
      <div className="flex items-center justify-between w-full h-full pb-4 px-4 ">
        <p className="text-base text-primary font-bold">{service.exactPrice || service.minPrice + ' - ' + service.maxPrice} ₽</p>
        <Button size="sm" className="signUpBtn">Записаться</Button>
      </div>
    </div>
  );
}
