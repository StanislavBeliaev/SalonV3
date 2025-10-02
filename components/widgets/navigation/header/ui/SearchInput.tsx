import { Input } from "@heroui/react";
import { SearchIcon } from "./icons/SearchIcon";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onSearch?: (value: string) => void;
}

export const SearchInput = ({ 
  placeholder = "Type to search...",
  className = "",
  onSearch
}: SearchInputProps) => {
  return (
    <Input
      classNames={{
        base: `max-w-full sm:max-w-[25rem] h-10 ${className}`,
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder={placeholder}
      size="sm"
      startContent={<SearchIcon size={18} height={18} width={18} />}
      type="search"
      onChange={(e) => onSearch?.(e.target.value)}
    />
  );
};
