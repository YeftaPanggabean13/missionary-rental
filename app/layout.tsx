import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/src/components/ConvexClientProvider";

export const metadata: Metadata = {
  title: "Misionary — Rental Motor Bandung | Sewa Motor Terpercaya",
  description:
    "Platform penyewaan sepeda motor lokal di Bandung. Armada prima dan terawat, gratis 2 helm SNI & jas hujan, antar jemput Stasiun Bandung & Stasiun Whoosh Padalarang.",
  icons: {
    icon: "/img/missionary-favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-[#212121] text-white">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
