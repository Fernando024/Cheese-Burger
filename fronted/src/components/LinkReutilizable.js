import Link from "next/link";

export default function LinkReutilizable({ item, className, active }) {
  const href = item?.url || "";
  const text = item?.texto ?? "";
  const isExternal = item?.abrirNuevaPestana === true;

  if (!text) return null;

  if (!href) {
    return <span className={className}>{text}</span>;
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {text}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {text}
    </Link>
  );
}
