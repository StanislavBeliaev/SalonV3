import Image from "next/image";
import { Button } from "@heroui/react";
import minutesToHour from "@/utils/minutesToHour";
interface Service {
  id: number;
  name: string;
  smallAvatar?: string;
  salon: {
    name: string;
    currency: {
      currencySymbol: string;
    };
  };
  exactPrice: number;
  minPrice: number;
  maxPrice: number;
  duration: number;
  onlineReservation: boolean;
  pictures: Array<{
    smallAvatar: string;
  }>;
}

export default function ServiceCard({ service }: { service: Service }) {
  const currencySymbol = service.salon.currency.currencySymbol;
  const displayPrice = service.exactPrice ? service.exactPrice : service.minPrice + ' - ' + service.maxPrice;
  return (
    <div className="flex flex-col w-full h-full rounded-lg shadow-sm border-t-2 border-l-2 border-r-2 border-gray-100">
      <div className="flex items-center justify-between w-full h-full pt-4 px-4 ">
        <p className="text-fs18 font-600">
          {service.name}{" "}
          <span className="text-gray-500 text-fs18 font-400"> — {minutesToHour(service.duration)}</span>
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
      <div className="flex flex-col justify-between w-full h-full px-4 ">
        <p className="text-fs16 font-400 text-gray-500">{service.salon.name}</p>
        <p className="text-fs16 font-400 text-green-600">{service.onlineReservation ? '' : 'Запись только по телефону'}</p>
      </div>
      <div className="flex items-center justify-between w-full h-full pb-4 px-4 ">
        <p className="text-fs22 text-primary font-600">{displayPrice} {currencySymbol}</p>
        <Button size="sm" className="signUpBtn">Записаться</Button>
      </div>
    </div>
  );
}
