import type { Metadata } from "next";
import "./globals.css";

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
        <main className="app-container">
          {children}
        </main>
      </body>
    </html>
  );
}
