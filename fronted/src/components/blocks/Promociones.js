"use client";

import { useState, useCallback, useEffect } from "react";
import StrapiImage from "@/components/media/StrapiImage";
import styles from "./Promociones.module.css";

function formatMXN(value) {
  if (value == null) return "";
  const num = typeof value === "string" ? parseFloat(value) : value;
  return num.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function parseDays(value) {
  if (!value) return null;
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return value.split(",").map(s => s.trim()).filter(Boolean);
  return null;
}

function DiscountLabel({ tipo, valor }) {
  if (tipo === "porcentaje" && valor) {
    return <span className={styles.discountBadge}>-{valor}%</span>;
  }
  if (tipo === "2x1") {
    return <span className={styles.discountBadge}>2x1</span>;
  }
  if (tipo === "envio_gratis") {
    return <span className={styles.discountBadge}>Envío gratis</span>;
  }
  if (tipo === "monto_fijo" && valor) {
    return <span className={styles.discountBadge}>-${valor}</span>;
  }
  return null;
}

const tipoLabels = {
  porcentaje: "Descuento %",
  monto_fijo: "Descuento fijo",
  "2x1": "2x1",
  envio_gratis: "Envío gratis",
};

export default function Promociones({ block }) {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const bloques = Array.isArray(block) ? block : [block];
  const data = bloques[0];
  if (!data) return null;

  const { titulo, descripcion, items = [], fecha_fin, dias_semana, boton_enlace } = data;

  if (!Array.isArray(items) || items.length === 0) return null;

  const openModal = useCallback((item) => {
    setSelected(item);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") closeModal(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, closeModal]);

  return (
    <section className={styles.section}>
      <div className="container">
          <div className={styles.header}>
            {titulo && <h2 className={styles.title}>{titulo}</h2>}
            {descripcion && <p className={styles.subtitle}>{descripcion}</p>}
            <div className={styles.meta}>
              {fecha_fin && (
                <span className={styles.metaValidity}>
                  Válido hasta {new Date(fecha_fin).toLocaleDateString("es-MX")}
                </span>
              )}
              {(() => {
                const days = parseDays(dias_semana);
                if (!days) return null;
                return (
                  <span className={styles.metaDays}>
                    Días: {days.join(" · ")}
                  </span>
                );
              })()}
            </div>
          </div>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <button
              key={item.id ?? i}
              className={styles.card}
              onClick={() => openModal(item)}
              type="button"
              aria-label={`Ver detalle de ${item.titulo?.slice(0, 40) || "producto"}`}
            >
              <div className={styles.imgWrap}>
                {(Array.isArray(item.imagen) ? item.imagen[0] : item.imagen) && (
                  <StrapiImage
                    media={Array.isArray(item.imagen) ? item.imagen[0] : item.imagen}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.img}
                  />
                )}
              </div>
              <div className={styles.badgeGroup}>
                <DiscountLabel tipo={item.tipo_promocion} valor={item.porcentaje_descuento} />
                {item.precio_original != null && (
                  <span className={styles.cardOriginal}>{formatMXN(item.precio_original)}</span>
                )}
                {item.precio_oferta != null && (
                  <span className={styles.cardOfferPrice}>{formatMXN(item.precio_oferta)}</span>
                )}
              </div>
              <div className={styles.cardBottom}>
                {item.titulo && (
                  <span className={styles.cardTitle}>{item.titulo}</span>
                )}
              </div>
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
              aria-label="Detalle de promoción"
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
                  <div className={styles.modalBadgeGroup}>
                    <DiscountLabel tipo={selected.tipo_promocion} valor={selected.porcentaje_descuento} />
                  </div>
                </div>

                <div className={styles.modalInfo}>
                  {selected.tipo_promocion && (
                    <span className={styles.modalTag}>{tipoLabels[selected.tipo_promocion] || selected.tipo_promocion}</span>
                  )}

                  <div className={styles.modalPriceRow}>
                    {selected.precio_oferta != null && (
                      <span className={styles.modalOffer}>{formatMXN(selected.precio_oferta)}</span>
                    )}
                    {selected.precio_original != null && (
                      <span className={styles.modalOriginal}>{formatMXN(selected.precio_original)}</span>
                    )}
                  </div>

                  <h3 className={styles.modalTitle}>{selected.titulo}</h3>

                  {selected.descripcion && (
                    <p className={styles.modalDesc}>{selected.descripcion}</p>
                  )}

                  {(() => {
                    const days = parseDays(selected.dias_semana);
                    if (!days) return null;
                    return (
                      <p className={styles.modalDays}>
                        Días: {days.join(" · ")}
                      </p>
                    );
                  })()}

                  {selected.enlace && (
                    <a
                      href={selected.enlace}
                      className={styles.modalCta}
                      target={selected.enlace.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {selected.boton || "Ver oferta"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {boton_enlace && !open && (
          <div className={styles.footerCta}>
            <a href={boton_enlace} className={styles.footerBtn}>
              Ver todas las ofertas
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
