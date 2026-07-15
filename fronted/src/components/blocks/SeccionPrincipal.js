import StrapiImage from "@/components/media/StrapiImage";
import StrapiVideo from "@/components/media/StrapiVideo";
import styles from "./SeccionPrincipal.module.css";

function detectMediaKind(media) {
  if (!media) return null;
  const mime = (media.mime || "").toLowerCase();
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("image/")) return "image";
  return null;
}

export default function SeccionPrincipal({ block }) {
  const bloques = Array.isArray(block) ? block : [block];
  const data = bloques[0];
  if (!data) return null;

  const titulo = data.Titulo || "";
  const descripcion = data.Descripcion || "";
  const media = Array.isArray(data.Media) ? data.Media[0] : data.Media || null;

  if (!titulo && !descripcion && !media) return null;

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.textCol}>
          {titulo && <h1 className={styles.title}>{titulo}</h1>}
          {descripcion && <p className={styles.desc}>{descripcion}</p>}
        </div>

        {media && (
          <div className={styles.mediaCol}>
            {detectMediaKind(media) === "video" ? (
              <StrapiVideo
                media={media}
                autoPlay
                loop
                muted
                playsInline
                className={styles.media}
              />
            ) : (
              <StrapiImage media={media} width={600} height={450} priority className={styles.media} />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
