// File: src/app/api/images/[id]/route.ts

import { NextResponse } from "next/server";
import connectToDB from "@/lib/mongoose";
import Image from "@/models/Image";
import { v2 as cloudinary } from "cloudinary"; 
import "@/lib/cloudinary";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();

  try {
    const updates = await req.json();

    const allowedFields = ["title", "description", "size", "sold", "price", "techniques"];
    const filteredUpdates: Record<string, any> = {};
    for (const key of allowedFields) {
      if (key in updates) {
        filteredUpdates[key] = updates[key];
      }
    }

    const updated = await Image.findByIdAndUpdate(params.id, filteredUpdates, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDB();

  try {
    const image = await Image.findById(params.id);
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await Image.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Image deleted" });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}