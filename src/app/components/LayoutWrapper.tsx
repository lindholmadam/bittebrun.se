// ingen navbar eller footer till startsidan

"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SessionWrapper from "./SessionWrapper";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <SessionWrapper>
      {!isHome && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isHome && <Footer />}
    </SessionWrapper>
  );
}