import StrapiImage from "@/components/media/StrapiImage";
import StrapiVideo from "@/components/media/StrapiVideo";
import styles from "./Cuerpo.module.css";

function detectMediaKind(media) {
  if (!media) return null;
  const mime = (media.mime || "").toLowerCase();
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("image/")) return "image";
  return null;
}

export default function Cuerpo({ block }) {
  const bloques = Array.isArray(block) ? block : [block];
  const data = bloques[0];
  if (!data) return null;

  const titulo = data.Titulo || "";
  const subtitulo = data.Subtitulo || "";
  const descripcion = data.Descripcion || "";
  const imagenDerecha = data.imagenDerecha === true;
  const mediaList = Array.isArray(data.Media) ? data.Media : [];
  const media = mediaList[0] || null;

  if (!titulo && !subtitulo && !descripcion && !media) return null;

  const hasMedia = Boolean(media);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid} ${imagenDerecha ? styles.imageRight : ""}`}>
        {hasMedia && (
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
              <StrapiImage media={media} width={500} height={400} className={styles.media} />
            )}
          </div>
        )}

        <div className={styles.textCol}>
          {titulo && <h2 className={styles.titulo}>{titulo}</h2>}
          {subtitulo && <p className={styles.subtitulo}>{subtitulo}</p>}
          {descripcion && (
            <div className={styles.descripcion}>
              {descripcion.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
