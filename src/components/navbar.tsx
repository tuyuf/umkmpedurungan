"use client";

import { useState } from "react";
import { MobileMenu } from "./mobile-menu";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  { label: "Home", link: "/" },
  { label: "UMKM", link: "/umkm" },
  { label: "Formulir UMKM", link: "/formulir" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 md:hidden bg-background/80 backdrop-blur-xl border-b border-border">
        <Link href="/">
          <Image
            src="/pedtengah.png"
            alt="Pedtengah"
            width={145}
            height={40}
            loading="eager"
            className="h-10 w-auto md:hidden"
          />
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] transition-colors duration-150"
          aria-label="Toggle Menu"
        >
          <div className="w-5 h-px bg-foreground"></div>
          <div className="w-3.5 h-px bg-foreground"></div>
        </button>
      </header>

      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-12 py-5 bg-background/80 backdrop-blur-xl border-b border-border">
        <Link href="/">
          <Image
            src="/pedtengah.png"
            alt="Pedtengah"
            width={203}
            height={56}
            loading="eager"
            className="h-14 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
      />
    </>
  );
}
