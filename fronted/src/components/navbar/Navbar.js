import Link from "next/link";
import StrapiImage from "@/components/media/StrapiImage";
import styles from "./Navbar.module.css";

const SOCIAL_ICONS = {
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  tiktok: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 3v13.5a3.5 3.5 0 1 1-3.5-3.5c.4 0 .79.06 1.16.17V9.28A7 7 0 0 0 6 9a7 7 0 0 0-7 7 7 7 0 0 0 7 7 7 7 0 0 0 7-7V3h4v2.5a5 5 0 0 0 5 5V6.6a2.5 2.5 0 0 1-2.5-2.5V3z" />
    </svg>
  ),
  youtube: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.68.55 9.38.55 9.38.55s7.7 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81" />
    </svg>
  ),
  twitter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3" />
    </svg>
  ),
  whatsapp: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  ),
  link: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
};

function detectSocial(url) {
  if (!url) return null;
  const u = url.toLowerCase();
  if (u.includes("instagram")) return "instagram";
  if (u.includes("facebook")) return "facebook";
  if (u.includes("tiktok")) return "tiktok";
  if (u.includes("youtube")) return "youtube";
  if (u.includes("twitter") || u.includes("x.com")) return "twitter";
  if (u.includes("whatsapp")) return "whatsapp";
  return null;
}

function renderSocial(item) {
  if (!item?.url) return null;
  const social = detectSocial(item.url);
  return (
    <a
      key={item.url}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialIcon}
      aria-label={social || "Red social"}
    >
      {item.icono ? (
        <StrapiImage media={item.icono} width={16} height={16} alt="" />
      ) : (
        SOCIAL_ICONS[social] || SOCIAL_ICONS.link
      )}
    </a>
  );
}

function renderLink(item) {
  if (item.__component === "servicios-externos.redes-sociales") {
    return renderSocial(item);
  }

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
        className={styles.link}
      >
        {text}
      </a>
    );
  }

  return (
    <Link key={`${href}-${text}`} href={href} className={styles.link}>
      {text}
    </Link>
  );
}

export default function Navbar({ data }) {
  const logo = data?.logo;
  const nombre = data?.nombreNegocio || "";
  const links = Array.isArray(data?.links) ? data.links : [];

  const navLinks = links.filter(
    (item) => item.__component !== "servicios-externos.redes-sociales"
  );
  const socialLinks = links.filter(
    (item) => item.__component === "servicios-externos.redes-sociales"
  );

  return (
    <nav className={styles.nav} aria-label="Principal">
      <Link href="/" className={styles.brand}>
        {logo && (
          <StrapiImage
            media={logo}
            width={100}
            height={60}
            priority
            className={styles.logo}
            alt={nombre}
          />
        )}
        {nombre && <span className={styles.logoText}>{nombre}</span>}
      </Link>

      {navLinks.length > 0 && (
        <ul className={styles.list}>
          {navLinks.map((item, index) => (
            <li key={item.id ?? `link-${index}`} className={styles.item}>
              {renderLink(item)}
            </li>
          ))}
        </ul>
      )}

      {socialLinks.length > 0 && (
        <div className={styles.socialGroup}>
          <span className={styles.divider} aria-hidden="true" />
          {socialLinks.map((item, index) => (
            <span key={item.id ?? `social-${index}`}>
              {renderSocial(item)}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
}
