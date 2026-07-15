const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "").replace(/\/$/, "");

const DEFAULT_TIMEOUT_MS = 8000;
const CACHE_TAG = "strapi-content";

class StrapiFetchError extends Error {
  constructor(message, { status, cause } = {}) {
    super(message);
    this.name = "StrapiFetchError";
    this.status = status;
    if (cause) this.cause = cause;
  }
}

function buildHeaders() {
  const headers = { Accept: "application/json" };
  const token = process.env.STRAPI_API_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function buildQueryString(params) {
  if (!params || typeof params !== "object") return "";
  const parts = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const v of value) {
        parts.push(`${key}=${encodeURIComponent(String(v))}`);
      }
    } else {
      const str = String(value);
      parts.push(`${key}=${str === "*" ? "*" : encodeURIComponent(str)}`);
    }
  }
  return parts.join("&");
}

async function strapiFetch(path, { searchParams, tags, revalidate, signal } = {}) {
  if (!STRAPI_URL) {
    throw new StrapiFetchError("NEXT_PUBLIC_STRAPI_URL no está configurada.");
  }

  const qs = buildQueryString(searchParams);
  const url = `${STRAPI_URL}${path}${qs ? `?${qs}` : ""}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: buildHeaders(),
      signal: controller.signal,
      next: {
        tags: tags ?? [CACHE_TAG],
        ...(typeof revalidate === "number" ? { revalidate } : {}),
      },
    });

    if (!response.ok) {
      throw new StrapiFetchError(`Strapi respondió ${response.status} en ${path}`, {
        status: response.status,
      });
    }

    return await response.json();
  } catch (error) {
    if (error instanceof StrapiFetchError) throw error;
    throw new StrapiFetchError(`No se pudo conectar con Strapi en ${path}`, { cause: error });
  } finally {
    clearTimeout(timeout);
  }
}

function unwrapData(payload) {
  if (payload && Array.isArray(payload.data)) return payload.data;
  if (payload && payload.data && !Array.isArray(payload.data)) return [payload.data];
  return [];
}

async function safeLoader(loader) {
  try {
    return await loader();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[strapi] ${error?.message ?? error}`);
    }
    return null;
  }
}

export async function getNavbar() {
  return safeLoader(async () => {
    const payload = await strapiFetch("/api/navbar", {
      searchParams: {
        "populate[logo]": "true",
        "populate[links][on][servicios-externos.redes-sociales][populate]": "*",
        "populate[links][on][independientes.link][populate]": "*",
      },
    });
    return payload?.data ?? null;
  });
}

export async function getFooter() {
  return safeLoader(async () => {
    const payload = await strapiFetch("/api/footer", {
      searchParams: {
        "populate[logo]": "true",
        "populate[bloquesPiepagina][on][servicios-externos.redes-sociales][populate]": "*",
        "populate[bloquesPiepagina][on][bloques-pie-pagina.columnafooter][populate]": "*",
      },
    });
    return payload?.data ?? null;
  });
}

export async function getGlobal() {
  return safeLoader(async () => {
    const payload = await strapiFetch("/api/global", {
      searchParams: { "populate": "*" },
    });
    return payload?.data ?? null;
  });
}

const PAGE_POPULATE = {
  "populate[bloques][on][presentacion-pagina.seccion-principal][populate]": "*",
  "populate[bloques][on][presentacion-pagina.heroeditorial][populate]": "*",
  "populate[bloques][on][contenido.cuerpo][populate]": "*",
  "populate[bloques][on][contenido.titulo-principal][populate]": "*",
  "populate[bloques][on][contenido.tarjetas][populate]": "*",
  "populate[bloques][on][contenido.tarjetascontenido][populate]": "*",
  "populate[bloques][on][contenido.tarjetas-metricas][populate]": "*",
  "populate[bloques][on][medios-visuales.carrusel][populate]": "*",
  "populate[bloques][on][medios-visuales.galeria][populate]": "*",
  "populate[bloques][on][servicios-externos.youtube][populate]": "*",
  "populate[bloques][on][servicios-externos.mapa][populate]": "*",
  "populate[bloques][on][precios.tarjetas-precios][populate]": "*",
  "populate[bloques][on][contenido.preguntas-frecuentes][populate]": "*",
  "populate[bloques][on][servicios-externos.correo][populate]": "*",
  "populate[bloques][on][contenido.tarjeta-individual][populate]": "*",
  "populate[bloques][on][independientes.link][populate]": "*",
  "populate[bloques][on][independientes.boton][populate]": "*",
};

export async function getPageBySlug(slug) {
  if (!slug) return null;
  const payload = await strapiFetch("/api/pages", {
    searchParams: {
      "filters[slug][$eq]": slug,
      ...PAGE_POPULATE,
    },
  });
  const list = unwrapData(payload);
  return list[0] ?? null;
}

export async function getAllPageSlugs() {
  const payload = await strapiFetch("/api/pages", {
    searchParams: { "fields[0]": "slug" },
  });
  const list = unwrapData(payload);
  return list
    .map((entry) => entry?.slug)
    .filter((value) => typeof value === "string" && value.length > 0);
}

export { StrapiFetchError, CACHE_TAG };
