import getNews from "@/lib/getNews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import NewsClient from "../components/news/NewsClient";

export const metadata = {
  title: "Nyheter – Bitte Brun",
  description:
    "Håll dig uppdaterad med de senaste nyheterna om Bitte Bruns utställningar, event och konstnärliga aktiviteter.",
  keywords: ["nyheter", "aktuellt", "utställningar", "konstevenemang", "Bitte Brun"],
  alternates: {
    canonical: "https://www.bittebrun.se/nyheter",
  },
};

export default async function NyheterPage() {
  const rawNews = await getNews();
  const news = JSON.parse(JSON.stringify(rawNews));
  const session = await getServerSession(authOptions);
  const allowedAdmins = [process.env.ADMIN_EMAIL, process.env.ADMIN_EMAIL_TWO];
  const isAdmin = allowedAdmins.includes(session?.user?.email ?? "");

  return (
    <main className="flex flex-col w-full justify-items-center min-h-screen py-10 px-5">
      <div className="flex self-center w-full max-w-screen-lg mb-4 justify-center pb-7">
        <h1 className="text-3xl text-gray-600 font-bold italic tracking-wide">Nyheter</h1>
      </div>
      <NewsClient news={news} isAdmin={isAdmin} />
    </main>
  );
}