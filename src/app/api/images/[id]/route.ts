import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/mongoose";
import Image from "@/models/Image";
import { v2 as cloudinary } from "cloudinary";
import "@/lib/cloudinary";

// PATCH: uppdatera bildens metadata
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDB();

    const updates = await req.json();
    const allowedFields = ["title", "description", "size", "sold", "price", "techniques"];
    const filteredUpdates: Record<string, any> = {};

    for (const key of allowedFields) {
      if (key in updates) {
        filteredUpdates[key] = updates[key];
      }
    }

    const updated = await Image.findByIdAndUpdate(id, filteredUpdates, { new: true });
    if (!updated) return NextResponse.json({ error: "Image not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 });
  }
}

// DELETE: ta bort en bild och dess Cloudinary-data
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDB();

    const image = await Image.findById(id);
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await Image.findByIdAndDelete(id);
    return NextResponse.json({ message: "Image deleted" }, { status: 200 });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
