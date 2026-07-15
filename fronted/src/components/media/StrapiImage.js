import Image from "next/image";
import { getStrapiMedia } from "@/lib/getStrapiMedia";

function resolveAlt(media) {
  if (!media) return "";
  return (
    media.alternativeText ||
    media.alternativeText === "" && media.name ||
    media.name ||
    "Imagen"
  );
}

export default function StrapiImage({
  media,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  className,
}) {
  const url = getStrapiMedia(media);

  if (!url) {
    return null;
  }

  const finalAlt = alt ?? resolveAlt(media);
  const intrinsicWidth = media?.width || width;
  const intrinsicHeight = media?.height || height;

  if (fill) {
    return (
      <Image
        src={url}
        alt={finalAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  if (intrinsicWidth && intrinsicHeight) {
    return (
      <Image
        src={url}
        alt={finalAlt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <Image
      src={url}
      alt={finalAlt}
      width={width || 1200}
      height={height || 800}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
