import {
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import Link from "next/link";
import { ChevronDown } from "./icons/ChevronDown";
import { usePathname } from "next/navigation";

interface NavigationItem {
  label: string;
  href?: string;
  children?: NavigationItem[];
}

interface NavigationMenuProps {
  items: NavigationItem[];
  className?: string;
}

export const NavigationMenu = ({ items, className = "" }: NavigationMenuProps) => {
  const pathname = usePathname();
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} height={16} width={16} />,
  };

  const isActive = (item: NavigationItem) => {
    if (!item.href) return false;
    return pathname === item.href || pathname.startsWith(item.href + '/');
  };

  const renderNavigationItem = (item: NavigationItem, index: number) => {
    if (item.children && item.children.length > 0) {
      return (
        <NavbarItem key={index}>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={icons.chevron}
                  radius="sm"
                  variant="light"
                >
                  <p className={`text-medium navbarBtn mt-[2px] ${isActive(item) ? "is-active" : ""}`}>{item.label}</p>
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label={`${item.label} features`}
              itemClasses={{
                base: "gap-4",
              }}
            >
              {item.children.map((child, childIndex) => (
                <DropdownItem
                  key={childIndex}
                  description={child.href ? undefined : "Feature description"}
                >
                  {child.href ? (
                    <Link href={child.href}>{child.label}</Link>
                  ) : (
                    child.label
                  )}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      );
    }

    return (
      <NavbarItem key={index}>
        <Link href={item.href || "#"} className={`navbarBtn ${isActive(item) ? "is-active" : ""}`}>
          {item.label}
        </Link>
      </NavbarItem>
    );
  };

  return (
    <NavbarContent className={`hidden sm:flex gap-3 ${className}`}>
      {items.map((item, index) => renderNavigationItem(item, index))}
    </NavbarContent>
  );
};
