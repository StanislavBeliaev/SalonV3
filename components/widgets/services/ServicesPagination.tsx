"use client";
import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

interface ServicesPaginationProps {
    currentPage: number;
    totalPages: number;
}

export const ServicesPagination = ({ currentPage, totalPages }: ServicesPaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete("page");
        } else {
            params.set("page", (page - 1).toString());
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex justify-center mt-4">
            <Pagination
                total={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                showControls
                color="primary"
                variant="bordered"
                classNames={{
                    wrapper: "gap-2",
                    item: "border border-gray-300",
                    cursor: "border border-primary",
                    prev: "border border-gray-300",
                    next: "border border-gray-300",
                }}
            />
        </div>
    );
};

