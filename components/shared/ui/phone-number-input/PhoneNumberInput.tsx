"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

import { geo, type Country } from "@/api/geo";

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  onCountryChange?: (country: Country | null) => void;
  defaultCountryId?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string | null;
  className?: string;
  disabled?: boolean;
}

const PLACEHOLDER_CHARS = new Set(["#", "0", "9", "X", "x", "_"]);

const sanitizeDigits = (value: string) => value.replace(/\D/g, "");

const countMaskPlaceholders = (mask?: string | null) => {
  if (!mask) {
    return 0;
  }
  return mask.split("").reduce((acc, char) => {
    if (PLACEHOLDER_CHARS.has(char)) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

const formatWithMask = (digits: string, mask: string): string => {
  if (!mask || !digits) {
    return digits;
  }

  let digitIndex = 0;
  let result = "";

  for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
    const maskChar = mask[i];
    if (PLACEHOLDER_CHARS.has(maskChar)) {
      result += digits[digitIndex] || "";
      digitIndex++;
    } else {
      result += maskChar;
    }
  }

  return result;
};

export function PhoneNumberInput({
  value,
  onChange,
  onCountryChange,
  defaultCountryId,
  label,
  placeholder,
  required,
  error,
  className,
  disabled,
}: PhoneNumberInputProps) {
  const inputId = useId();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const isUserInput = useRef(false);
  const lastProcessedValue = useRef<string>("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(
    defaultCountryId ?? null,
  );
  const [localDigits, setLocalDigits] = useState<string>("");

  const selectedCountry = useMemo(() => {
    if (!selectedCountryId) {
      return null;
    }
    return countries.find((country) => country.id === selectedCountryId) ?? null;
  }, [countries, selectedCountryId]);

  const digitsLimit = useMemo(
    () => countMaskPlaceholders(selectedCountry?.mask),
    [selectedCountry?.mask],
  );

  const placeholderMask = useMemo(() => {
    if (selectedCountry?.mask) {
      return selectedCountry.mask;
    }
    return placeholder ?? "";
  }, [placeholder, selectedCountry?.mask]);

  const formattedValue = useMemo(() => {
    if (!localDigits || !selectedCountry?.mask) {
      return localDigits;
    }
    return formatWithMask(localDigits, selectedCountry.mask);
  }, [localDigits, selectedCountry?.mask]);

  const emitChange = useCallback(
    (digits: string, country: Country | null) => {
      const onlyDigits = sanitizeDigits(digits);
      if (!country || onlyDigits.length === 0) {
        onChange(onlyDigits);
        return;
      }
      onChange(`+${country.dialCode}${onlyDigits}`);
    },
    [onChange],
  );

  const applyDigitsLimit = useCallback(
    (digits: string) => {
      const limited = digitsLimit > 0 ? digits.slice(0, digitsLimit) : digits;
      return limited;
    },
    [digitsLimit],
  );

  useEffect(() => {
    let isMounted = true;
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await geo.getCountry();
        if (!isMounted) return;
        setCountries(response);

        setSelectedCountryId((prev) => {
          if (prev && response.some((country) => country.id === prev)) {
            return prev;
          }
          if (defaultCountryId && response.some((country) => country.id === defaultCountryId)) {
            return defaultCountryId;
          }
          if (response.length > 0) {
            return response[0].id;
          }
          return prev;
        });
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCountries();

    return () => {
      isMounted = false;
    };
  }, [defaultCountryId]);

  useEffect(() => {
    if (isUserInput.current) {
      isUserInput.current = false;
      return;
    }

    if (value === lastProcessedValue.current) {
      return;
    }

    lastProcessedValue.current = value;

    if (!value) {
      setLocalDigits("");
      return;
    }

    const digits = sanitizeDigits(value);
    if (digits.length === 0) {
      setLocalDigits("");
      return;
    }

    if (value.startsWith("+")) {
      const sortedCountries = [...countries].sort(
        (a, b) => b.dialCode.length - a.dialCode.length,
      );
      const matchedCountry =
        sortedCountries.find((country) => digits.startsWith(country.dialCode)) ?? null;

      if (matchedCountry) {
        const rest = digits.slice(matchedCountry.dialCode.length);
        setLocalDigits(applyDigitsLimit(rest));
        setSelectedCountryId((prev) => prev ?? matchedCountry.id);
        return;
      }
    }

    if (selectedCountry && digits.startsWith(selectedCountry.dialCode)) {
      const rest = digits.slice(selectedCountry.dialCode.length);
      setLocalDigits(applyDigitsLimit(rest));
      return;
    }

    const sortedCountries = [...countries].sort(
      (a, b) => b.dialCode.length - a.dialCode.length,
    );
    const matchedCountry =
      sortedCountries.find((country) => digits.startsWith(country.dialCode)) ?? null;

    if (matchedCountry) {
      const rest = digits.slice(matchedCountry.dialCode.length);
      setLocalDigits(applyDigitsLimit(rest));
      setSelectedCountryId((prev) => prev ?? matchedCountry.id);
    } else {
      setLocalDigits(applyDigitsLimit(digits));
    }
  }, [applyDigitsLimit, countries, value, selectedCountry]);

  useEffect(() => {
    onCountryChange?.(selectedCountry ?? null);
  }, [onCountryChange, selectedCountry]);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const digits = sanitizeDigits(inputValue);
    const limited = applyDigitsLimit(digits);
    setLocalDigits(limited);
    isUserInput.current = true;
    const newValue = selectedCountry ? `+${selectedCountry.dialCode}${limited}` : limited;
    lastProcessedValue.current = newValue;
    emitChange(limited, selectedCountry);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountryId(country.id);
    setOpen(false);
    const limitedDigits = applyDigitsLimit(localDigits);
    setLocalDigits(limitedDigits);
    const newValue = `+${country.dialCode}${limitedDigits}`;
    lastProcessedValue.current = newValue;
    emitChange(limitedDigits, country);
    onCountryChange?.(country);
  };

  const displayedCode = selectedCountry ? `+${selectedCountry.dialCode}` : "+";

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {label ? (
        <label
          htmlFor={inputId}
          className="text-fs14 font-400"
        >
          {label}
        </label>
      ) : null}

      <div
        className={clsx(
          "relative flex items-stretch overflow-visible rounded-2xl border border-default-200 bg-background transition focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
          {
            "opacity-60": disabled,
          },
        )}
        style={{ zIndex: open ? 100 : "auto" }}
      >
        <div
          ref={dropdownRef}
          className="relative z-[100] flex items-center border-r border-default-200 bg-default-100 rounded-l-2xl"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('[data-dropdown-menu]')) {
              return;
            }
            if (!disabled && !loading && countries.length > 0) {
              setOpen((prev) => !prev);
            }
          }}
        >
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 text-fs14 text-default-700 outline-none focus-visible:ring-2 focus-visible:ring-primary"
            disabled={disabled || loading || countries.length === 0}
          >
            {selectedCountry?.flagUrl ? (
              <img
                src={selectedCountry.flagUrl}
                alt={selectedCountry.name}
                className="h-5 w-5 rounded-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="h-5 w-5 rounded-full bg-default-200" />
            )}
            <span>{displayedCode}</span>
            <span className="text-fs14 text-default-500">▼</span>
          </button>

          {open ? (
            <div
              data-dropdown-menu
              className="absolute left-0 top-full z-[9999] mt-1 max-h-60 min-w-[180px] overflow-y-auto rounded-2xl border border-default-200 bg-content1 shadow-medium"
              style={{ position: "absolute", zIndex: 9999 }}
            >
              {loading ? (
                <div className="px-3 py-2 text-fs14 text-default-500">Загрузка...</div>
              ) : null}
              {!loading && countries.length === 0 ? (
                <div className="px-3 py-2 text-fs14 text-default-500">Нет данных</div>
              ) : null}
              {!loading &&
                countries.map((country) => (
                  <button
                    key={country.id}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={clsx(
                      "flex w-full items-center gap-2 px-3 py-2 text-left text-fs14 transition hover:bg-default-100",
                      {
                        "bg-default-100": country.id === selectedCountry?.id,
                      },
                    )}
                  >
                    {country.flagUrl ? (
                      <img
                        src={country.flagUrl}
                        alt={country.name}
                        className="h-5 w-5 flex-shrink-0 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="h-5 w-5 flex-shrink-0 rounded-full bg-default-200" />
                    )}
                    <span className="font-500 text-default-700">{`+${country.dialCode}`}</span>
                    <span className="truncate text-default-500">{country.name}</span>
                  </button>
                ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 items-center px-4">
          <input
            id={inputId}
            type="tel"
            value={formattedValue}
            onChange={handleInputChange}
            disabled={disabled}
            required={required}
            className="w-full border-none bg-transparent text-fs16 outline-none focus:outline-none"
            placeholder={placeholderMask}
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {selectedCountry && localDigits ? (
          <span className="text-fs14 text-default-400">
            Полный номер: +{selectedCountry.dialCode}
            {localDigits}
          </span>
        ) : null}
        {error ? <span className="text-fs14 text-danger-500">{error}</span> : null}
      </div>
    </div>
  );
}

