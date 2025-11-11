import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans, fontOpenSans } from "@/config/fonts";
import Header from "@/components/widgets/navigation/header/Header";
import Footer from "@/components/widgets/navigation/Footer";
import { category } from "@/api/category";
import { getCityId } from "@/utils/getCityId";
import MobileNavigation from "@/components/widgets/navigation/mobileHeader/MobileHeader";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
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
  const categoryDataPopular = await category.getCategoryPopular(cityId);
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
          <div className="relative flex flex-col h-screen">
            <Header />
            <main className="container mx-auto max-w-[1440px] flex-grow pb-16 md:pb-0">
              {children}
            </main>
            <MobileNavigation />
            <Footer servicesDataPopular={categoryDataPopular} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
