import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let isConnected = false;

export default async function connectToDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected with Mongoose");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}