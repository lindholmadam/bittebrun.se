"use client";

import { useEffect, useState } from "react";

type News = {
  _id: string;
  title: string;
  location: string;
  dateFrom?: string;
  dateTo?: string;
  timeFrom?: string;
  timeTo?: string;
  url?: string;
  description: string;
};

export default function EditNewsModal({
  news,
  onSave,
  onClose,
}: {
  news: News;
  onSave: () => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(news.title);
  const [location, setLocation] = useState(news.location);
  const [dateFrom, setDateFrom] = useState(news.dateFrom || "");
  const [dateTo, setDateTo] = useState(news.dateTo || "");
  const [timeFrom, setTimeFrom] = useState(news.timeFrom || "");
  const [timeTo, setTimeTo] = useState(news.timeTo || "");
  const [eventLink, setEventLink] = useState(news.eventLink || "");
  const [description, setDescription] = useState(news.description);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(news.title);
    setLocation(news.location);
    setDateFrom(news.dateFrom || "");
    setDateTo(news.dateTo || "");
    setTimeFrom(news.timeFrom || "");
    setTimeTo(news.timeTo || "");
    setEventLink(news.eventLink || "");
    setDescription(news.description);
  }, [news]);

const handleSave = async () => {
  setSaving(true);

  if (eventLink.trim() !== "") {
    try {
      new URL(eventLink);
    } catch {
      alert("Ogiltig länk. Vänligen ange en korrekt webbadress, t.ex. https://example.com");
      setSaving(false);
      return;
    }
  }

  try {
    const res = await fetch(`/api/news/${news._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        location,
        dateFrom,
        dateTo,
        timeFrom,
        timeTo,
        eventLink,
        description,
      }),
    });

    const updated = await res.json();
    if (res.ok) {
      onSave();
      onClose();
    } else {
      console.error("Update failed:", updated.error);
    }
  } catch (err) {
    console.error("PATCH error:", err);
  } finally {
    setSaving(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6 relative overflow-y-auto max-h-[98vh]">
        <h2 className="text-xl font-semibold mb-4">Redigera nyhet</h2>

        <label className="block mb-2 text-sm">Titel</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 text-sm">Plats</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm">Startdatum</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Slutdatum (valfritt)</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm">Starttid (valfritt)</label>
            <input
              type="time"
              value={timeFrom}
              onChange={(e) => setTimeFrom(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Sluttid (valfritt)</label>
            <input
              type="time"
              value={timeTo}
              onChange={(e) => setTimeTo(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
          </div>
        </div>

        <label className="block mb-2 text-sm">Länk (valfritt)</label>
        <input
          type="url"
          value={eventLink}
          onChange={(e) => setEventLink(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 text-sm">Beskrivning</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex space-x-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            disabled={saving}
          >
            Avbryt
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={saving}
          >
            {saving ? "Sparar..." : "Spara"}
          </button>
        </div>
      </div>
    </div>
  );
}