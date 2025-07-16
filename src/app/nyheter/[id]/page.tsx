// File: src/app/nyheter/[id]/page.tsx

import News from "@/models/News";
import connectToDB from "@/lib/mongoose";
import { notFound } from "next/navigation";
import { NewsItem } from "@/types";

type Props = {
  params: {
    id: string;
  };
};

export default async function SingleNewsPage({ params }: Props) {
  const id = params.id;

  await connectToDB();
  const news = (await News.findById(id).lean()) as NewsItem | null;

  if (!news) return notFound();

  // Bygg datumbeskrivning
  const dateLabel = news.dateTo
    ? `${news.dateFrom} – ${news.dateTo}`
    : news.dateFrom;

  // Bygg tidsbeskrivning
  let timeLabel = "";
  if (news.timeFrom && news.timeTo) {
    timeLabel = `${news.timeFrom} – ${news.timeTo}`;
  } else if (news.timeFrom) {
    timeLabel = news.timeFrom;
  }

  return (
    <main className="min-h-screen pb-10 pt-5 px-5 bg-gray-100 flex flex-col items-center">
      <div className="flex flex-col pb-7 md:flex-row align-center bg-white max-w-screen-lg w-full p-4 justify-evenly items-center md:items-start shadow-lg gap-6">
        {/* Bild */}
        <div className="flex justify-center w-full sm:w-[50%]">
          <img
            src={news.url}
            alt={news.title}
            className="max-h-[600px] object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center self-center text-center w-full md:w-[50%] lg:pr-6 mt-3 sm:mt-0 gap-3">
          <h1 className="text-xl text-center tracking-wide pb-4 sm:pb-7 font-bold">{news.title}</h1>
          <p className="text-md text-gray-700">
            <span className="font-semibold">Plats</span> <br /> {news.location}
          </p>
          <p className="text-md text-gray-700">
            <span className="font-semibold">Datum</span> <br /> {dateLabel}
          </p>
          {timeLabel && (
            <p className="text-md text-gray-700">
              <span className="font-semibold">Tid</span> <br /> {timeLabel}
            </p>
          )}
          {news.eventLink && (
            <p className="text-md flex flex-col text-gray-700">
              <span className="font-semibold">Event:</span>{" "}
              <a
                href={news.eventLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-words inline-block max-w-full truncate"
                title={news.eventLink}
              >
                {new URL(news.eventLink).hostname +
                  new URL(news.eventLink).pathname.slice(0, 20)}
                ...
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Beskrivning under */}
      <div className="bg-white max-w-screen-lg w-full mt-3 py-6 px-5 sm:px-10 shadow">
        <h2 className="text-lg font-semibold mb-2">Information</h2>
        <p className="text-gray-700 whitespace-pre-line">{news.description}</p>
      </div>
    </main>
  );
}
