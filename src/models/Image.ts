import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    title: String,
    url: { type: String, required: true },
    public_id: { type: String, required: true }, // Cloudinary public ID
    width: Number,
    height: Number,
    description: String,
    size: String,
    sold: Boolean,
    price: Number,
    techniques: [{ type: String }],
    sortIndex: Number,
  },
  { timestamps: true }
);

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);
export default Image;