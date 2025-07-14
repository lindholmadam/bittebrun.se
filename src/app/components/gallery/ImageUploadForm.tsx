"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

export default function ImageUploadForm({ onSuccess }: { onSuccess?: () => void }) {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState({ height: "", width: "", depth: "" });
  const [sold, setSold] = useState(false);
  const [price, setPrice] = useState("");
  const [techniqueInput, setTechniqueInput] = useState("");
  const [techniques, setTechniques] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!session) return null;

  const addTechnique = () => {
    const trimmed = techniqueInput.trim();
    if (trimmed && !techniques.includes(trimmed)) {
      setTechniques([...techniques, trimmed]);
      setTechniqueInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Du måste välja en bild.");
      return;
    }

    if (!title.trim()) {
      setError("Titel får inte vara tom.");
      return;
    }

    if (!size.height.trim() || !size.width.trim() || !size.depth.trim()) {
      setError("Ange alla dimensioner (höjd, bredd, djup).");
      return;
    }

    if (!sold && !price.trim()) {
      setError("Antingen måste ett pris anges eller markera som såld.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("height", size.height);
    formData.append("width", size.width);
    formData.append("depth", size.depth);
    formData.append("sold", sold.toString());
    formData.append("price", price);
    formData.append("techniques", JSON.stringify(techniques));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      setError("Uppladdningen misslyckades");
    } else {
      setSuccess(true);
      setFile(null);
      setTitle("");
      setDescription("");
      setSize({ height: "", width: "", depth: "" });
      setSold(false);
      setPrice("");
      setTechniques([]);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white rounded"
    >
      <h2 className="text-xl font-bold mb-6">Ladda upp ny bild</h2>

      {success && <p className="text-green-600 mb-4">Bilden laddades upp!</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

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

      <div className="mb-4">
        <label className="block text-sm mb-2 font-medium">Titel</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <label className="block text-sm mb-2 font-medium">Storlek (cm):</label>
      <div className="flex gap-2 mb-4">
        <input
          name="height"
          type="text"
          placeholder="Höjd"
          value={size.height}
          onChange={(e) => setSize({ ...size, height: e.target.value })}
          className="w-20 border border-gray-300 rounded px-2 py-1"
        />
        <span className="self-center">*</span>
        <input
          name="width"
          type="text"
          placeholder="Bredd"
          value={size.width}
          onChange={(e) => setSize({ ...size, width: e.target.value })}
          className="w-20 border border-gray-300 rounded px-2 py-1"
        />
        <span className="self-center">*</span>
        <input
          name="depth"
          type="text"
          placeholder="Djup"
          value={size.depth}
          onChange={(e) => setSize({ ...size, depth: e.target.value })}
          className="w-20 border border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Beskrivning</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          rows={3}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tekniker</label>

        <div className="flex gap-2">
          <input
            type="text"
            value={techniqueInput}
            onChange={(e) => setTechniqueInput(e.target.value)}
            placeholder="Ex. Akryl"
            className="flex-grow border px-3 py-2 rounded"
          />
          <button
            type="button"
            onClick={addTechnique}
            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-sm"
          >
            Lägg till +
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {techniques.map((tech, index) => (
            <div key={index} className="relative bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mt-1">
              {tech}
              <button
                onClick={() => {
                  setTechniques((prev) => prev.filter((_, i) => i !== index));
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-3 h-3 flex items-center justify-center hover:bg-red-600"
                aria-label={`Ta bort ${tech}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>


      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Pris eller såld</label>
        <div className="flex items-center gap-10">
          {/* Visa prisinput endast om sold är false */}
          {!sold && (
            <div className="flex items-center gap-2 w-40">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border px-3 py-2 rounded appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Ange pris"
              />
              <span>kr</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sold"
              checked={sold}
              onChange={(e) => setSold(e.target.checked)}
            />
            <label htmlFor="sold" className="text-sm">Såld</label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 mt-10"
      >
        <FiUploadCloud className="w-5 h-5" />
        {loading ? "Laddar upp..." : "Ladda upp"}
      </button>
    </form>
  );
}
