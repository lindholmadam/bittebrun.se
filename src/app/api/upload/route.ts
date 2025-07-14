import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import connectToDB from "@/lib/mongoose";
import Image from "@/models/Image";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const size = `${formData.get("height")}×${formData.get("width")}×${formData.get("depth")}`;
    const sold = formData.get("sold") === "true";
    const priceRaw = formData.get("price") as string;
    const price = priceRaw ? parseInt(priceRaw, 10) : null;
    const techniquesRaw = formData.get("techniques");
    let techniques: string[] = [];

    if (typeof techniquesRaw === "string") {
      try {
        techniques = JSON.parse(techniquesRaw);
      } catch (err) {
        console.error("Could not parse techniques:", err);
      }
    }

    if (!imageFile || !title) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const publicId = `bittebrun/${uuidv4()}`;

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { public_id: publicId },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    const { secure_url, public_id, width, height } = uploadResult as any;

    await connectToDB();

    const sortIndex = await Image.countDocuments();

    const savedImage = await Image.create({
      title,
      url: secure_url,
      public_id,
      width,
      height,
      description,
      size,
      sold,
      price: sold ? null : price,
      techniques,
      sortIndex,
    });

    return NextResponse.json(savedImage, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}