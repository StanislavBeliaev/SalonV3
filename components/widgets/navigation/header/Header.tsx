"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import {
  Logo,
  LocationDisplay,
  SearchInput,
  UserProfile,
  NavigationMenu,
} from "./ui";
import Link from "next/link";

export default function NavbarComponent() {
  const navigationItems = [
    { label: "Услуги", href: "#" },
    { label: "Салоны", href: "#" },
    {
      label: "Инфо",
      children: [
        {
          label: "Autoscaling",
          description: "ACME scales apps based on demand and load",
        },
        {
          label: "Usage Metrics",
          description: "Real-time metrics to debug issues",
        },
        {
          label: "Production Ready",
          description: "ACME runs on ACME, join us at web scale",
        },
        {
          label: "+99% Uptime",
          description: "High availability and uptime guarantees",
        },
        {
          label: "+Supreme Support",
          description: "Support team ready to respond",
        },
      ],
    },
    { label: "Партнерство", href: "#" },
  ];

  const handleSearch = (value: string) => {
    console.log("Search:", value);
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
  };

  const handleLogoutClick = () => {
    console.log("Logout clicked");
  };

  return (
    <Navbar isBordered maxWidth="full">
      <div className="flex justify-between items-center w-[1440px] mx-auto">
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <Logo />
            <LocationDisplay />
          </NavbarBrand>
          <NavigationMenu items={navigationItems} />
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <SearchInput onSearch={handleSearch} />
          <UserProfile
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
            onLogoutClick={handleLogoutClick}
          />
          <NavbarItem>
            <Button 
              color="primary"
              radius="full" 
              className="hover:cursor-pointer hover:!bg-primary hover:!opacity-100"
            >
              Войти
            </Button>
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
