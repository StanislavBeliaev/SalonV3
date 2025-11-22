"use client";
import HoverButton from "@/components/shared/ui/HoverButton";
import MapButton from "@/components/shared/ui/MapButton";
import { Button } from "@heroui/react";

export default function PageTitle({
  title = "",
  totalServices = 0,
  className = "",
  buttonText = "Показать все",
  buttonType = "hover",
  showButton = true,
  onClick = () => {},
  onFilterClick,
  showFilterButton = false,
}: {
  title?: string;
  totalServices?: number;
  className?: string;
  buttonText?: string;
  buttonType?: "hover" | "map";
  showButton?: boolean;
  onClick?: () => void;
  onFilterClick?: () => void;
  showFilterButton?: boolean;
}) {
  const renderButton = () => {
    if (buttonType === "hover") {
      return <HoverButton buttonText={buttonText} onClick={onClick} />;
    } else if (buttonType === "map") {
      return <MapButton buttonText={buttonText} onClick={onClick} />;
    }
  };

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between w-full px-0">
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between gap-2 md:items-baseline">
          <div className="flex flex-col gap-2 md:flex-row lg:gap-4 md:items-baseline flex-1">
            <h1 className="text-[22px] sm:text-[26px] lg:text-[36px] font-600 leading-tight break-words">
              {title}
            </h1>
            {totalServices > 0 && (
              <p className="text-xs sm:text-fs14 font-400 text-[#434343] lg:whitespace-nowrap">
                Найдено: {totalServices}
              </p>
            )}
          </div>
          {showFilterButton && onFilterClick && (
            <Button
              size="md"
              radius="sm"
              variant="bordered"
              className="lg:hidden whitespace-nowrap text-fs17 font-[600] hover:text-white hover:bg-primary hover:border-primary flex-shrink-0"
              onPress={onFilterClick}
            >
              Фильтры
            </Button>
          )}
        </div>
      </div>
      {showButton && (
        <div className={`flex items-center ${buttonType === "hover" ? "max-lg:hidden" : ""}`}>
          {renderButton()}
        </div>
      )}
    </div>
  );
}
