import type { Metadata } from "next";
import { ExplanationDetail } from "@/components/explanation-detail";

export const metadata: Metadata = { title: "Explanation | Visual Teaching Agent" };

export default async function ExplanationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <main className="container content-page"><ExplanationDetail id={id} /></main>;
}
