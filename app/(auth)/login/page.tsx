import type { Metadata } from "next";

import { LoginForm } from "@/components/features/auth/login";

export const metadata: Metadata = {
  title: "Авторизация",
};

export default function LoginPage() {
  return (
    <section className="flex min-h-full w-full">
      <div className="flex w-full flex-1 items-stretch px-0 py-6 sm:px-6 sm:py-10 lg:px-12">
      <LoginForm className="sm:h-auto sm:justify-center" />
      </div>
    </section>
  );
}

