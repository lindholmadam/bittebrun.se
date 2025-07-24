import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import LayoutWrapper from "./components/LayoutWrapper";

import { Alex_Brush, Lora, Roboto, Nunito, Playfair_Display } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-lora",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-playfair-display",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-nunito",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alex-brush",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bittebrun.se"),
  title: "Bitte Brun – Konstnär",
  description: "Välkommen till Bitte Bruns värld av färg och form. Se hennes konst, följ hennes utställningar och upptäck en personlig konstnärsresa.",
  keywords: ["konst", "konstnär", "akrylmålningar", "målningar", "galleri", "Bitte Brun"],
  authors: [{ name: "Bitte Brun" }],
  creator: "Bitte Brun",
  openGraph: {
    title: "Bitte Brun – Konstnär",
    description: "Se färgstarka målningar av konstnären Bitte Brun.",
    url: "https://www.bittebrun.se",
    siteName: "Bitte Brun",
    locale: "sv_SE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Målning av Bitte Brun: Hjärtats Sång",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitte Brun – Konstnär",
    description: "Se färgstarka målningar av konstnären Bitte Brun.",
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
    <html lang="sv">
      <body className={`${alexBrush.variable} ${lora.variable} ${roboto.variable} ${nunito.variable} ${playfairDisplay.variable} antialiased`}>
        <LayoutWrapper>
          <SessionWrapper>
            {children}
          </SessionWrapper>
        </LayoutWrapper>
      </body>
    </html>
  );
}