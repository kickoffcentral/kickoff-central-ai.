import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kickoff Central AI",
  description: "Football analytics and statistics dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
