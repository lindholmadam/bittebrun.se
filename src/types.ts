// src/types.ts
export type GalleryImage = {
  _id: string;
  url: string;
  title: string;
  description: string;
  size: string;
  sold?: boolean;
  price?: number;
  width?: number;
  height?: number;
  techniques?: string[];
};

export type NewsItem = {
  _id: string;
  title: string;
  description: string;
  location: string;
  dateFrom: string;
  dateTo?: string;
  timeFrom?: string;
  timeTo?: string;
  eventLink?: string;
  url: string;
  public_id: string;
  sortIndex?: number;
};