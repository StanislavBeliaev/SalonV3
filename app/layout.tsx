import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans, fontOpenSans } from "@/config/fonts";
import Header from "@/components/widgets/navigation/header/Header";
import Footer from "@/components/widgets/navigation/Footer";
import { category } from "@/api/category";
import { getCityId } from "@/components/shared/utils/getCityId";
import MobileNavigation from "@/components/widgets/navigation/mobileHeader/MobileHeader";
import { CityInitializer } from "@/components/features/CityInitializer";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cityId = await getCityId();
  const cookieStore = await cookies();
  const citySlug = cookieStore.get('city_slug')?.value || cookieStore.get('slug')?.value || '';
  const [categoryDataPopular, parentCategories] = await Promise.all([
    category.getCategoryPopular(cityId),
    category.getCategory({ level: "0", cityId: cityId.toString() }),
  ]);
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-open-sans antialiased",
          fontSans.variable,
          fontOpenSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <CityInitializer />
          <div className="relative flex flex-col h-screen">
            <Header />
            <main className="container mx-auto max-w-[1440px] flex-grow pb-16 md:pb-0">
              {children}
            </main>
            <MobileNavigation />
            <Footer servicesDataPopular={categoryDataPopular} parentCategories={parentCategories} citySlug={citySlug} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
