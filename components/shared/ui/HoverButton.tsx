"use client";
import { Button } from "@heroui/react";
export default function HoverButton({
  buttonText,
  size = "md",
  radius = "sm",
  variant = "bordered",
  className = "",
  onClick,
}: {
  buttonText: string;
  size?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg" | "full";
  variant?:
    | "bordered"
    | "solid"
    | "ghost"
    | "light"
    | "flat"
    | "faded"
    | "shadow";
  className?: string;
  onClick: () => void;
}) {
  return (
    <Button
      size={size}
      radius={radius}
      variant={variant}
      className={`whitespace-nowrap text-fs17 hover:text-white hover:bg-primary hover:border-primary ${className}`}
      onPress={onClick}
    >
      {buttonText}
    </Button>
  );
}
