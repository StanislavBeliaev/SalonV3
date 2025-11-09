"use client";

import { FormEvent, useMemo, useState } from "react";
import { Button, Input, Tab, Tabs } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { useAuthStore } from "@/components/shared/stores/authStore";

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
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const isLoading = status === "loading";
  const error = useMemo(() => localError ?? storeError, [localError, storeError]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!identifier.trim()) {
      setLocalError(
        mode === "mail" ? "Введите адрес электронной почты" : "Введите номер телефона",
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
      const rawIdentifier = identifier.trim();
      const sanitizedIdentifier =
        mode === "phone" ? rawIdentifier.replace(/\s+/g, "") : rawIdentifier;

      const normalizedIdentifier =
        mode === "phone" && !sanitizedIdentifier.startsWith("+")
          ? `+${sanitizedIdentifier}`
          : sanitizedIdentifier;

      await login(
        mode === "mail"
          ? { mail: normalizedIdentifier, password }
          : { phone: normalizedIdentifier, password },
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
        selectedKey={mode}
        onSelectionChange={(key) => setMode(key as LoginMode)}
        className="w-full"
      >
        {loginModeTabs.map((tab) => (
          <Tab key={tab.key} title={tab.title} />
        ))}
      </Tabs>

      <Input
        label={mode === "mail" ? "Email" : "Телефон"}
        variant="bordered"
        value={identifier}
        onChange={(event) => setIdentifier(event.target.value)}
        placeholder={mode === "mail" ? "user@example.com" : "+7 900 000 00 00"}
        autoComplete={mode === "mail" ? "email" : "tel"}
        data-testid="login-identifier"
      />

      <Input
        label="Пароль"
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

