import connectToDB from "./mongoose";
import News from "@/models/News";

export default async function getNews() {
  await connectToDB();
  const news = await News.find().sort({ date: -1 }).lean(); // Nyare först
  return news;
}