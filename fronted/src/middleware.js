import { NextResponse } from "next/server";

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  const response = NextResponse.next({ request: { headers: requestHeaders } });

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  response.headers.set(
    "Content-Security-Policy",
    `frame-ancestors 'self' ${strapiUrl}`
  );

  return response;
}
