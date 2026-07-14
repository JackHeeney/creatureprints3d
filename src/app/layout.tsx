import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creature Print 3D — Thoughtful habitats, made differently",
  description: "Characterful 3D printed homes and enrichment for reptiles, amphibians and invertebrates.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
