"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Masonry from "react-masonry-css";
import EditImageModal from "./EditImageModal";
import { FiEdit, FiX } from "react-icons/fi";
import { GalleryImage } from "@/types"; // Används överallt!

export default function AdminGallery({ images }: { images: GalleryImage[] }) {
  const [items, setItems] = useState(images.map((img) => img._id));
  const [allImages, setAllImages] = useState(images);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      try {
        await fetch("/api/images/reorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderedIds: newItems }),
        });
      } catch (err) {
        console.error("Kunde inte spara ny ordning:", err);
      }
    }
  };

  const updateImage = (updated: GalleryImage) => {
    setAllImages((prev) =>
      prev.map((img) => (img._id === updated._id ? updated : img))
    );
  };

  const deleteImage = async (id: string) => {
    try {
      const res = await fetch(`/api/images/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAllImages((prev) => prev.filter((img) => img._id !== id));
        setItems((prev) => prev.filter((imgId) => imgId !== id));
      } else {
        console.error("Kunde inte ta bort bilden.");
      }
    } catch (err) {
      console.error("Fel vid borttagning:", err);
    }
  };

  return (
    <>
      {editingImage && (
        <EditImageModal
          image={editingImage}
          onClose={() => setEditingImage(null)}
          onUpdated={updateImage}
        />
      )}

      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Masonry
            breakpointCols={{ default: 4, 1024: 3, 768: 2, 0: 2 }}
            className="flex w-auto max-w-screen-lg mx-auto gap-6 mt-10"
            columnClassName="space-y-6"
          >
            {items.map((id) => {
              const image = allImages.find((img) => img._id === id);
              if (!image) return null;
              return (
                <DraggableImage
                  key={image._id}
                  image={image}
                  onEdit={() => setEditingImage(image)}
                  onDelete={() => {
                    if (
                      window.confirm("Är du säker på att du vill ta bort bilden?")
                    ) {
                      deleteImage(image._id);
                    }
                  }}
                />
              );
            })}
          </Masonry>
        </SortableContext>
      </DndContext>
    </>
  );
}

function DraggableImage({
  image,
  onEdit,
  onDelete,
}: {
  image: GalleryImage;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative overflow-hidden">
      <div {...attributes} {...listeners} className="cursor-grab">
        <img
          src={image.url}
          alt={image.title}
          className="h-[250px] w-auto object-cover block mx-auto rounded"
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="absolute top-2 left-2 bg-white p-1 rounded-full shadow z-20"
        title="Redigera"
      >
        <FiEdit className="text-gray-700 text-lg" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow z-20"
        title="Ta bort"
      >
        <FiX className="text-red-600 text-lg" />
      </button>

      <ImageInfo image={image} />
    </div>
  );
}

function ImageInfo({ image }: { image: GalleryImage }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-1">
      {image.sold ? (
        <p className="text-sm text-red-600 font-semibold mt-1">🔴 Såld</p>
      ) : image.price !== undefined ? (
        <p className="text-sm font-semibold">
          Pris: {image.price.toLocaleString("sv-SE")} SEK
        </p>
      ) : null}
    </div>
  );
}
