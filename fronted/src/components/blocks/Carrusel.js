"use client";

import { useState, useEffect, useCallback } from "react";
import StrapiImage from "@/components/media/StrapiImage";
import Boton from "@/components/Boton";
import styles from "./Carrusel.module.css";

export default function Carrusel({ block }) {
  const [current, setCurrent] = useState(0);

  const bloques = Array.isArray(block) ? block : [block];
  const data = bloques[0];
  const slides = Array.isArray(data?.Cartas) ? data.Cartas : [];
  const titulo = data?.Titulo || "";
  const autoPlay = data?.autoReproductor === true;
  const velocidad = data?.velocidad || 1;
  const boton = data?.boton || null;
  const total = slides.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const interval = setInterval(next, velocidad * 2000);
    return () => clearInterval(interval);
  }, [autoPlay, velocidad, next, total]);

  if (!data || total === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        {titulo && (
          <div className="section-title">
            <h2>{titulo}</h2>
          </div>
        )}

        <div className={styles.carousel}>
          <div className={styles.viewport}>
            {slides.map((slide, i) => (
              <div
                key={slide.id ?? i}
                className={`${styles.slide} ${i === current ? styles.active : ""}`}
              >
                {slide.Imagen && (
                  <div className={styles.imgWrap}>
                    <StrapiImage
                      media={slide.Imagen}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className={styles.img}
                    />
                  </div>
                )}

                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    {slide.Titulo && <h3 className={styles.slideTitle}>{slide.Titulo}</h3>}
                    {slide.Descripcion && <p className={styles.slideDesc}>{slide.Descripcion}</p>}
                    {slide.link && (
                      <a href={slide.link} target="_blank" rel="noopener noreferrer" className={styles.slideLink}>
                        Ver más
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {total > 1 && (
            <>
              <button onClick={prev} className={styles.arrowLeft} aria-label="Anterior">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button onClick={next} className={styles.arrowRight} aria-label="Siguiente">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <div className={styles.dots}>
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
                    aria-label={`Ir a slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {boton && (
          <div className={styles.btnWrap}>
            <Boton item={boton} />
          </div>
        )}
      </div>
    </section>
  );
}
