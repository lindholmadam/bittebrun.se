import "./loadEnv";

import bcrypt from "bcryptjs";
import clientPromise from "../src/lib/mongodb";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function createUser() {
  try {
    const client = await clientPromise;
    await mongoose.connect(MONGODB_URI);

    const email = process.env.ADMIN_EMAIL;
    const plainPassword = process.env.ADMIN_PASSWORD;

    if (!email || !plainPassword) {
      throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is not set in .env.local");
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("User already exists");
      process.exit(0);
    }

    const user = new User({ email, password: hashedPassword });
    await user.save();

    console.log("Admin user created");
    process.exit(0);
  } catch (err) {
    console.error("Error creating user:", err);
    process.exit(1);
  }
}

createUser();
