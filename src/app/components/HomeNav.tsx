"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";

export default function HomeNav(): JSX.Element {
  const pathname = usePathname();
  const [underlineX, setUnderlineX] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const navLinks = [
    { href: "/gallery", label: "GALLERI" },
    { href: "/nyheter", label: "NYHETER" },
    { href: "/biografi", label: "BIOGRAFI" },
    { href: "/kontakt", label: "KONTAKT" },
  ];

  useEffect(() => {
    const activeLink = linkRefs.current[pathname];
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      const containerRect = activeLink.parentElement?.parentElement?.getBoundingClientRect();
      if (containerRect) {
        setUnderlineX(rect.left - containerRect.left);
        setUnderlineWidth(rect.width);
      }
    }
  }, [pathname]);

  return (
    <div className="relative flex flex-col items-center justify-center mb-15">
      <ul className="relative flex flex-col md:flex-row gap-10 sm:gap-12">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              ref={(el) => (linkRefs.current[href] = el)}
              className={`flex flex-row gap-1 justify-center text-md font-semibold tracking-wider transition-colors duration-300 nav-text pl-2 sm:pl-0 ${
                pathname === href ? "text-gray-400" : "text-white hover:text-gray-400"
              }`}
            >
              {label}
              <div className="flex text-lg justify-center pt-[2px]">
                <IoMdArrowDropright />
              </div>
            </Link>
          </li>
        ))}

        <motion.div
          className="hidden md:block absolute bottom-[-4px] h-[2px] bg-white"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          animate={{ x: underlineX, width: underlineWidth }}
        />
      </ul>
    </div>
  );
}
