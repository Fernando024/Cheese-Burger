import StrapiImage from "@/components/media/StrapiImage";
import styles from "./Tarjetas.module.css";

export default function Tarjetas({ block }) {
  const bloques = Array.isArray(block) ? block : [block];
  const data = bloques[0];
  if (!data) return null;

  const titulo = data.Titulo || "";
  const tarjetas = Array.isArray(data.Tarjetas) ? data.Tarjetas : [];

  if (tarjetas.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        {titulo && (
          <div className="section-title">
            <h2>{titulo}</h2>
          </div>
        )}
        <div className={styles.grid}>
          {tarjetas.map((item, i) => (
            <div key={item.id ?? i} className={styles.card}>
              {item.Imagen && (
                <div className={styles.iconWrap}>
                  <StrapiImage
                    media={item.Imagen}
                    width={50}
                    height={50}
                    className={styles.icon}
                  />
                </div>
              )}
              {item.Titulo && <h3 className={styles.cardTitle}>{item.Titulo}</h3>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
