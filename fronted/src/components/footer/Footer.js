import Link from "next/link";
import StrapiImage from "@/components/media/StrapiImage";
import styles from "./Footer.module.css";

function renderColumnLink(item) {
  const href = item?.url || "#";
  const text = item?.texto ?? "";
  const isExternal = item?.abrirNuevaPestana === true;

  if (!text) return null;

  if (isExternal) {
    return (
      <a
        key={`${href}-${text}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.colLink}
      >
        {text}
      </a>
    );
  }

  return (
    <Link key={`${href}-${text}`} href={href} className={styles.colLink}>
      {text}
    </Link>
  );
}

function renderSocial(item) {
  if (!item?.url) return null;
  return (
    <a
      key={item.url}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialIcon}
      aria-label="Red social"
    >
      {item.icono ? (
        <StrapiImage media={item.icono} width={20} height={20} alt="" />
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      )}
    </a>
  );
}

function renderBloque(item) {
  if (item.__component === "servicios-externos.redes-sociales") {
    return renderSocial(item);
  }

  if (item.__component === "bloques-pie-pagina.columnafooter") {
    const titulo = item.tituloColumna || "";
    const enlaces = Array.isArray(item.enlaces) ? item.enlaces : [];

    return (
      <div key={item.id} className={styles.columna}>
        {titulo && <h4 className={styles.colTitle}>{titulo}</h4>}
        {enlaces.length > 0 && (
          <div className={styles.colLinks}>
            {enlaces.map((link, i) => (
              <span key={link.id ?? i}>{renderColumnLink(link)}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default function Footer({ data }) {
  const logo = data?.logo;
  const nombre = data?.nombreNegocio || "";
  const bloques = Array.isArray(data?.bloquesPiepagina) ? data.bloquesPiepagina : [];

  const socialItems = bloques.filter(
    (b) => b.__component === "servicios-externos.redes-sociales"
  );
  const columnItems = bloques.filter(
    (b) => b.__component === "bloques-pie-pagina.columnafooter"
  );

  return (
    <div className={styles.footerInner}>
        {(logo || nombre) && (
          <div className={styles.brand}>
            <Link href="/" className={styles.logoWrapper}>
              {logo && (
                <StrapiImage media={logo} width={100} height={60} className={styles.logo} alt={nombre} />
              )}
              {nombre && <span className={styles.logoText}>{nombre}</span>}
            </Link>
          </div>
        )}

        {columnItems.length > 0 && (
          <div className={styles.columns}>
            {columnItems.map((item) => renderBloque(item))}
          </div>
        )}

        {socialItems.length > 0 && (
          <div className={styles.socialSection}>
            <p className={styles.socialTitle}>Síguenos en todas nuestras redes</p>
            <div className={styles.socialRow}>
              {socialItems.map((item, i) => (
                <span key={item.id ?? i}>{renderSocial(item)}</span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} {nombre}. Todos los derechos reservados.
          </p>
        </div>
    </div>
  );
}
