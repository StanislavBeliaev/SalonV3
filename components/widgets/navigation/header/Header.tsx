"use client";
import { useEffect } from "react";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import {
  Logo,
  LocationDisplay,
  SearchInput,
  UserProfile,
  NavigationMenu,
} from "./ui";
import Link from "next/link";
import { useAuthStore } from "@/components/shared/stores/authStore";

export default function NavbarComponent() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser().catch(() => null);
    console.log("user", user);
  }, [loadUser]);
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

  const handleLogoutClick = async () => {
    await logout();
  };

  return (
    <Navbar isBordered maxWidth="full">
      <div className="flex justify-between items-center w-[1440px] mx-auto">
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <LocationDisplay />
          </NavbarBrand>
          <NavigationMenu items={navigationItems} />
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <SearchInput onSearch={handleSearch} />
          {user ? (
            <UserProfile
              userName={[user.name, user.surname].filter(Boolean).join(" ") || undefined}
              userEmail={user.email}
              avatarSrc={user.smallAvatar}
              onProfileClick={handleProfileClick}
              onSettingsClick={handleSettingsClick}
              onLogoutClick={handleLogoutClick}
            />
          ) : (
            <NavbarItem className="hidden md:flex">
              <div className="flex items-center gap-3">
                <Button
                  as={Link}
                  href="/login"
                  color="default"
                  radius="full"
                  variant="bordered"
                  className="hover:cursor-pointer"
                >
                  Войти
                </Button>
                <Button
                  as={Link}
                  href="/register"
                  color="primary"
                  radius="full"
                  className="hover:cursor-pointer hover:!bg-primary hover:!opacity-100"
                >
                  Регистрация
                </Button>
              </div>
            </NavbarItem>
          )}
        </NavbarContent>
      </div>
    </Navbar>
  );
}
