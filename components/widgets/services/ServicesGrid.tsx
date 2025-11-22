import { Service } from "@/api/service";
import ServiceCard from "@/components/entities/cards/ServiceCard";

interface ServicesGridProps {
    services: Service[];
}

export const ServicesGrid = ({ services }: ServicesGridProps) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                 {services.map((item: Service) => (
                    <div key={item.serviceId}>
                        <ServiceCard service={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};
