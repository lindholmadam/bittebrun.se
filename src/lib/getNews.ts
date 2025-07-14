// src/lib/getNews.ts
// Description: This function retrieves all news items from the database, sorted by date (descending).

import connectToDB from "./mongoose";
import News from "@/models/News";

export default async function getNews() {
  await connectToDB();
  const news = await News.find().sort({ date: -1 }).lean(); // Nyare först
  return news;
}