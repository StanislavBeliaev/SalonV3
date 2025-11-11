"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconSvgProps } from "@/types";

interface NavigationButton {
  name: string;
  icon: React.ReactNode;
  path: string;
  activeFor: string[];
}

const HomeIcon = ({ size = 24, ...props }: IconSvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20.5 19.0263V12.3819C20.5 11.8465 20.3958 11.3167 20.1936 10.8247C19.9915 10.3327 19.6957 9.88883 19.3242 9.52007L13.3014 3.54277C12.9504 3.1943 12.4847 3 12.0005 3C11.5163 3 11.0505 3.1943 10.6995 3.54277L4.67583 9.52007C4.30434 9.88883 4.00852 10.3327 3.80638 10.8247C3.60424 11.3167 3.5 11.8465 3.5 12.3819V19.0263C3.5 19.5498 3.69901 20.0518 4.05324 20.4219C4.40748 20.7921 4.88792 21 5.38889 21H8C8.55229 21 9 20.5523 9 20V16C9 14.8954 9.89543 14 11 14H12H13C14.1046 14 15 14.8954 15 16V20C15 20.5523 15.4477 21 16 21H18.6111C19.1121 21 19.5925 20.7921 19.9468 20.4219C20.301 20.0518 20.5 19.5498 20.5 19.0263Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ServicesIcon = ({ size = 24, ...props }: IconSvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M14.121 14.121L19 19M12 12L19 4.99999M12 12L9.12102 14.879M12 12L9.12102 9.12099M9.12102 14.879C8.55837 14.3163 7.79524 14.0002 6.99952 14.0002C6.2038 14.0002 5.44068 14.3163 4.87802 14.879C4.31536 15.4416 3.99927 16.2048 3.99927 17.0005C3.99927 17.7962 4.31536 18.5593 4.87802 19.122C5.44068 19.6846 6.2038 20.0007 6.99952 20.0007C7.79524 20.0007 8.55837 19.6846 9.12102 19.122C9.68368 18.5593 9.99978 17.7962 9.99978 17.0005C9.99978 16.2048 9.68368 15.4416 9.12102 14.879ZM9.12102 9.12099C9.68368 8.55833 9.99978 7.79521 9.99978 6.99949C9.99978 6.20377 9.68368 5.44065 9.12102 4.87799C8.55837 4.31533 7.79524 3.99924 6.99952 3.99924C6.2038 3.99924 5.44068 4.31533 4.87802 4.87799C4.31536 5.44065 3.99927 6.20377 3.99927 6.99949C3.99927 7.79521 4.31536 8.55833 4.87802 9.12099C5.44068 9.68365 6.2038 9.99975 6.99952 9.99975C7.79524 9.99975 8.55837 9.68365 9.12102 9.12099Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SalonsIcon = ({ size = 24, ...props }: IconSvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="3" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="3" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    <rect x="12" y="4" width="10" height="2" rx="1" fill="currentColor"/>
    <rect x="12" y="14" width="10" height="2" rx="1" fill="currentColor"/>
    <rect x="12" y="8" width="6" height="2" rx="1" fill="currentColor"/>
    <rect x="12" y="18" width="6" height="2" rx="1" fill="currentColor"/>
  </svg>
);

const UserIcon = ({ size = 24, ...props }: IconSvgProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="6.25" r="3.75" stroke="currentColor" strokeWidth="2"/>
    <path d="M19.502 17.75C19.502 18.5365 18.9201 19.4558 17.5241 20.2358C16.1607 20.9975 14.2096 21.5 12 21.5C9.79038 21.5 7.83932 20.9975 6.47595 20.2358C5.07986 19.4558 4.49805 18.5365 4.49805 17.75C4.49805 16.9635 5.07986 16.0442 6.47595 15.2642C7.83932 14.5025 9.79038 14 12 14C14.2096 14 16.1607 14.5025 17.5241 15.2642C18.9201 16.0442 19.502 16.9635 19.502 17.75Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export default function MobileNavigation() {
  const pathname = usePathname();

  const buttons: NavigationButton[] = [
    {
      name: 'Главная',
      icon: <HomeIcon />,
      path: '/',
      activeFor: ['/']
    },
    {
      name: 'Услуги',
      icon: <ServicesIcon />,
      path: '/category',
      activeFor: ['/category', '/catalog', '/category']
    },
    {
      name: 'Салоны',
      icon: <SalonsIcon />,
      path: '/salons',
      activeFor: ['/salons', '/salon']
    },
    {
      name: 'Войти',
      icon: <UserIcon />,
      path: '/login',
      activeFor: ['/login', '/register']
    }
  ];

  const isActive = (button: NavigationButton): boolean => {
    return button.activeFor.some(path => pathname === path || pathname.startsWith(path + '/'));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0px_-1px_0px_#E4E4E4] flex items-center justify-around z-39 py-4 md:hidden">
      {buttons.map((button) => {
        const active = isActive(button);
        return (
          <Link
            key={button.name}
            href={button.path}
            className="flex flex-col items-center p-2 bg-none border-none cursor-pointer"
          >
            <div className={`h-6 ${active ? 'text-primary' : 'text-[#9FA1A5]'}`}>
              {button.icon}
            </div>
            <div className={`font-semibold text-xs leading-[14px] ${
              active ? 'text-primary' : 'text-[#9FA1A5]'
            }`}>
              {button.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
