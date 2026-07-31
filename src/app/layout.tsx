import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/sonner";
import { SplashScreen } from "@/components/splash-screen";
import "./globals.css";

export const metadata: Metadata = {
  title: "UMKM Pedurungan Tengah - Temukan Usaha Lokal Terbaik",
  description:
    "Temukan dan dukung usaha mikro, kecil, dan menengah lokal. Platform untuk menemukan produk dan layanan UMKM di sekitar Anda.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`h-full antialiased ${GeistSans.className}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <div className="relative min-h-full">
          {children}
          <SplashScreen />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
