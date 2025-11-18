"use client";
import {Select, SelectItem} from "@heroui/react";

export interface SelectOption {
  key: string;
  label: string;
}

export interface SelectComponentProps {
  options: SelectOption[];
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onSelectionChange?: (key: string) => void;
}

export default function SelectComponent({ 
  options, 
  defaultValue,
  label,
  placeholder = "Выберите опцию",
  className = "max-w-xs",
  onSelectionChange
}: SelectComponentProps) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select 
        className={className} 
        label={label}
        size="sm"
        radius="full"
        placeholder={placeholder}
        defaultSelectedKeys={defaultValue ? [defaultValue] : undefined}
        onSelectionChange={(keys) => {
          const selectedKey = Array.from(keys)[0] as string;
          onSelectionChange?.(selectedKey);
        }}
        classNames={{
          trigger: "border-1 border-gray-300 rounded-full bg-white"
        }}
      >
        {options.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
