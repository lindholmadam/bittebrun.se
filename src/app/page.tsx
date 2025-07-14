import React from "react";
import Slideshow from "./components/Slideshow";
import HomeNav from "./components/HomeNav";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Slideshow />

      <main className="flex-grow flex flex-col h-[100vh] text-center items-center justify-center relative z-10 text-white">
        <h1 className="text-9xl tracking-wide logo-text">Bitte Brun</h1>
        <p className="text-xl mt-3 mb-15 sm:mb-20 lora-text italic tracking-wide">Konstnär.</p>
        <HomeNav />
      </main>
    </div>
  );
}