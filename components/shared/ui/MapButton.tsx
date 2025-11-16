"use client";
import { Button } from "@heroui/react";
import { MapPointWhite } from "./icons/MapPoint";
export default function MapButton({
  buttonText,
  onClick,
}: {
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        size="md"
        radius="sm"
        className="whitespace-nowrap text-white bg-secondary text-[18px] font-semibold"
        onPress={onClick}
      >
        {buttonText}
        <MapPointWhite size={24} />
      </Button>
    </div>
  );
}
