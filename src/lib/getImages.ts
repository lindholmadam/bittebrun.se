// src\lib\getImages.ts
// Description: This function retrieves all images from the database, sorted by their sortIndex.

import connectToDB from "./mongoose";
import Image from "@/models/Image";

export default async function getImages() {
  await connectToDB();
  const images = await Image.find().sort({ sortIndex: 1 }).lean(); // Sortera på sortIndex
  return images;
}