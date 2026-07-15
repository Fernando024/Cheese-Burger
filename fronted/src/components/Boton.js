import Link from "next/link";
import styles from "./Boton.module.css";

export default function Boton({ item, className, outline }) {
  const text = item?.texto ?? "";
  const href = item?.url || "";
  const isExternal = item?.abrirNuevaPestana === true;

  if (!text) return null;

  const cls = `${styles.btn} ${outline ? styles.outline : styles.solid} ${className || ""}`;

  if (!href) {
    return (
      <button className={cls} type="button">
        <span className={styles.text}>{text}</span>
      </button>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        <span className={styles.text}>{text}</span>
        <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      <span className={styles.text}>{text}</span>
      <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </Link>
  );
}
