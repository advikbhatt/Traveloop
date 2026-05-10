import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Traveloop | Personalized Travel Planning Made Easy",
  description: "Plan, organize, and share your perfect multi-city trips with Traveloop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        <main className="app-container">
          {children}
        </main>
        <SmoothScroll>
          <main className="app-container">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
