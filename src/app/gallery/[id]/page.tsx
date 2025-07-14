// File: src/app/gallery/[id]/page.tsx

import Image from "@/models/Image";
import connectToDB from "@/lib/mongoose";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaCircle } from "react-icons/fa";

type Props = {
  params: {
    id: string;
  };
};

export default async function SingleImagePage({ params }: Props) {
  const id = params.id;

  await connectToDB();
  const image = await Image.findById(id).lean();

  if (!image) return notFound();

  return (
    <main className="min-h-screen py-5 px-2 sm:px-5 bg-gray-100 flex flex-col items-center">
      {/* Bild + info */}
      <div className="flex flex-col sm:flex-row align-center bg-white max-w-screen-lg w-full p-4 justify-evenly">
        {/* Bild */}
        <div className="flex justify-center w-full sm:w-[60%]">
          <img
            src={image.url}
            alt={image.title}
            className="max-h-[600px] object-contain shadow-lg"
          />
        </div>

        {/* Bildinformation */}
        <div className="flex flex-col justify-center text-center w-full sm:w-[40%] lg:pr-6 mt-6 px-5 gap-3">
          <h1 className="text-lg text-center tracking-wide font-semibold mb-3">{image.title}</h1>
          <p className="text-md italic">Storlek: {image.size} cm</p>
          {image.sold ? (
            <div className="flex items-center justify-center gap-2">
              <FaCircle className="text-xs text-red-600" />
              <p className="text-md">Såld</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2">
                <FaCircle className="text-xs text-green-600" />
                <p className="text-md font-semibold">Pris: {image.price.toLocaleString("sv-SE")} SEK</p>
              </div>
              {image.price && (
                <div className="flex w-full justify-center mt-4">
                  <Link href="/kontakt">
                    <button
                      className="max-w-[160px] text-sm px-3 py-2 border border-black rounded-full font-semibold transition-colors duration-200 hover:bg-black hover:text-white cursor-pointer"
                    >
                      Köpförfrågan
                    </button>
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Tekniker */}
          {image.techniques && image.techniques.length > 0 && (
            <div className="flex flex-wrap justify-center align-center gap-2 mt-7">
              {image.techniques.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="border border-black px-3 py-1 rounded-full text-xs bg-[#fff0f5]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Beskrivning */}
      {image.description && (
        <div className="bg-white max-w-screen-lg items-center justify-center w-full mt-3 py-5 sm:px-30">
          <div className="max-w-screen-md px-5">
            <p className="text-md text-gray-700 whitespace-pre-line">{image.description}</p>
          </div>
        </div>
      )}
    </main>
  );
}
