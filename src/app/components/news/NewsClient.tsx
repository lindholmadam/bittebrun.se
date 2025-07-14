// File: src/app/components/news/NewsClient.tsx

"use client";

import { useState } from "react";
import PublicNews from "./PublicNews";
import AdminNews from "./AdminNews";
import UploadModalNews from "./UploadModalNews";
import NewsUploadForm from "./NewsUploadForm";
import { Plus } from "lucide-react";

type NewsItem = {
  _id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
  url: string;
  public_id: string;
};

export default function NewsClient({
  news,
  isAdmin,
}: {
  news: NewsItem[];
  isAdmin: boolean;
}) {
  const [allNews, setAllNews] = useState(news);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadSuccess = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <>
      {isAdmin && (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center mx-auto mb-8 cursor-pointer transition"
            aria-label="Lägg till nyhet"
          >
            <Plus className="w-6 h-6" />
          </button>
          <UploadModalNews isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <NewsUploadForm onSuccess={handleUploadSuccess} />
          </UploadModalNews>
        </>
      )}

      {isAdmin ? (
        <AdminNews news={allNews} />
      ) : (
        <PublicNews news={allNews} />
      )}
    </>
  );
}

