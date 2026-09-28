"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getExplanation } from "@/lib/api";
import type { Explanation } from "@/types/explanation";

export function ExplanationDetail({ id }: { id: string }) {
  const [record, setRecord] = useState<Explanation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getExplanation(id)
      .then((value) => { if (active) setRecord(value); })
      .catch((caught: unknown) => { if (active) setError(caught instanceof Error ? caught.message : "Could not load this explanation."); });
    return () => { active = false; };
  }, [id]);

  if (error) return <div className="panel error" role="alert">{error} <Link href="/history">Return to history</Link></div>;
  if (!record) return <p className="loading" role="status">Loading explanation…</p>;

  return (
    <article>
      <Link className="back-link" href="/history">← History</Link>
      <div className="detail-heading">
        <span className="eyebrow">YOUR EXPLANATION · {record.difficulty.toUpperCase()}</span>
        <h1>{record.question}</h1>
        <time dateTime={record.created_at}>Saved {new Date(record.created_at).toLocaleDateString()}</time>
      </div>
      <div className="answer-grid">
        <section className="panel wide"><span className="section-number">01</span><h2>The explanation</h2><p>{record.explanation}</p></section>
        <section className="panel wide"><span className="section-number">02</span><h2>A concrete example</h2><p>{record.example}</p></section>
        <section className="panel"><span className="section-number">03</span><h2>A common mistake</h2><p>{record.common_mistake}</p></section>
        <section className="panel"><span className="section-number">04</span><h2>Check your understanding</h2><p>{record.check_question}</p></section>
      </div>
      <Link className="text-link" href="/">Ask another question →</Link>
    </article>
  );
}
