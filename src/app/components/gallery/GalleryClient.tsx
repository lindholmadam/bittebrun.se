"use client";

import { useState } from "react";
import UploadModal from "./UploadModal";
import ImageUploadForm from "./ImageUploadForm";
import AdminGallery from "./AdminGallery";
import PublicGallery from "./PublicGallery";
import { Plus } from "lucide-react";

export default function GalleryClient({ images, isAdmin }: { images: any[]; isAdmin: boolean }) {
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
            aria-label="Lägg till bild"
          >
            <Plus className="w-6 h-6" />
          </button>
          <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ImageUploadForm onSuccess={handleUploadSuccess} />
          </UploadModal>
        </>
      )}

      {isAdmin ? <AdminGallery images={images} /> : <PublicGallery images={images} />}
    </>
  );
}