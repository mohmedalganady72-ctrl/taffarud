import type { Metadata } from "next";
import { Noto_Kufi_Arabic, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartProvider";

const sans = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

const display = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "تَفرّد | حقيبة تشبهك", template: "%s | تَفرّد" },
  description: "صمّمي حقيبتك بتفاصيلك، أو اختاري من تشكيلات تَفرّد الجاهزة.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${sans.variable} ${display.variable}`}>
      <body><CartProvider>{children}</CartProvider></body>
    </html>
  );
}
