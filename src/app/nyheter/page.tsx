import getNews from "@/lib/getNews";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NewsClient from "../components/news/NewsClient";

export const metadata = {
  title: "Nyheter – Bitte Brun",
  description:
    "Håll dig uppdaterad med de senaste nyheterna om Bitte Bruns utställningar, event och konstnärliga aktiviteter.",
};

export default async function NyheterPage() {
  const rawNews = await getNews();
  const news = JSON.parse(JSON.stringify(rawNews));
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  return (
    <main className="flex flex-col w-full justify-items-center min-h-screen py-10 px-5">
      <div className="flex self-center w-full max-w-screen-lg mb-4 justify-center pb-7">
        <h1 className="text-3xl text-gray-600 font-bold italic tracking-wide">Nyheter</h1>
      </div>
      <NewsClient news={news} isAdmin={isAdmin} />
    </main>
  );
}