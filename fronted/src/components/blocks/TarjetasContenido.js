import StrapiImage from "@/components/media/StrapiImage";
import Boton from "@/components/Boton";
import styles from "./TarjetasContenido.module.css";

export default function TarjetasContenido({ block }) {
  const bloques = Array.isArray(block) ? block : [block];

  return (
    <>
      {bloques.map((data) => {
        if (!data) return null;
        const titulo = data.titulo || "";
        const descripcion = data.descripcion || "";
        const imagen = data.imagen || null;
        const categoria = data.categoria || "";
        const fecha = data.fecha || "";
        const destacado = data.destacado === true;
        const botones = Array.isArray(data.boton) ? data.boton : [];
        const caracteristicas = Array.isArray(data.caracteristicas)
          ? data.caracteristicas
          : [];

        if (!titulo && !imagen) return null;

        return (
          <article
            key={data.id ?? "tc"}
            className={`${styles.card} ${destacado ? styles.destacado : ""}`}
          >
            {imagen && (
              <div className={styles.imgWrap}>
                <StrapiImage
                  media={imagen}
                  width={400}
                  height={250}
                  className={styles.img}
                />
              </div>
            )}

            <div className={styles.body}>
              <div className={styles.meta}>
                {categoria && <span className={styles.cat}>{categoria}</span>}
                {fecha && <span className={styles.fecha}>{fecha}</span>}
                {destacado && <span className={styles.badge}>Destacado</span>}
              </div>

              {titulo && <h3 className={styles.title}>{titulo}</h3>}
              {descripcion && <p className={styles.desc}>{descripcion}</p>}

              {caracteristicas.length > 0 && (
                <ul className={styles.features}>
                  {caracteristicas.map((c, i) => (
                    <li key={c.id ?? i} className={styles.featureItem}>
                      <svg className={styles.check} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {c.Titulo || ""}
                    </li>
                  ))}
                </ul>
              )}

              {botones.length > 0 && (
                <div className={styles.btns}>
                  {botones.map((b, i) => (
                    <Boton key={b.id ?? i} item={b} outline={i > 0} />
                  ))}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </>
  );
}
