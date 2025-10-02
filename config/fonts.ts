import { Fira_Code as FontMono, Inter as FontSans, Open_Sans as FontOpenSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontOpenSans = FontOpenSans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
