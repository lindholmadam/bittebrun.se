import formidable from "formidable";
import { NextRequest } from "next/server";

export async function parseForm(req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const form = formidable({
    multiples: false,
    keepExtensions: true
  });

  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}