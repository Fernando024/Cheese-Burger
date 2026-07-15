import StrapiImage from "@/components/media/StrapiImage";
import Boton from "@/components/Boton";
import styles from "./TarjetasPrecios.module.css";

export default function TarjetasPrecios({ block }) {
  const bloques = Array.isArray(block) ? block : [block];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        {bloques.map((data, index) => {
          if (!data) return null;

          const titulo = data.titulo || "";
          const subtitulo = data.subtitulo || "";
          const descripcion = data.descripcion || "";
          const precio = data.precio;
          const moneda = data.moneda || "";
          const notaPrecio = data.nota_precio || "";
          const insignia = data.insignia || "";
          const logo = data.logo || null;
          const caracteristicas = Array.isArray(data.caracteristicas)
            ? data.caracteristicas
            : [];
          const boton = data.boton || null;

          return (
            <article key={data.id ?? `precio-${index}`} className={styles.card}>
              {insignia && <span className={styles.badge}>{insignia}</span>}

              {logo && (
                <div className={styles.logoWrap}>
                  <StrapiImage
                    media={logo}
                    width={60}
                    height={60}
                    className={styles.logo}
                  />
                </div>
              )}

              {titulo && <h3 className={styles.title}>{titulo}</h3>}
              {subtitulo && <p className={styles.subtitle}>{subtitulo}</p>}

              {precio !== null && precio !== undefined && (
                <div className={styles.priceSection}>
                  <span className={styles.price}>
                    <span className={styles.symbol}>{moneda}</span>
                    {Number(precio).toLocaleString("es-MX", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  {notaPrecio && <span className={styles.note}>{notaPrecio}</span>}
                </div>
              )}

              {descripcion && (
                <div
                  className={styles.desc}
                  dangerouslySetInnerHTML={{ __html: descripcion }}
                />
              )}

              {caracteristicas.length > 0 && (
                <ul className={styles.features}>
                  {caracteristicas.map((c, i) => (
                    <li key={c.id ?? i} className={styles.feature}>
                      <svg className={styles.check} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {c.texto || ""}
                    </li>
                  ))}
                </ul>
              )}

              {boton && (
                <div className={styles.btnWrap}>
                  <Boton item={boton} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
