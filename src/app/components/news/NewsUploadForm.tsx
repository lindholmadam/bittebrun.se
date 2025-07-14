// File: src/app/components/news/NewsUploadForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUploadCloud } from "react-icons/fi";

export default function NewsUploadForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("dateFrom", dateFrom);
      if (dateTo) formData.append("dateTo", dateTo);
      if (timeFrom) formData.append("timeFrom", timeFrom);
      if (timeTo) formData.append("timeTo", timeTo);
      if (eventLink) formData.append("eventLink", eventLink);
      if (file) formData.append("image", file);

      const res = await fetch("/api/news", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Något gick fel vid uppladdningen.");
      }

      setSuccess(true);
      onSuccess?.();
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Något gick fel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Lägg till nyhet</h2>

      {/* <div>
        <label className="block text-sm font-medium mb-1">Bild</label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div> */}

      <div className="mb-4">
        <div className="flex items-center gap-4">
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-gray-600 text-white rounded cursor-pointer hover:bg-gray-700 transition"
          >
            Välj bild
          </label>
          <span className="text-sm text-gray-600">
            {file?.name || "Ingen fil vald"}
          </span>
        </div>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Titel</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Beskrivning</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Plats</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Startdatum</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slutdatum (valfritt)</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Starttid (valfritt)</label>
          <input
            type="time"
            value={timeFrom}
            onChange={(e) => setTimeFrom(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sluttid (valfritt)</label>
          <input
            type="time"
            value={timeTo}
            onChange={(e) => setTimeTo(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Länk till evenemang (valfritt)</label>
        <input
          type="url"
          value={eventLink}
          onChange={(e) => setEventLink(e.target.value)}
          placeholder="https://facebook.com/evenemang"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Nyheten har sparats!</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-5 rounded flex items-center gap-2"
      >
        <FiUploadCloud className="w-5 h-5" />
        {loading ? "Laddar upp..." : "Ladda upp nyhet"}
      </button>
    </form>
  );
}

