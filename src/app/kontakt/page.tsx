"use client";

import dynamic from "next/dynamic";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export const metadata = {
  title: "Kontakt – Bitte Brun",
  description:
    "Kontakta konstnären Bitte Brun för frågor om konstverk, samarbeten eller utställningar. Ateljén finns i Täby Kyrkby – varmt välkommen att höra av dig.",
};

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function KontaktPage() {
  return (
    <main className="min-h-screen w-full justify-items-center mx-auto py-10 px-5 text-gray-800 leading-relaxed">
      <div className="flex self-center w-full max-w-screen-lg mb-4 justify-center pb-7">
        <h1 className="text-3xl text-gray-600 font-bold italic tracking-wide">Kontakt</h1>
      </div>
      <div className="w-full max-w-screen-lg mx-auto bg-white">
        <div className="flex flex-col md:flex-row">

          {/* Vänsterkolumn: kontaktinfo */}
          <div className="flex-1">
            <div className="flex flex-col mb-9 mr-0 sm:mr-7">
              <p className="text-md">
                Om du vill boka en tid för att besöka ateljén, är intresserad av ett verk, eller bara vill dela en tanke 
                – är du varmt välkommen att höra av dig. Bitte tar emot förfrågningar via e-post eller genom meddelanden på sociala medier. Hon svarar så snart hon har möjlighet. Alla samtal och möten sker i mån av tid och med omtanke.
              </p>
            </div>

            <div className="ml-3">
              <div className="flex flex mb-7 gap-5">
                <h3 className="text-md font-bold">E-mail:</h3>
                <a
                  href="mailto:artbittebrun@gmail.com"
                  className="text-black underline hover:text-gray-500 text-md"
                >
                  artbittebrun@gmail.com
                </a>
              </div>

              <div className="flex flex mb-7 gap-5"> 
                <h3 className="text-md font-semibold">Ateljé:</h3>
                <p className="text-md">Vikingavägen 45, 187 70 Täby Kyrkby</p> 
              </div>

              <div className="flex flex mb-7 gap-5">
                <h3 className="text-md font-semibold">Sociala medier:</h3>
                <div className="flex gap-4 mt-1">
                  <a
                    href="https://www.instagram.com/artbittebrun/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="hover:scale-110 text-md hover:text-blue-500 transition-transform" />
                  </a>
                  <a
                    href="https://www.facebook.com/bitte.lindholm.3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="hover:scale-110 text-md hover:text-blue-500 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center flex-1 w-full overflow-hidden">
            <Map />
            <p className="text-sm italic mt-1">Bitte Bruns ateljé på Vikingavägen 45, 187 70, Täby Kyrkby</p>
          </div>
          
        </div>
      </div>
    </main>
  );
}
