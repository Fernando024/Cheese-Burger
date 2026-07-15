"use client";

import { useState, useEffect } from "react";
import styles from "./Mapa.module.css";

function convertirUrlAMapaEmbed(url) {
  if (!url) return null;

  if (url.includes("output=embed")) return url;

  const coords = url.match(/@?(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coords) {
    return `https://www.google.com/maps?q=${coords[1]},${coords[2]}&output=embed`;
  }

  const place = url.match(/place\/([^/]+)/);
  if (place) {
    return `https://www.google.com/maps?q=${encodeURIComponent(place[1].replace(/\+/g, " "))}&output=embed`;
  }

  const query = url.match(/[?&]q=([^&]+)/);
  if (query) {
    return `https://www.google.com/maps?q=${query[1]}&output=embed`;
  }

  return null;
}

export default function Mapa({ block }) {
  const bloques = Array.isArray(block) ? block : [block];
  const data = bloques[0];
  const titulo = data?.titulo || "";
  const mapUrl = data?.mapUrl || "";
  const anchoCompleto = data?.anchoCompleto === true;

  const needsFetch = mapUrl.includes("maps.app.goo.gl") && !convertirUrlAMapaEmbed(mapUrl);
  const [resolvedUrl, setResolvedUrl] = useState(null);

  useEffect(() => {
    if (!needsFetch) return;

    fetch("/api/resolve-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: mapUrl }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.resolvedUrl) {
          setResolvedUrl(res.resolvedUrl);
        }
      })
      .catch(() => {});
  }, [needsFetch, mapUrl]);

  if (!data || !mapUrl) return null;

  const embedUrl = needsFetch
    ? convertirUrlAMapaEmbed(resolvedUrl)
    : convertirUrlAMapaEmbed(mapUrl);

  return (
    <section className={styles.section}>
      <div className={`container ${anchoCompleto ? "" : styles.centered}`}>
        {titulo && (
          <div className="section-title">
            <h2>{titulo}</h2>
          </div>
        )}

        {embedUrl ? (
          <div className={styles.wrapper}>
            <iframe
              src={embedUrl}
              title={titulo || "Ubicación en Google Maps"}
              className={styles.iframe}
              loading="lazy"
              allowFullScreen
            />
          </div>
        ) : (
          <div className={styles.placeholder}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
            </svg>
            <p>Mapa no disponible</p>
          </div>
        )}
      </div>
    </section>
  );
}
