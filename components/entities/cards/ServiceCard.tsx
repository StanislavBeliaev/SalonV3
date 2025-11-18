"use client";
import { Button } from "@heroui/react";
import minutesToHour from "@/utils/minutesToHour";
import { Avatar, AvatarGroup } from "@heroui/react";
import { Clocks } from "@/components/shared/ui/icons";
import type { Service } from "@/api/service";

export default function ServiceCard({ service }: { service: Service }) {
  const currencySymbol = service.salon.currency.currencySymbol;
  const displayPrice = service.exactPrice
    ? service.exactPrice
    : service.minPrice + " - " + service.maxPrice;
  const totalPictures = service.pictures.length;
  return (
    <div className="group flex flex-col w-full h-full rounded-lg shadow-sm hover:shadow-md transition-all duration-100 border-t-2 border-l-2 border-r-2 border-gray-100 gap-2">
      <div className="flex items-start justify-between w-full h-full pt-4 px-4 ">
        <div className="flex gap-2 items-end">
          <span className="text-fs16 md:text-fs18 font-600 line-clamp-2">
            {service.name}{" "}
          </span>
        </div>
        {service.pictures[0]?.smallAvatar && (
          <AvatarGroup
            className="[&_*]:pointer-events-none [&_*]:hover:transform-none scale-75 sm:scale-100"
            max={3}
            isBordered
            total={totalPictures > 3 ? totalPictures : undefined}
            size="sm"
          >
            {service.pictures.map((picture) => (
              <Avatar key={picture.smallAvatar} src={picture.smallAvatar} />
            ))}
          </AvatarGroup>
        )}
      </div>
      <div className="flex flex-col justify-between w-full h-full px-4">
        <div className="flex items-center justify-between">
          <p className="md:text-fs16 text-fs14 font-400 text-gray-500">
            {service.salon.name}
          </p>
          <span className="flex items-center gap-1 text-gray-500 text-fs14 whitespace-nowrap font-600">
            {minutesToHour(service.duration)}
            <Clocks />
          </span>
        </div>
        <p className="md:text-fs16 text-fs14 font-400 text-green-600">
          {service.onlineReservation ? "" : "Запись только по телефону"}
        </p>
      </div>
      <div className="flex items-center justify-between w-full h-full pb-4 px-4 ">
        <p className="md:text-fs22 text-fs20 text-primary font-600">
          {displayPrice} {currencySymbol}
        </p>
        <Button 
          size="sm" 
          className="md:text-[14px] text-black font-[600] rounded-md bg-white border-gray-300 border-1 hover:text-white hover:bg-primary hover:border-primary group-hover:text-white group-hover:bg-primary group-hover:border-primary transition-all duration-100"
        >
          Записаться
        </Button>
      </div>
    </div>
  );
}
