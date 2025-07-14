import getImages from "@/lib/getImages";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import GalleryClient from "../components/gallery/GalleryClient";

export default async function GalleriPage() {
  const rawImages = await getImages();
  const images = JSON.parse(JSON.stringify(rawImages));
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  return (
    <main className="flex flex-col min-h-screen py-10 px-5">
      <div className="flex self-center w-full max-w-screen-lg mb-4 justify-center pb-7">
        <h1 className="text-3xl text-gray-600 font-bold italic tracking-wide">Galleri</h1>
      </div>
      <GalleryClient images={images} isAdmin={isAdmin} />
    </main>
  );
}