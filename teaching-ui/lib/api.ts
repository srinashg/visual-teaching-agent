import type { Explanation, ExplanationCreate, ExplanationPage } from "@/types/explanation";

async function readResponse<T>(response: Response): Promise<T> {
  if (response.ok) return (await response.json()) as T;

  let detail = "Something went wrong. Please try again.";
  try {
    const body = (await response.json()) as { detail?: string; message?: string };
    if (typeof body.detail === "string") detail = body.detail;
    else if (typeof body.message === "string") detail = body.message;
  } catch {
    // Keep the fallback for non-JSON errors.
  }
  throw new Error(detail);
}

export async function createExplanation(request: ExplanationCreate): Promise<Explanation> {
  const response = await fetch("/api/explanations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  return readResponse<Explanation>(response);
}

export async function listExplanations(page: number, size = 8): Promise<ExplanationPage> {
  const response = await fetch(`/api/explanations?page=${page}&size=${size}`, { cache: "no-store" });
  return readResponse<ExplanationPage>(response);
}

export async function getExplanation(id: string): Promise<Explanation> {
  const response = await fetch(`/api/explanations/${encodeURIComponent(id)}`, { cache: "no-store" });
  return readResponse<Explanation>(response);
}
