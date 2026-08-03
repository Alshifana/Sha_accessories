import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sha-accessories.example.com"),
  title: {
    default: "Sha-Accessories — Elegant Photo Frames & Anti-Tarnish Jewelry",
    template: "%s | Sha-Accessories",
  },
  description:
    "Handcrafted photo frames and premium anti-tarnish women's jewelry. Necklaces, earrings, bracelets and rings finished by hand, designed to last.",
  keywords: [
    "photo frames",
    "anti-tarnish jewelry",
    "handcrafted frames",
    "gold plated jewelry",
    "women's accessories",
  ],
  openGraph: {
    title: "Sha-Accessories — Elegant Photo Frames & Anti-Tarnish Jewelry",
    description:
      "Handcrafted photo frames and premium anti-tarnish women's jewelry, finished by hand.",
    type: "website",
    siteName: "Sha-Accessories",
  },
  robots: { index: true, follow: true },
};

// Root layout is intentionally minimal (just html/body/fonts) so that
// /studio (Sanity Studio) can render full-page without the storefront's
// navbar/footer/cart chrome. All of that chrome lives in app/(site)/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
