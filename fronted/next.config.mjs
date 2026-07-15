const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

function parseStrapiUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    return {
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
      port: url.port || "",
      pathname: url.pathname.replace(/\/$/, ""),
    };
  } catch {
    return {
      protocol: "http",
      hostname: "localhost",
      port: "1337",
      pathname: "",
    };
  }
}

const strapiHost = parseStrapiUrl(STRAPI_URL);

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: strapiHost.protocol,
        hostname: strapiHost.hostname,
        port: strapiHost.port,
        pathname: `${strapiHost.pathname}/uploads/**`,
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
        pathname: "/**",
      },
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
  },
};

export default nextConfig;
