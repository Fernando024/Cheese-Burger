'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StrapiLivePreview() {
  const router = useRouter();

  useEffect(() => {
    const handleMessage = (message) => {
      const { origin, data } = message;

      if (origin !== process.env.NEXT_PUBLIC_STRAPI_URL) {
        return;
      }

      if (data?.type === "strapiUpdate") {
        router.refresh();
      } else if (data?.type === "previewScript") {
        const script = window.document.createElement("script");
        script.textContent = data.payload?.script;
        window.document.head.appendChild(script);
      }
    };

    window.addEventListener("message", handleMessage);

    window.parent?.postMessage({ type: "previewReady" }, "*");

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  return null;
}
