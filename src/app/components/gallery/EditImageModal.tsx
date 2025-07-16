"use client";

import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { GalleryImage } from "@/types";

export default function EditImageModal({
  image,
  onClose,
  onUpdated,
}: {
  image: GalleryImage;
  onClose: () => void;
  onUpdated: (updated: GalleryImage) => void;
}) {
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);
  const [size, setSize] = useState(image.size);
  const [sold, setSold] = useState(image.sold ?? false);
  const [price, setPrice] = useState(image.price ?? 0);
  const [techniques, setTechniques] = useState<string[]>(image.techniques ?? []);
  const [techniqueInput, setTechniqueInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSave = async () => {
    if (!title.trim() || !size.trim()) {
      setError("Fyll i alla obligatoriska fält.");
      return;
    }

    if (!sold && (price === undefined || price <= 0)) {
      setError("Pris måste anges om verket inte är sålt.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/images/${image._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          size,
          sold,
          price,
          techniques,
        }),
      });

      const updated = await res.json();

      if (res.ok) {
        onUpdated(updated);
        onClose();
      } else {
        setError("Kunde inte spara ändringarna.");
        console.error("Update failed:", updated.error);
      }
    } catch (err) {
      setError("Ett fel uppstod vid sparandet.");
      console.error("PATCH error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/50 px-2 flex items-center justify-center pt-10">
      <div className="max-w-md w-full bg-white relative rounded overflow-y-auto max-h-screen mb-10">
        <div className="p-6 max-h-[98vh]">
          <h2 className="text-xl font-semibold mb-4">Redigera bild</h2>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <label className="block mb-2 text-sm">Titel</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2 text-sm">Beskrivning</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2 text-sm">Storlek</label>
          <input
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <div className="mb-6">
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
                onClick={() => {
                  if (
                    techniqueInput.trim() !== "" &&
                    !techniques.includes(techniqueInput.trim())
                  ) {
                    setTechniques([...techniques, techniqueInput.trim()]);
                    setTechniqueInput("");
                  }
                }}
                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-sm"
              >
                Lägg till +
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {techniques.map((tech, index) => (
                <div
                  key={index}
                  className="relative bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mt-1"
                >
                  {tech}
                  <button
                    onClick={() =>
                      setTechniques((prev) => prev.filter((_, i) => i !== index))
                    }
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
              {!sold && (
                <div className="flex items-center gap-2 w-40">
                  <input
                    type="number"
                    value={price === 0 ? "" : price}
                    onChange={(e) => setPrice(Number(e.target.value))}
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

          <div className="flex space-x-2 mt-10">
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

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Stäng"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
}
