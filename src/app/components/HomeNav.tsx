"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { IoMdArrowDropright } from "react-icons/io";

export default function HomeNav(): JSX.Element {
  const pathname = usePathname();

  const navLinks = [
    { href: "/gallery", label: "GALLERI" },
    { href: "/nyheter", label: "NYHETER" },
    { href: "/biografi", label: "BIOGRAFI" },
    { href: "/kontakt", label: "KONTAKT" },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center mb-15">
      <ul className="relative flex flex-col md:flex-row gap-10 sm:gap-12">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <li key={href} className="relative">
              <Link
                href={href}
                className={`flex flex-row gap-1 justify-center text-md font-semibold tracking-wider transition-colors duration-300 nav-text pl-2 sm:pl-0 ${
                  isActive ? "text-gray-400" : "text-white hover:text-gray-400"
                }`}
              >
                {label}
                <div className="flex text-lg justify-center pt-[2px]">
                  <IoMdArrowDropright />
                </div>
              </Link>
              {isActive && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-[-4px] left-0 h-[2px] w-full bg-white hidden md:block"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
