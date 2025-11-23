"use client";
import { Salon } from "@/api/salons";
import SalonCard from "@/components/entities/cards/SalonCard";

interface SalonsGridProps {
    salons: Salon[];
}

export const SalonsGrid = ({ salons }: SalonsGridProps) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                {salons.map((salon) => (
                    <div key={salon.id}>
                        <SalonCard salon={salon} />
                    </div>
                ))}
            </div>
        </div>
    );
};

