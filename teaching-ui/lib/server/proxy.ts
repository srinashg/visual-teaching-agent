import { NextResponse } from "next/server";

const API_URL = process.env.TEACHING_API_URL ?? "http://localhost:8000";

export async function proxyRequest(path: string, init?: RequestInit): Promise<NextResponse> {
  try {
    const response = await fetch(`${API_URL.replace(/\/$/, "")}${path}`, {
      ...init,
      cache: "no-store",
      signal: AbortSignal.timeout(90_000),
    });
    const body = await response.text();
    const contentType = response.headers.get("content-type");
    return new NextResponse(body || null, {
      status: response.status,
      headers: contentType ? { "Content-Type": contentType } : undefined,
    });
  } catch {
    return NextResponse.json({ detail: "The teaching service is unavailable. Check that FastAPI is running." }, { status: 502 });
  }
}
