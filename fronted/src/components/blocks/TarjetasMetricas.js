import styles from "./TarjetasMetricas.module.css";

export default function TarjetasMetricas({ block }) {
  const bloques = Array.isArray(block) ? block : [block];

  if (bloques.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        {bloques.map((data, index) => {
          if (!data) return null;
          const metrica = data.Metrica || "";
          const desc = data.descripcionMetrica || "";

          if (!metrica && !desc) return null;

          return (
            <div key={data.id ?? `metrica-${index}`} className={styles.card}>
              {metrica && <span className={styles.num}>{metrica}</span>}
              {desc && <p className={styles.desc}>{desc}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
