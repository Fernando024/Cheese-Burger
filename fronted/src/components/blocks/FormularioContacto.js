"use client";

import { useState } from "react";
import styles from "./FormularioContacto.module.css";

const DOMINIOS_INVALIDOS = [
  "yopmail.com", "guerrillamail.com", "sharklasers.com",
  "10minutemail.com", "tempmail.com", "throwaway.email",
];

function esCorreoValido(email) {
  if (!email) return false;
  const dominio = email.split("@")[1]?.toLowerCase();
  if (!dominio) return false;
  if (DOMINIOS_INVALIDOS.includes(dominio)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function esTelefonoValido(tel) {
  return /^\d{10}$/.test(tel.replace(/[\s\-()]/g, ""));
}

export default function FormularioContacto({ block }) {
  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const bloques = Array.isArray(block) ? block : [block];
  const data = bloques[0];
  if (!data) return null;

  const titulo = data.titulo || "";
  const nombreLabel = data.nombre || "Tu nombre";
  const correoLabel = data.correo || "Tu correo";
  const telefonoLabel = data.telefono || "Tu teléfono";
  const mensajeLabel = data.mensaje || "Escribe tu mensaje...";
  const botonTexto = data.boton || "Enviar";
  const mensajeExito = data.mensaje_exito || "¡Mensaje enviado exitosamente!";

  function validar() {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = "El nombre es obligatorio";
    if (!esCorreoValido(form.correo)) errs.correo = "Correo inválido";
    if (form.telefono && !esTelefonoValido(form.telefono)) errs.telefono = "Teléfono inválido (10 dígitos)";
    if (!form.mensaje.trim()) errs.mensaje = "El mensaje es obligatorio";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validar();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setStatus("success");
      setForm({ nombre: "", correo: "", telefono: "", mensaje: "" });
    } catch {
      setStatus("error");
    }
  }

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        {titulo && <h2 className={styles.title}>{titulo}</h2>}

        {status === "success" ? (
          <div className={styles.toast}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <p>{mensajeExito}</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label}>{nombreLabel}</label>
              <input
                className={`${styles.input} ${errors.nombre ? styles.inputError : ""}`}
                type="text"
                value={form.nombre}
                onChange={handleChange("nombre")}
              />
              {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{correoLabel}</label>
              <input
                className={`${styles.input} ${errors.correo ? styles.inputError : ""}`}
                type="email"
                value={form.correo}
                onChange={handleChange("correo")}
              />
              {errors.correo && <span className={styles.error}>{errors.correo}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{telefonoLabel}</label>
              <input
                className={`${styles.input} ${errors.telefono ? styles.inputError : ""}`}
                type="tel"
                value={form.telefono}
                onChange={handleChange("telefono")}
              />
              {errors.telefono && <span className={styles.error}>{errors.telefono}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{mensajeLabel}</label>
              <textarea
                className={`${styles.textarea} ${errors.mensaje ? styles.inputError : ""}`}
                rows={5}
                value={form.mensaje}
                onChange={handleChange("mensaje")}
              />
              {errors.mensaje && <span className={styles.error}>{errors.mensaje}</span>}
            </div>

            <button
              className={styles.submit}
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando..." : botonTexto}
            </button>

            {status === "error" && (
              <p className={styles.errorMsg}>Error al enviar. Intenta de nuevo.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
