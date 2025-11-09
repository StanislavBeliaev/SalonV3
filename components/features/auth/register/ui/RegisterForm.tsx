"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/components/shared/stores/authStore";

interface RegisterFormProps {
  className?: string;
}

interface RegistrationFormState {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  cityId: string;
}

const initialState: RegistrationFormState = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirm: "",
  cityId: "",
};

export function RegisterForm({ className = "" }: RegisterFormProps = {}) {
  const [formState, setFormState] = useState<RegistrationFormState>(initialState);
  const [smsStep, setSmsStep] = useState(false);
  const [smsCode, setSmsCode] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const register = useAuthStore((state) => state.register);
  const confirmSms = useAuthStore((state) => state.confirmSms);
  const pendingVerification = useAuthStore((state) => state.pendingVerification);
  const status = useAuthStore((state) => state.status);
  const storeError = useAuthStore((state) => state.error);
  const resetError = useAuthStore((state) => state.resetError);
  const clearPendingSms = useAuthStore((state) => state.clearPendingSms);

  const router = useRouter();

  const isLoading = status === "loading";
  const error = useMemo(() => localError ?? storeError, [localError, storeError]);

  const handleChange =
    (field: keyof RegistrationFormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetError();
    setLocalError(null);

    if (!smsStep) {
      if (!formState.email.trim()) {
        setLocalError("Укажите email");
        return;
      }
      if (!formState.cityId.trim()) {
        setLocalError("Укажите город");
        return;
      }
      const cityIdNumber = Number(formState.cityId.trim());
      if (Number.isNaN(cityIdNumber)) {
        setLocalError("Введите корректный ID города");
        return;
      }
      if (!formState.phone.trim()) {
        setLocalError("Укажите номер телефона");
        return;
      }
      if (!formState.password.trim() || !formState.passwordConfirm.trim()) {
        setLocalError("Введите пароль и повторите его");
        return;
      }
      if (formState.password !== formState.passwordConfirm) {
        setLocalError("Пароли не совпадают");
        return;
      }

      try {
        const rawPhone = formState.phone.trim().replace(/\s+/g, "");
        const normalizedPhone = rawPhone.startsWith("+") ? rawPhone : `+${rawPhone}`;

        const { smsRequired } = await register({
          email: formState.email.trim(),
          password: formState.password,
          passwordConfirm: formState.passwordConfirm,
          phone: normalizedPhone,
          name: formState.name.trim(),
          surname: formState.surname.trim(),
          country: "ru",
          city: cityIdNumber,
        });

        if (smsRequired) {
          setSmsStep(true);
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error(err);
      }
      return;
    }

    if (!smsCode.trim()) {
      setLocalError("Введите код из СМС");
      return;
    }

    if (!pendingVerification?.value) {
      setLocalError("Не удалось определить контакт для подтверждения");
      return;
    }

    try {
      await confirmSms({
        phone: pendingVerification.value,
        smsCode: smsCode.trim(),
      });
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex h-full w-full flex-col justify-center gap-4 rounded-none border-none bg-content1 px-4 py-6 shadow-none sm:mx-auto sm:max-w-2xl sm:justify-start sm:rounded-2xl sm:border sm:border-default-200 sm:px-8 sm:py-10 sm:shadow-medium ${className}`}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-foreground">
          {smsStep ? "Подтверждение" : "Регистрация"}
        </h2>
        <p className="text-sm text-default-500">
          {smsStep
            ? "Введите код из СМС, чтобы завершить регистрацию."
            : "Заполните форму, чтобы создать аккаунт клиента."}
        </p>
      </div>

      {!smsStep ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Имя"
              variant="bordered"
              value={formState.name}
              onChange={handleChange("name")}
              autoComplete="given-name"
            />
            <Input
              label="Фамилия"
              variant="bordered"
              value={formState.surname}
              onChange={handleChange("surname")}
              autoComplete="family-name"
            />
          </div>
          <Input
            label="Email"
            variant="bordered"
            value={formState.email}
            onChange={handleChange("email")}
            autoComplete="email"
          />
          <Input
            label="ID города"
            variant="bordered"
            value={formState.cityId}
            onChange={handleChange("cityId")}
            inputMode="numeric"
            placeholder="Например, 1"
          />
          <Input
            label="Телефон"
            variant="bordered"
            value={formState.phone}
            onChange={handleChange("phone")}
            autoComplete="tel"
            placeholder="+7 900 000 00 00"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Пароль"
              type="password"
              variant="bordered"
              value={formState.password}
              onChange={handleChange("password")}
              autoComplete="new-password"
            />
            <Input
              label="Повторите пароль"
              type="password"
              variant="bordered"
              value={formState.passwordConfirm}
              onChange={handleChange("passwordConfirm")}
              autoComplete="new-password"
            />
          </div>
        </>
      ) : (
        <>
          <Input
            label="Введите код"
            variant="bordered"
            value={smsCode}
            onChange={(event) => setSmsCode(event.target.value)}
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
          />
          <p className="text-sm text-default-500">
            Код отправлен на{" "}
            {pendingVerification?.channel === "mail"
              ? "email"
              : "телефон"}{" "}
            {pendingVerification?.value ?? "указанный контакт"}.
          </p>
          <Button
            type="button"
            variant="light"
            onClick={() => {
              setSmsStep(false);
              setSmsCode("");
              clearPendingSms();
            }}
          >
            Изменить данные
          </Button>
        </>
      )}

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
        data-testid={smsStep ? "register-confirm" : "register-submit"}
      >
        {smsStep ? "Подтвердить" : "Зарегистрироваться"}
      </Button>

      <p className="text-center text-sm text-default-500">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="text-primary">
          Войдите
        </Link>
      </p>
    </form>
  );
}

