"use client";
import { CarouselList } from "@/components/widgets/Carousel";
import ServiceCard from "@/components/entities/cards/ServiceCard";
import { Service } from "@/api/service";

export default function ServiceCarouselList({servicesData, title}: {servicesData: Service[], title: string}) {

  return (
    <CarouselList
      title={title}
      linkTo="#"
      data={servicesData}
      cardsPerPage={3}
      renderItem={(service) => (
        <ServiceCard service={service} />
      )}
    />
  );
}