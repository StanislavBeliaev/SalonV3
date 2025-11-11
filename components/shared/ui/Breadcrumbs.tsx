"use client";

import { Breadcrumbs as HeroBreadcrumbs, BreadcrumbItem } from "@heroui/react";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
}

interface CustomBreadcrumbsProps {
  items: Breadcrumb[];
  className?: string;
}

export const Breadcrumbs = ({
  items,
  className = "",
}: CustomBreadcrumbsProps) => {
  return (
    <HeroBreadcrumbs
      itemClasses={{
        separator: "px-2",
      }}
      separator="/"
      className={className}
    >
      {items.map((item) => (
        <BreadcrumbItem key={item.href} href={item.href} as={Link}>
          {item.label}
        </BreadcrumbItem>
      ))}
    </HeroBreadcrumbs>
  );
};
