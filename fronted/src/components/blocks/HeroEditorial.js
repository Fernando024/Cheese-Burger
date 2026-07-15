import StrapiImage from "@/components/media/StrapiImage";
import StrapiVideo from "@/components/media/StrapiVideo";
import Boton from "@/components/Boton";
import styles from "./HeroEditorial.module.css";

function detectMediaKind(media) {
  if (!media) return null;
  const mime = (media.mime || "").toLowerCase();
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("image/")) return "image";
  return null;
}

export default function HeroEditorial({ block }) {
  const bloques = Array.isArray(block) ? block : [block];
  const data = bloques[0];
  if (!data) return null;

  const titulo = data.tituloPrincipal || "";
  const concepto = data.conceptoClave || "";
  const parrafo = data.parrafoDescriptivo || "";
  const media = Array.isArray(data.imagenProtagonista)
    ? data.imagenProtagonista[0]
    : data.imagenProtagonista || null;
  const boton = data.boton || null;

  if (!titulo && !concepto && !media) return null;

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.textCol}>
          {concepto && (
            <span className={styles.concepto}>{concepto}</span>
          )}
          {titulo && <h1 className={styles.titulo}>{titulo}</h1>}
          {parrafo && <p className={styles.parrafo}>{parrafo}</p>}
          {boton && (
            <div className={styles.btnWrap}>
              <Boton item={boton} />
            </div>
          )}
        </div>

        <div className={styles.mediaCol}>
          {media && (
            detectMediaKind(media) === "video" ? (
              <video
                src={media.url}
                autoPlay
                loop
                muted
                playsInline
                className={styles.media}
              />
            ) : (
              <StrapiImage
                media={media}
                width={600}
                height={500}
                priority
                className={styles.media}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
