"use client";
import { Category } from "@/api/category";
import { Salon, SalonsResponse } from "@/api/salons";
import { BreadcrumbsSection } from "@/components/features/Breadcrumbs";
import { SalonsFilter } from "@/components/features/salons-filters/ui/SalonsFilter";
import { SalonsGrid } from "@/components/widgets/salons/SalonsGrid";
import { SalonsPagination } from "@/components/widgets/salons/SalonsPagination";
import PageTitle from "@/components/widgets/PageTitle";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useState } from "react";

interface SalonsPageContentProps {
  categoriesData: Category[];
  salonsData: SalonsResponse;
  breadcrumbs: Array<{ label: string; href: string }>;
}

export function SalonsPageContent({
  categoriesData,
  salonsData,
  breadcrumbs,
}: SalonsPageContentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Скелетон пока компонент не смонтирован на клиенте
  if (!isMounted) {
    return (
      <div className="pageContainer min-h-screen">
        <div className="animate-pulse w-full">
          {/* Скелетон для breadcrumbs */}
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          
          {/* Скелетон для заголовка */}
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          
          <div className="flex justify-between w-full gap-4">
            {/* Скелетон для фильтра */}
            <aside className="w-1/4 lg:block hidden">
              <div className="h-96 bg-gray-200 rounded"></div>
            </aside>
            
            {/* Скелетон для контента */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pageContainer min-h-screen">
      <BreadcrumbsSection items={breadcrumbs} />
      <PageTitle
        title="Салоны"
        buttonType="map"
        buttonText="Смотреть в режиме карты"
        totalServices={salonsData.totalElements}
        showFilterButton={true}
        onFilterClick={onOpen}
      />
      <div className="flex justify-between w-full gap-4">
        <aside className="w-1/4 lg:block hidden">
          <SalonsFilter categories={categoriesData} />
        </aside>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1">
            <SalonsGrid salons={salonsData.content} />
          </div>
          {salonsData.totalPages > 1 && (
            <div className="mt-auto">
              <SalonsPagination
                currentPage={salonsData.number + 1}
                totalPages={salonsData.totalPages}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom"
        size="full"
        hideCloseButton
        classNames={{
          base: "lg:hidden h-screen max-h-screen",
          wrapper: "lg:hidden",
          backdrop: "lg:hidden",
        }}
        scrollBehavior="inside"
      >
        <ModalContent className="h-full max-h-full flex flex-col">
          {(onClose) => (
            <>
              <ModalHeader className="px-6 pt-6 pb-2 flex items-center justify-between flex-shrink-0">
                <h2 className="text-2xl font-semibold">Фильтры</h2>
                <Button
                  isIconOnly
                  variant="light"
                  onPress={onClose}
                  className="min-w-0 w-8 h-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </ModalHeader>
              <ModalBody className="px-6 pb-6 flex-1 overflow-y-auto">
                <SalonsFilter categories={categoriesData} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}