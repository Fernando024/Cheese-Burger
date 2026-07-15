import styles from "./Youtube.module.css";

function extractYoutubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function Youtube({ block }) {
  const bloques = Array.isArray(block) ? block : [block];
  const data = bloques[0];
  if (!data) return null;

  const titulo = data.tituloSeccion || "";
  const url = data.youtubeUrl || "";
  const anchoCompleto = data.anchoCompleto === true;

  const videoId = extractYoutubeId(url);

  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <section className={styles.section}>
      <div className={`container ${anchoCompleto ? "" : styles.centered}`}>
        {titulo && (
          <div className="section-title">
            <h2>{titulo}</h2>
          </div>
        )}

        <div className={`${styles.wrapper} ${anchoCompleto ? styles.full : styles.contained}`}>
          <iframe
            src={embedUrl}
            title={titulo || "Video de YouTube"}
            className={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
