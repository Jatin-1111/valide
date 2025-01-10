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
    "luxury fashion, designer watches, premium accessories, luxury shopping, VALIDÉ",
  authors: [{ name: "VALIDÉ" }],
  metadataBase: new URL("https://valide.com"),
  openGraph: {
    type: "website",
    title: "VALIDÉ | Luxury Fashion & Accessories",
    description: "Experience curated luxury at VALIDÉ",
    siteName: "VALIDÉ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VALIDÉ Luxury Shopping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VALIDÉ | Luxury Fashion & Accessories",
    description: "Experience curated luxury at VALIDÉ",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
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
