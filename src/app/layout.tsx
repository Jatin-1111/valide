import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

// Playfair Display for headlines and luxury elements
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Montserrat for subheadings and navigation
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Lato for body text and general content
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VALIDÉ | Luxury Fashion & Accessories",
  description:
    "Discover curated luxury fashion, timepieces, and accessories at VALIDÉ. Experience premium shopping with worldwide shipping.",
  keywords:
    "VALIDÉ, luxury fashion, designer watches, premium accessories, luxury shopping, designer brands, high-end fashion, luxury accessories, designer clothing, luxury boutique",
  authors: [{ name: "VALIDÉ Luxury" }],
  metadataBase: new URL("https://valideluxury.vercel.app"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://valideluxury.vercel.app",
    title: "VALIDÉ | Luxury Fashion & Accessories",
    description:
      "Discover curated luxury fashion, timepieces, and accessories at VALIDÉ. Experience premium shopping with worldwide shipping.",
    siteName: "VALIDÉ",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "VALIDÉ Luxury Shopping - Premium Fashion & Accessories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VALIDÉ | Luxury Fashion & Accessories",
    description:
      "Discover curated luxury fashion, timepieces, and accessories at VALIDÉ. Experience premium shopping with worldwide shipping.",
    images: ["/favicon.ico"],
    creator: "@valideluxury",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://valideluxury.vercel.app",
  },
  verification: {
    google: "lkDU4-oSrF6pCcKpUha24J3mLWYp9eOZsmQtyhtBCpo", // Add this after setting up Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${lato.variable}`}
    >
      <body className="bg-background text-primary antialiased">
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
      </body>
    </html>
  );
}
