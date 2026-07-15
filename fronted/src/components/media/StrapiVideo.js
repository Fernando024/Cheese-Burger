import { getStrapiMediaRaw } from "@/lib/getStrapiMedia";

export default function StrapiVideo({ media, controls = true, className, autoPlay, loop, muted, playsInline, poster }) {
  if (!media) return null;

  const mime = media.mime || "";
  const url = getStrapiMediaRaw(media);

  if (!url) return null;

  const isVideo = mime.startsWith("video/");

  if (!isVideo) return null;

  return (
    <video
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      poster={poster}
      className={className}
    >
      <source src={url} type={mime} />
    </video>
  );
}
