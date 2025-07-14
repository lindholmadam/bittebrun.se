import { NextResponse } from "next/server";
import connectToDB from "@/lib/mongoose";
import Image from "@/models/Image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// POST /api/images/reorder
export async function POST(req: Request) {
  try {
    // Kontrollera session och admin
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Läs JSON från frontend
    const body = await req.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Anslut till databasen
    await connectToDB();

    // Uppdatera sortIndex för varje bild
    await Promise.all(
      orderedIds.map((id: string, index: number) =>
        Image.findByIdAndUpdate(id, { sortIndex: index })
      )
    );

    return NextResponse.json({ message: "Sortering uppdaterad" }, { status: 200 });
  } catch (err) {
    console.error("❌ Fel vid reorder:", err);
    return NextResponse.json({ error: "Serverfel" }, { status: 500 });
  }
}