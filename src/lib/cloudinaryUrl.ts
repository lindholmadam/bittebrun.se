export function optimizedUrl(url: string, width?: number): string {
  if (!url?.includes("res.cloudinary.com")) return url;
  const transforms = width ? `f_auto,q_auto,w_${width}` : "f_auto,q_auto";
  return url.replace("/upload/", `/upload/${transforms}/`);
}
