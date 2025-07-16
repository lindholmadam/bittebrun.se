import { NextResponse } from "next/server";
import connectToDB from "@/lib/mongoose";
import Image from "@/models/Image";

export async function POST(req: Request) {
  try {
    const { order } = await req.json();
    await connectToDB();

    for (const { id, order: newOrder } of order) {
      await Image.findByIdAndUpdate(id, { order: newOrder });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order update error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}