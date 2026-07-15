import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { url } = await request.json();
    if (!url || !url.includes("maps.app.goo.gl")) {
      return NextResponse.json({ resolvedUrl: null }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return NextResponse.json({ resolvedUrl: res.url || null });
  } catch {
    return NextResponse.json({ resolvedUrl: null });
  }
}
