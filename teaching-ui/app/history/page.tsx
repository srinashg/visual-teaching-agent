import type { Metadata } from "next";
import { HistoryList } from "@/components/history-list";

export const metadata: Metadata = { title: "History | Visual Teaching Agent" };

export default function HistoryPage() {
  return (
    <main className="container content-page">
      <span className="eyebrow">PICK UP WHERE YOU LEFT OFF</span>
      <h1>Past explanations</h1>
      <p className="intro">Return to a question and review what you learned.</p>
      <HistoryList />
    </main>
  );
}
