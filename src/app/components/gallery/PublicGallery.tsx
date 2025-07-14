"use client";

import { useRouter } from "next/navigation";
import PhotoAlbum from "react-photo-album";
import "react-photo-album/styles.css";

export default function PublicGallery({ images }: { images: any[] }) {
  const router = useRouter();

const photos = images.map((img) => ({
  src: img.url,
  width: img.width,
  height: img.height,
  id: img._id,
  title: img.title,
  sold: img.sold,
  price: img.price,
  techniques: img.techniques,
}));
  

  return (
    <div className="mx-auto max-w-screen-xl sm:max-w-screen-sm md:max-w-screen-lg overflow-x-hidden">
      <div className="w-full h-[1px]"></div>
        <PhotoAlbum
        layout="rows"
        photos={photos}

        render={{
          image: ( props ) => (
            <div className="relative group">
              <img
                {...props}
                className="transition duration-300 group-hover:brightness-75 shadow w-full h-auto"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-gradient-to-t from-black/60 to-transparent">
                <h1 className="text-xs font-semibold">{props.title}</h1>
              </div>
            </div>
          ),
        }}
        
        targetRowHeight={({ containerWidth }) => {
            if (containerWidth < 640) return 250;
            if (containerWidth < 1024) return 250;
            return 300; // desktop
        }}
        breakpoints={[640, 1024, 1440]}
        spacing={10}
        sizes={{
            size: "992px",
            sizes: [
            { viewport: "(max-width: 639px)", size: "calc(100vw - 32px)" },
            { viewport: "(max-width: 1023px)", size: "calc(100vw - 64px)" },
            ],
        }}
        onClick={({ photo }) => {
            router.push(`/gallery/${photo.id}`);
        }}
        />
    </div>
  );
}