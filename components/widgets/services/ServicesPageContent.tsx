"use client";
import { Category } from "@/api/category";
import { Salon } from "@/api/salons";
import { Service } from "@/api/service";
import { BreadcrumbsSection } from "@/components/features/Breadcrumbs";
import { ServicesFilter } from "@/components/features/services-filters/ui/ServicesFilter";
import { ServicesGrid } from "@/components/widgets/services/ServicesGrid";
import { ServicesPagination } from "@/components/widgets/services/ServicesPagination";
import PageTitle from "@/components/widgets/PageTitle";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";

interface ServicesPageContentProps {
  categoryData: Category[];
  servicesData: {
    content: Service[];
    totalElements: number;
    totalPages: number;
    number: number;
  };
  boundsData: {
    minPrice: number;
    maxPrice: number;
  } | null;
  salonsData: Salon[];
  subCategoryName: string;
  breadcrumbs: Array<{ label: string; href: string }>;
}

export function ServicesPageContent({
  categoryData,
  servicesData,
  boundsData,
  salonsData,
  subCategoryName,
  breadcrumbs,
}: ServicesPageContentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="pageContainer">
      <BreadcrumbsSection items={breadcrumbs} />
      <PageTitle
        title={subCategoryName}
        buttonType="map"
        buttonText="Смотреть в режиме карты"
        totalServices={servicesData.totalElements}
        showFilterButton={true}
        onFilterClick={onOpen}
      />
      <div className="flex justify-between w-full gap-4">
        <aside className="w-1/4 lg:block hidden">
          <ServicesFilter
            categories={categoryData}
            bounds={boundsData}
            salons={salonsData}
          />
        </aside>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1">
            <ServicesGrid services={servicesData.content} />
          </div>
          {servicesData.totalPages > 1 && (
            <div className="mt-auto">
              <ServicesPagination
                currentPage={servicesData.number + 1}
                totalPages={servicesData.totalPages}
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
                <ServicesFilter
                  categories={categoryData}
                  bounds={boundsData}
                  salons={salonsData}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
