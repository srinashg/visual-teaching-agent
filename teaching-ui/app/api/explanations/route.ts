import { proxyRequest } from "@/lib/server/proxy";

export async function POST(request: Request) {
  return proxyRequest("/api/explanations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: await request.text(),
  });
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = new URLSearchParams({ page: params.get("page") ?? "0", size: params.get("size") ?? "8" });
  return proxyRequest(`/api/explanations?${query}`);
}
