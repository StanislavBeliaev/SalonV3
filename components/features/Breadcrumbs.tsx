import { Breadcrumbs } from "@/components/shared/ui/Breadcrumbs";

interface BreadcrumbsProps {
  items: Array<{ label: string; href: string }>;
  className?: string;
}

export function BreadcrumbsSection({ items, className = "" }: BreadcrumbsProps) {
  return (
    <div className={`flex items-center justify-start w-full px-4 sm:px-0 ${className}`}>
      <Breadcrumbs items={items} />
    </div>
  );
}