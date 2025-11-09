"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Button, Input, Tab, Tabs } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { useAuthStore } from "@/components/shared/stores/authStore";
import { PhoneNumberInput } from "@/components/shared/ui/phone-number-input";

type LoginMode = "mail" | "phone";

interface LoginFormProps {
  className?: string;
}

const loginModeTabs: Array<{ key: LoginMode; title: string }> = [
  { key: "mail", title: "Email" },
  { key: "phone", title: "Телефон" },
];

export function LoginForm({ className = "" }: LoginFormProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const status = useAuthStore((state) => state.status);
  const storeError = useAuthStore((state) => state.error);
  const resetError = useAuthStore((state) => state.resetError);

  const [mode, setMode] = useState<LoginMode>("mail");
  const [identifier, setIdentifier] = useState("");
  const [countryId, setCountryId] = useState<string>("ru");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const isLoading = status === "loading";
  const error = useMemo(
    () => localError ?? storeError,
    [localError, storeError]
  );

  useEffect(() => {
    setIdentifier("");
    setLocalError(null);
    resetError();
    if (mode === "phone") {
      setCountryId("ru");
    }
  }, [mode, resetError]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier) {
      setLocalError(
        mode === "mail"
          ? "Введите адрес электронной почты"
          : "Введите номер телефона"
      );
      return;
    }
    if (!password.trim()) {
      setLocalError("Введите пароль");
      return;
    }

    setLocalError(null);
    resetError();

    try {
      await login(
        mode === "mail"
          ? { mail: trimmedIdentifier, password }
          : { phone: trimmedIdentifier, password }
      );

      const returnPath = searchParams?.get("returnPath");
      router.push(returnPath || "/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex h-full w-full flex-col justify-center gap-4 rounded-none border-none bg-content1 px-4 py-6 shadow-none sm:mx-auto sm:max-w-md sm:justify-start sm:rounded-2xl sm:border sm:border-default-200 sm:px-8 sm:py-10 sm:shadow-medium ${className}`}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-foreground">Авторизация</h2>
        <p className="text-sm text-default-500">
          Введите данные, чтобы войти в личный кабинет.
        </p>
      </div>
        <Tabs
          size="sm"
          radius="full"
          color="primary"
          classNames={{
            tabList: "bg-white border-default-200 border-1 rounded-full w-[375px] mx-auto flex justify-center h-[46px]",
            tab: "text-fs16 font-600 h-[36px]",
          }}
          selectedKey={mode}
          onSelectionChange={(key) => setMode(key as LoginMode)}
          className="w-full"
        >
          {loginModeTabs.map((tab) => (
            <Tab key={tab.key} title={tab.title} />
          ))}
        </Tabs>
      <div className="relative min-h-[76px]">
        {mode === "mail" ? (
          <Input
            label="Email"
            labelPlacement="outside"
            variant="bordered"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="user@example.com"
            autoComplete="email"
            data-testid="login-identifier"
            className="w-full"
          />
        ) : (
          <PhoneNumberInput
            label="Телефон"
            value={identifier}
            defaultCountryId={countryId}
            onChange={setIdentifier}
            onCountryChange={(country) => {
              if (country?.id) {
                setCountryId(country.id);
              }
            }}
            required
            className="w-full"
          />
        )}
      </div>

      <Input
        label="Пароль"
        labelPlacement="outside"
        placeholder="Введите пароль"
        type="password"
        variant="bordered"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="current-password"
        data-testid="login-password"
      />

      {error ? (
        <div className="rounded-medium border border-danger-200 bg-danger-50 px-3 py-2 text-sm text-danger-600">
          {error}
        </div>
      ) : null}

      <Button
        type="submit"
        color="primary"
        variant="solid"
        isLoading={isLoading}
        data-testid="login-submit"
      >
        Войти
      </Button>

      <p className="text-center text-sm text-default-500">
        Нет аккаунта?{" "}
        <Link href="/register" className="text-primary">
          Зарегистрируйтесь
        </Link>
      </p>
    </form>
  );
}
