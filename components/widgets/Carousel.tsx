"use client";
import { useState, useEffect, ReactNode, useRef } from "react";
import { Button } from "@heroui/react";
import SectionHeader from "@/components/shared/ui/SectionHeader";

interface CarouselListProps {
  title: string;
  linkTo: string;
  data: any[];
  cardsPerPage?: number;
  renderItem: (item: any) => ReactNode;
  filterComponent?: ReactNode | null;
}

export const CarouselList = ({
  title,
  linkTo,
  data,
  cardsPerPage = 4,
  renderItem,
  filterComponent = null,
}: CarouselListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(cardsPerPage);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(window.innerWidth >= 1024 ? cardsPerPage : 1);
      window.innerWidth <= 1024 ? setIsMobile(true) : setIsMobile(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [cardsPerPage]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= data.length - cardsPerView ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - cardsPerView : prevIndex - 1
    );
  };

  const canGoNext = currentIndex < data.length - cardsPerView;
  const canGoPrev = currentIndex > 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && canGoNext) {
      nextSlide();
    }
    if (isRightSwipe && canGoPrev) {
      prevSlide();
    }
  };

  return (
    <section
      className="flex flex-col gap-3 relative max-w-[1440px] w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <SectionHeader title={title} linkTo={linkTo} />

      {filterComponent && (
        <div className="flex justify-between items-center w-full">
          {filterComponent}
        </div>
      )}

      <div
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out p-1"
          style={{
            transform: `translateX(-${currentIndex * (carouselRef.current?.offsetWidth || 0)}px)`,
          }}
        >
          {data.map((item, index) => (
            <div
              ref={index === 0 ? carouselRef : null}
              key={item?.id ?? item?.key ?? index}
              className="flex-shrink-0 px-2"
              style={{ width: `${isMobile ? 85 : 100 / cardsPerView}%` }}
            >
              {renderItem(item)}
            </div>
            
          ))}
        </div>
        {!isMobile && (
          <>
            <Button
              onPress={prevSlide}
              isDisabled={!canGoPrev}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md min-w-10 h-10 ${isHovering ? "opacity-100" : "opacity-0"}`}
              size="sm"
            >
              ←
            </Button>
            <Button
              onPress={nextSlide}
              isDisabled={!canGoNext && data.length > cardsPerView}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md min-w-10 h-10 ${isHovering ? "opacity-100" : "opacity-0"}`}
              size="sm"
            >
              →
            </Button>
          </>
        )}
      </div>
    </section>
  );
};
