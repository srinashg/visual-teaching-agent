"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listExplanations } from "@/lib/api";
import type { ExplanationPage } from "@/types/explanation";

const PAGE_SIZE = 8;

export function HistoryList() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<ExplanationPage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    listExplanations(page, PAGE_SIZE)
      .then((result) => { if (active) { setData(result); setError(null); } })
      .catch((caught: unknown) => { if (active) setError(caught instanceof Error ? caught.message : "Could not load history."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page]);

  function changePage(next: number) {
    setLoading(true);
    setPage(next);
  }

  if (loading && !data) return <p className="loading" role="status">Loading history…</p>;
  if (error && !data) return <p className="panel error" role="alert">{error}</p>;
  if (!data || (data.total === 0 && !error)) return <div className="panel empty">No explanations yet. <Link href="/">Ask your first question →</Link></div>;

  return (
    <div aria-busy={loading}>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="history-list">
        {data.items.map((item) => (
          <Link key={item.id} href={`/explanations/${item.id}`} className="history-item">
            <div><span className="eyebrow">{item.difficulty.toUpperCase()} · {new Date(item.created_at).toLocaleDateString()}</span><h2>{item.question}</h2><p>{item.explanation}</p></div>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
      {data.total > PAGE_SIZE && (
        <div className="pagination">
          <button disabled={page === 0 || loading} onClick={() => changePage(page - 1)}>← Previous</button>
          <span>Page {page + 1} of {Math.ceil(data.total / PAGE_SIZE)}</span>
          <button disabled={(page + 1) * PAGE_SIZE >= data.total || loading} onClick={() => changePage(page + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
}
