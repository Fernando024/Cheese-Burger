import StrapiImage from "@/components/media/StrapiImage";
import styles from "./Galeria.module.css";

export default function Galeria({ block }) {
  const bloques = Array.isArray(block) ? block : [block];
  const data = bloques[0];
  if (!data) return null;

  const titulo = data.Titulo || "";
  const descripcion = data.Descripcion || "";
  const items = Array.isArray(data.Cartas) ? data.Cartas : [];
  const columnas = data.Columnas || "3";
  const mostrarTitulos = data.MostrarTitulos !== false;
  const efecto = data.Efecto !== false;

  if (items.length === 0) return null;

  const gridClass =
    columnas === "2" ? styles.grid2 :
    columnas === "4" ? styles.grid4 :
    styles.grid3;

  return (
    <section className={styles.section}>
      <div className="container">
        {titulo && (
          <div className="section-title">
            <h2>{titulo}</h2>
            {descripcion && <p>{descripcion}</p>}
          </div>
        )}

        <div className={`${styles.grid} ${gridClass}`}>
          {items.map((item, i) => (
            <div key={item.id ?? i} className={`${styles.item} ${efecto ? styles.hover : ""}`}>
              {item.Imagen && (
                <div className={styles.imgWrap}>
                  <StrapiImage
                    media={item.Imagen}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.img}
                  />
                </div>
              )}
              {mostrarTitulos && item.Titulo && (
                <div className={styles.overlay}>
                  <h3 className={styles.overlayTitle}>{item.Titulo}</h3>
                  {item.Descripcion && <p className={styles.overlayDesc}>{item.Descripcion}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
