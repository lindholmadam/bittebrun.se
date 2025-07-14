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
  title: "Bitte Brun – Konstnär från Täby",
  description: "Utforska konstnären Bitte Bruns färgstarka och känslofyllda måleri. Se galleriet, läs biografin och följ kommande utställningar.",
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