"use client";

import { useState } from "react";
import styles from "./PreguntasFrecuentes.module.css";

export default function PreguntasFrecuentes({ block }) {
  const [openId, setOpenId] = useState(null);

  const bloques = Array.isArray(block) ? block : [block];
  const data = bloques[0];
  if (!data) return null;

  const titulo = data.Titulo || "";
  const preguntas = Array.isArray(data.Preguntas) ? data.Preguntas : [];

  if (preguntas.length === 0 && !titulo) return null;

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        {titulo && <h2 className={styles.title}>{titulo}</h2>}

        <div className={styles.list}>
          {preguntas.map((item, i) => {
            const id = item.id ?? i;
            const isOpen = openId === id;

            return (
              <div key={id} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
                <button
                  className={styles.question}
                  onClick={() => setOpenId(isOpen ? null : id)}
                  aria-expanded={isOpen}
                >
                  <span>{item.titulo_preguntas || ""}</span>
                  <svg
                    className={styles.icon}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className={styles.answer}
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className={styles.answerInner}>
                    <div
                      className={styles.answerText}
                      dangerouslySetInnerHTML={{ __html: item.descripcion || "" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
