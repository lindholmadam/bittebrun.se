"use client";

import UploadModalNews from "./UploadModalNews";
import EditNewsModal from "./EditNewsModal";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash, FiPlus, FiX } from "react-icons/fi";
import UploadNewsForm from "./NewsUploadForm";

export default function AdminNews({ news: initialNews }: { news: any[] }) {
  const [news, setNews] = useState(initialNews);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  async function handleDelete(id: string) {
    const confirmed = confirm("Är du säker på att du vill ta bort nyheten?");
    if (!confirmed) return;

    const res = await fetch(`/api/news/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setNews(prev => prev.filter(n => n._id !== id));
    } else {
      console.error("Failed to delete news");
    }
  }

  async function reloadNews() {
    const res = await fetch("/api/news");
    const updated = await res.json();
    setNews(updated);
  }

  async function handleEditSuccess() {
    await reloadNews();
    setSelectedNews(null);
  }

  async function handleUploadSuccess() {
    await reloadNews();
    setIsUploadOpen(false);
  }

  return (
    <div className="flex flex-col w-full justify-center align-center space-y-6">
      <div className="w-full max-w-screen-lg mx-auto px-4">
        <div className="flex justify-end mb-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(n => (
            <div key={n._id} className="relative border rounded-lg overflow-hidden shadow bg-white">
              <img src={n.url} alt={n.title} className="w-full h-90 object-contain" />

              <button
                onClick={() => setSelectedNews(n)}
                className="absolute top-2 left-2 bg-white p-1 rounded-full shadow z-10 cursor-pointer"
                title="Redigera"
              >
                <FiEdit className="text-gray-700 text-lg" />
              </button>

              <button
                onClick={() => handleDelete(n._id)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow z-10 cursor-pointer"
                title="Ta bort"
              >
                <FiX className="text-red-600 text-lg" />
              </button>

              <div className="flex flex-col p-4 gap-2">
                <h1 className="text-md font-semibold self-center text-center">{n.title}</h1>
                <p className="text-sm text-gray-700"><span className="font-semibold">Plats:</span> {n.location}</p>

                {n.dateFrom && (
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Datum:</span> {n.dateFrom}
                    {n.dateTo && ` – ${n.dateTo}`}
                  </p>
                )}

                {(n.timeFrom || n.timeTo) && (
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Tid:</span> {n.timeFrom}
                    {n.timeTo && ` – ${n.timeTo}`}
                  </p>
                )}

                {n.eventLink && (
                  <p className="text-sm flex gap-1">
                    <span className="font-semibold">Länk:</span>{" "}
                    <a
                      href={n.eventLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-words inline-block max-w-full truncate"
                      title={n.eventLink} // tooltip för hela länken
                    >
                      {new URL(n.eventLink).hostname + new URL(n.eventLink).pathname.slice(0, 10)}...
                    </a>
                  </p>
                )}

                <p className="text-sm line-clamp-3">{n.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isUploadOpen && (
        <UploadModalNews isOpen={true} onClose={() => setIsUploadOpen(false)}>
          <UploadNewsForm onSuccess={handleUploadSuccess} />
        </UploadModalNews>
      )}

      {selectedNews && (
        <EditNewsModal
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
          onSave={handleEditSuccess}
        />
      )}
    </div>
  );
}
