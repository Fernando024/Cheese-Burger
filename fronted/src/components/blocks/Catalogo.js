"use client";

import { useState, useCallback, useEffect } from "react";
import StrapiImage from "@/components/media/StrapiImage";
import styles from "./Catalogo.module.css";

export default function Catalogo({ block }) {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const bloques = Array.isArray(block) ? block : [block];
  const data = bloques[0];
  if (!data) return null;

  const titulo = data.titulo || "";
  const descripcion = data.descripcion || "";
  const items = Array.isArray(data.items) ? data.items : [];

  if (items.length === 0) return null;

  const openModal = useCallback((item) => {
    setSelected(item);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, closeModal]);

  const formatPrice = (value) => {
    if (value == null) return "";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (Number.isInteger(num)) return `$${num.toLocaleString("es-MX")}`;
    return `$${num.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <section className={styles.section}>
      <div className="container">
        {titulo && (
          <div className="section-title">
            <h2>{titulo}</h2>
            {descripcion && <p>{descripcion}</p>}
          </div>
        )}

        <div className={styles.grid}>
          {items.map((item, i) => (
            <button
              key={item.id ?? i}
              className={styles.card}
              onClick={() => openModal(item)}
              type="button"
              aria-label={`Ver detalle de ${item.descripcion?.slice(0, 40) || "producto"}`}
            >
              <div className={styles.imgWrap}>
                {(Array.isArray(item.imagen) ? item.imagen[0] : item.imagen) && (
                  <StrapiImage
                    media={Array.isArray(item.imagen) ? item.imagen[0] : item.imagen}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={i === 0}
                    className={styles.img}
                  />
                )}
              </div>
              <span className={styles.badge}>
                {formatPrice(item.precio)}
              </span>
              {item.titulo && (
                <span className={styles.cardTitle}>{item.titulo}</span>
              )}
            </button>
          ))}
        </div>

        {open && selected && (
          <div className={styles.overlay} onClick={closeModal} role="presentation">
            <div
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Detalle del producto"
            >
              <div className={styles.modalAccent} />

              <button
                className={styles.closeBtn}
                onClick={closeModal}
                type="button"
                aria-label="Cerrar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className={styles.modalBody}>
                <div className={styles.modalImage}>
                  {(Array.isArray(selected.imagen) ? selected.imagen[0] : selected.imagen) && (
                    <StrapiImage
                      media={Array.isArray(selected.imagen) ? selected.imagen[0] : selected.imagen}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.modalImg}
                    />
                  )}
                  <div className={styles.modalPriceBadge}>
                    {formatPrice(selected.precio)}
                  </div>
                </div>

                <div className={styles.modalInfo}>
                  <span className={styles.modalTag}>Menú</span>
                  <h3 className={styles.modalTitle}>{selected.titulo}</h3>
                  <p className={styles.modalDesc}>
                    {selected.descripcion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
