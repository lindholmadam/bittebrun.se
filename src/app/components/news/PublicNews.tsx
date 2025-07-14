// File: src/app/components/news/PublicNews.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type News = {
  _id: string;
  title: string;
  description: string;
  location: string;
  dateFrom?: string;
  dateTo?: string;
  timeFrom?: string;
  timeTo?: string;
  eventLink?: string;
  url: string;
};

export default function PublicNews({ news }: { news: News[] }) {
  const router = useRouter();
  const [sortedNews, setSortedNews] = useState<News[]>([]);

  useEffect(() => {
    const sorted = [...news].sort((a, b) => {
      return new Date(b.dateFrom || "").getTime() - new Date(a.dateFrom || "").getTime();
    });
    setSortedNews(sorted);
  }, [news]);

  // Format date and time display
  const formatDate = (item: News) => {
    if (item.dateFrom && item.dateTo) return `${item.dateFrom} – ${item.dateTo}`;
    return item.dateFrom || "";
  };

  const formatTime = (item: News) => {
    if (item.timeFrom && item.timeTo) return `${item.timeFrom} – ${item.timeTo}`;
    return item.timeFrom || "";
  };

  // Create display-ready photos array
  const photos = sortedNews.map((item) => ({
    id: item._id,
    src: item.url,
    alt: item.title || "Nyhet",
    title: item.title,
    description: item.description,
    date: formatDate(item),
    time: formatTime(item),
    location: item.location,
    eventLink: item.eventLink,
  }));

  if (photos.length === 0) {
    return <p className="text-center text-gray-500">Inga nyheter tillgängliga.</p>;
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(`/nyheter/${item.id}`)}
            className="rounded-lg overflow-hidden shadow-md bg-white flex flex-col hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-90 object-contain"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h1 className="text-md mb-5 font-semibold self-center">{item.title}</h1>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Datum:</span> {item.date}
              </p>
              {item.time && (
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Tid:</span> {item.time}
                </p>
              )}
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Plats:</span> {item.location}
              </p>

              {/* {item.eventLink && (
                <p className="flex text-sm gap-1">
                  <span className="font-semibold text-gray-600">Event: </span>
                  <a
                    href={item.eventLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-words inline-block max-w-full truncate"
                    title={item.eventLink} // tooltip för hela länken
                  >
                    {new URL(item.eventLink).hostname + new URL(item.eventLink).pathname.slice(0, 10)}...
                  </a>
                </p>
              )} */}

              <p className="text-sm pt-2 mb-4 flex-grow">
                {item.description.length > 120
                  ? item.description.slice(0, 120) + "… Läs mer"
                  : item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
