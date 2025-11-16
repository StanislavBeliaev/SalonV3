"use client";
import HoverButton from "@/components/shared/ui/HoverButton";
import MapButton from "@/components/shared/ui/MapButton";
export default function PageTitle({
  title = "",
  className = "",
  buttonText = "Показать все",
  buttonType = "hover",
  showButton = true,
  onClick = () => {},
}: {
  title?: string;
  className?: string;
  buttonText?: string;
  buttonType?: "hover" | "map";
  showButton?: boolean;
  onClick?: () => void;
}) {
    const renderButton = () => {
        if (buttonType === "hover") {
            return <HoverButton buttonText={buttonText} onClick={onClick} />;
        } else if (buttonType === "map") {
            return <MapButton buttonText={buttonText} onClick={onClick} />;
        }
    }
  return (
    <div className="flex items-end justify-start w-full px-4 sm:px-0">
      <h1 className="text-[36px] font-600 flex items-end w-full px-4 sm:px-0">
        {title}
      </h1>
      <div className={`${showButton ? "flex items-center" : "hidden"}`}>
        {renderButton()}
      </div>
    </div>
  );
}
