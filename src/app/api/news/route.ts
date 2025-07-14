import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import connectToDB from "@/lib/mongoose";
import News from "@/models/News";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const dateFrom = formData.get("dateFrom") as string;
    const dateTo = formData.get("dateTo") as string;
    const timeFrom = formData.get("timeFrom") as string;
    const timeTo = formData.get("timeTo") as string;
    const description = formData.get("description") as string;
    const eventLink = formData.get("eventLink") as string;

    if (!imageFile || !title || !location || !dateFrom || !timeFrom || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const arrayBuffer = await imageFile.arrayBuffer();
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

    await connectToDB();

    const savedNews = await News.create({
      title,
      location,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      description,
      eventLink,
      public_id,
      url: secure_url,
    });

    return NextResponse.json(savedNews, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const news = await News.find().sort({ dateFrom: -1, timeFrom: -1 });
    return NextResponse.json(news, { status: 200 });
  } catch (err) {
    console.error("GET /api/news error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}