import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For You, Kitkat 💕",
  description: "A romantic website made with love, only for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
