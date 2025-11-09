import type { Metadata } from "next";

import { RegisterForm } from "@/components/features/auth/register";

export const metadata: Metadata = {
  title: "Регистрация",
};

export default function RegisterPage() {
  return (
    <section className="flex min-h-full w-full">
      <div className="flex w-full flex-1 items-stretch px-0 py-6 sm:px-6 sm:py-10 lg:px-12">
        <RegisterForm className="sm:h-auto sm:justify-center" />
      </div>
    </section>
  );
}

