import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const variants = {
    primary: "bg-espresso-900 text-ivory-100 hover:bg-gold-500 hover:text-espresso-900",
    secondary: "border border-espresso-900 bg-transparent text-espresso-900 hover:bg-espresso-900 hover:text-ivory-100",
    accent: "bg-gold-500 text-espresso-900 hover:bg-gold-700 hover:text-white",
  };

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-[15px] font-semibold transition duration-200 active:scale-[.98] ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
