"use client";

import { FaInstagram, FaFacebook } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Footer(): JSX.Element {
  const { data: session, status } = useSession(); // Lägg till status

  return (
    <footer className="flex flex-col items-center justify-center text-center px-4 py-7">

      <div className="container relative mx-auto max-w-screen-lg flex justify-between items-center px-4 pt-4">
        <div className="flex flex-row justify-center items-center gap-4">
          <a
            href="https://www.instagram.com/artbittebrun/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="hover:scale-110 text-lg hover:text-blue transition-colors rounded-lg" />
          </a>
          <a
            href="https://www.facebook.com/bitte.lindholm.3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="hover:scale-110 text-lg hover:text-blue transition-colors rounded-lg" />
          </a>
        </div>

        <p className="absolute left-1/2 transform -translate-x-1/2 text-sm lg:text-md">
          © {new Date().getFullYear()} Bitte Brun
        </p>

        <div>
          {status === "loading" ? null : session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/gallery" })}
              className="text-sm lg:text-md hover:underline"
            >
              Logga ut
            </button>
          ) : (
            <Link
              href="/login"
              className="text-sm lg:text-md hover:underline"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
