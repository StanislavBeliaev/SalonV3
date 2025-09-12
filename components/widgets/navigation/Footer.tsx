import Link from "next/link";

const footerLinksCategories = [
  {
    label: "Покрытие ногтей",
    href: "/services",
  },
  {
    label: "Укладка бровей ",
    href: "/salons",
  },
  {
    label: "Комплексы услуг",
    href: "/info",
  },
  {
    label: "Женская стрижка",
    href: "/contacts",
  },
  {
    label: "Депиляция воском",
    href: "/privacy-policy",
  },
  {
    label: "Подология",
    href: "/about",
  },
  {
    label: "Услуги",
    href: "/services",
  },
  {
    label: "Салоны",
    href: "/salons",
  },
  {
    label: "Инфо",
    href: "/info",
  },
  {
    label: "Контакты",
    href: "/contacts",
  },
  {
    label: "Политика конфиденциальности",
    href: "/privacy-policy",
  },
  {
    label: "О нас",
    href: "/about",
  },
];
const footerLinksServices = [
  {
    label: "О сервисе",
    href: "/about",
  },
  {
    label: "О нас",
    href: "/services",
  },
  {
    label: "Услуги для клиентов",
    href: "/salons",
  },
  {
    label: "Услуги для партнеров",
    href: "/info",
  },
  {
    label: "Стать партнером",
    href: "/contacts",
  },
];

export default function Footer() {
  return (
    <footer className="w-full h-full py-10 bg-gray-100">
      <div className="flex flex-col gap-4 w-full h-full max-w-[1440px] mx-auto">
        <div className="w-full h-full flex justify-between items-center">
          <div className="w-1/2 h-full">
            <p>Наведите камеру и скачайте бесплатное приложение Salon</p>
          </div>
          <div className="w-full h-full">
            <h3 className="text-black text-xl font-bold">
              Популярные подкатегории
            </h3>
            <div className="w-full h-full grid grid-cols-2 gap-2 pt-4">
              {footerLinksCategories.map((link) => (
                <Link
                  className="whitespace-nowrap"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-1/4 h-full">
            <h3 className="text-black text-xl font-bold opacity-0">О сервисе</h3>
            <div className="w-full flex flex-col items-end gap-2 pt-4">
              {footerLinksServices.map((link) => (
                <Link
                  className="whitespace-nowrap first:font-bold first:text-lg"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
