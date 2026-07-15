import styles from "./TituloPrincipal.module.css";

export default function TituloPrincipal({ block }) {
  const bloques = Array.isArray(block) ? block : [block];

  return (
    <>
      {bloques.map((data) => {
        if (!data) return null;
        const titulo = data.titulo || "";
        const descripcion = data.descripcion || "";

        if (!titulo && !descripcion) return null;

        return (
          <section key={data.id ?? "titulo-principal"} className={styles.section}>
            <div className={`container container-sm ${styles.inner}`}>
              {titulo && <h2 className={styles.titulo}>{titulo}</h2>}
              {descripcion && <p className={styles.desc}>{descripcion}</p>}
            </div>
          </section>
        );
      })}
    </>
  );
}
