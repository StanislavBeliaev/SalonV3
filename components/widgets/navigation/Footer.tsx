import Link from "next/link";
import QrCodeSection from "@/components/widgets/QrCodeSection";
import { Category } from "@/api/category";

const footerLinksServices = [
  { label: "О нас", href: "/about" },
  { label: "Услуги для клиентов", href: "/services" },
  { label: "Услуги для партнеров", href: "/partners" },
  { label: "Стать партнером", href: "/become-partner" },
];

const appStores = [
  { name: "App Store", icon: "🍎", href: "#" },
  { name: "Google Play", icon: "▶️", href: "#" },
  { name: "Huawei AppGallery", icon: "H", href: "#" },
  { name: "RuStore", icon: "M", href: "#" },
];

export default function Footer({
  servicesDataPopular,
  parentCategories,
  citySlug,
}: {
  servicesDataPopular: Category[];
  parentCategories: Category[];
  citySlug: string;
}) {
  return (
    <footer className="w-full bg-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex flex-col items-start">
            <QrCodeSection />
            <p className="text-gray-500 mb-4 max-w-xs">
              Наведите камеру и скачайте бесплатное приложение Salon
            </p>
            <div className="flex gap-4">
              {appStores.map((store) => (
                <Link
                  key={store.name}
                  href={store.href}
                  className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-bold hover:bg-gray-800 transition-colors"
                >
                  {store.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-full">
            <h3 className="text-black text-xl font-bold mb-4">
              Популярные подкатегории
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {servicesDataPopular.map((link) => {
                const parentCategory = parentCategories.find(cat => cat.id === link.parentId);
                const parentSlug = parentCategory?.slug || '';
                const href = citySlug && parentSlug 
                  ? `/${citySlug}/${parentSlug}?subcategoryId=${link.id}`
                  : '#';
                return (
                  <Link
                    key={link.id}
                    href={href}
                    className="md:text-base text-sm text-gray-500 hover:text-primary transition-colors md:whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <h3 className="text-black text-xl font-bold mb-4">О сервисе</h3>
            <div className="flex flex-col items-end gap-2">
              {footerLinksServices.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6 text-center">
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            Salon — сервис для онлайн-записи в салон или к мастеру, объединяющий
            лучшие возможности существующих маркетплейсов. Использование ресурса
            означает согласие с{" "}
            <Link href="/user-agreement" className="text-primary underline">
              Пользовательским соглашением
            </Link>{" "}
            и{" "}
            <Link href="/privacy-policy" className="text-primary underline">
              Политикой обработки персональных данных
            </Link>
            .
          </p>
          <p className="text-sm text-gray-500">
            Если у вас есть вопросы, напишите нам на{" "}
            <Link
              href="mailto:support@salonpro.online"
              className="text-primary hover:underline"
            >
              support@salonpro.online
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
