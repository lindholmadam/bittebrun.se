"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi"; 

export default function UploadModal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/50 px-2 flex items-center justify-center">
      <div className="max-w-md w-full bg-white relative overflow-y-auto max-h-[98vh] rounded">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Stäng"
        >
          <FiX />
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
