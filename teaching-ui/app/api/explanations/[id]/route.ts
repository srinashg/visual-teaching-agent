import { proxyRequest } from "@/lib/server/proxy";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyRequest(`/api/explanations/${encodeURIComponent(id)}`);
}
