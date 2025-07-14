"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/images/slideshow/FLYGERFRI2.jpg",
  "/images/slideshow/FLYGERFRI.jpg",
  "/images/slideshow/GENUIN.jpg",
  "/images/slideshow/LIONS.jpg",
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Slide ${index + 1}`}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Mörk overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      />
    </div>
  );
}