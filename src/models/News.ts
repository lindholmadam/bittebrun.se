// File: src/models/News.ts

import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    location: String,
    dateFrom: { type: String, required: true },
    dateTo: { type: String },
    timeFrom: { type: String },
    timeTo: { type: String },
    eventLink: { type: String },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    sortIndex: Number,
  },
  { timestamps: true }
);

const News = mongoose.models.News || mongoose.model("News", newsSchema);
export default News;
