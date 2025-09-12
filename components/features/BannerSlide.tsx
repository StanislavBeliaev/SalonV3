"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Banner {
  id: number;
  photoUri: string;
  uri: string;
}

const BannerSlider = ({ banners }: { banners: Banner[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = banners.length;
  const intervalTime = 3000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [slideCount]);

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="relative w-full overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${-currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="flex-shrink-0 w-full relative">
              <Link href={banner.uri}>
                <Image
                  src={banner.photoUri}
                  alt={`Banner ${banner.id}`}
                  height={583}
                  width={1440}
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-2">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
              currentIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
