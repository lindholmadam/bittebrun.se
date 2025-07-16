"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Navbar(): JSX.Element {
  const pathname = usePathname();

  const navLinks = [
    { href: "/gallery", label: "Galleri" },
    { href: "/nyheter", label: "Nyheter" },
    { href: "/biografi", label: "Biografi" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  return (
    <nav className="flex items-center w-full px-4 justify-center text-black">
      <div className="flex flex-col w-full max-w-screen-lg items-center px-4">
        <div className="flex justify-between w-full align-center text-center pt-4 pb-4">
          <Link
            href="/"
            className="text-2xl sm:text-3xl tracking-wide text-black logo-text pt-1"
          >
            Bitte Brun
          </Link>

          <div className="flex align-baseline items-center">
            <div className="flex flex-row w-full justify-center align-center items-center gap-4">
              <a
                href="https://www.instagram.com/artbittebrun/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="hover:scale-110 text-md hover:text-blue transition-colors rounded-lg" />
              </a>
              <a
                href="https://www.facebook.com/p/artbittebrun-100082864358297/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="hover:scale-110 text-md hover:text-blue transition-colors rounded-lg" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center w-full p-2">
          <ul className="relative flex gap-3">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <li key={href} className="relative">
                  <Link
                    href={href}
                    className={`text-sm nav-text p-2 transition-colors duration-300 ${
                      isActive ? "text-black" : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-black"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
