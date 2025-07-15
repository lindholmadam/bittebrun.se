// src/app/api/news/[id]/route.ts

import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import connectToDB from "@/lib/mongoose";
import News from "@/models/News";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(req: Request, contextPromise: Promise<{ params: { id: string } }>) {
  try {
    const { params } = await contextPromise;
    const { id } = params;

    await connectToDB();

    const contentType = req.headers.get("content-type") || "";
    const existingNews = await News.findById(id);
    if (!existingNews) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    if (contentType.includes("application/json")) {
      const body = await req.json();
      const {
        title,
        location,
        dateStart,
        dateEnd,
        timeStart,
        timeEnd,
        description,
        url,
      } = body;

      existingNews.title = title;
      existingNews.location = location;
      existingNews.dateStart = dateStart;
      existingNews.dateEnd = dateEnd;
      existingNews.timeStart = timeStart;
      existingNews.timeEnd = timeEnd;
      existingNews.description = description;
      existingNews.url = url;

    } else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      const title = formData.get("title") as string;
      const location = formData.get("location") as string;
      const dateStart = formData.get("dateStart") as string;
      const dateEnd = formData.get("dateEnd") as string;
      const timeStart = formData.get("timeStart") as string;
      const timeEnd = formData.get("timeEnd") as string;
      const description = formData.get("description") as string;
      const url = formData.get("url") as string;
      const newImageFile = formData.get("image") as File | null;

      existingNews.title = title;
      existingNews.location = location;
      existingNews.dateStart = dateStart;
      existingNews.dateEnd = dateEnd;
      existingNews.timeStart = timeStart;
      existingNews.timeEnd = timeEnd;
      existingNews.description = description;
      existingNews.url = url;

      if (newImageFile) {
        if (existingNews.public_id) {
          await cloudinary.uploader.destroy(existingNews.public_id);
        }

        const arrayBuffer = await newImageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const publicId = `news/${uuidv4()}`;

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { public_id: publicId },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          ).end(buffer);
        });

        const { secure_url, public_id } = uploadResult as any;
        existingNews.url = secure_url;
        existingNews.public_id = public_id;
      }

    } else {
      return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
    }

    await existingNews.save();
    return NextResponse.json(existingNews, { status: 200 });

  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, contextPromise: Promise<{ params: { id: string } }>) {
  try {
    const { params } = await contextPromise;
    const { id } = params;

    await connectToDB();

    const existingNews = await News.findById(id);
    if (!existingNews) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    if (existingNews.public_id) {
      await cloudinary.uploader.destroy(existingNews.public_id);
    }

    await News.findByIdAndDelete(id);
    return NextResponse.json({ message: "News deleted" }, { status: 200 });

  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
