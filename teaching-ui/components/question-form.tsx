"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createExplanation } from "@/lib/api";

export function QuestionForm() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await createExplanation({ question: question.trim(), difficulty });
      router.push(`/explanations/${result.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not generate an explanation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="question-card" onSubmit={submit}>
      <label htmlFor="question">Your question</label>
      <textarea
        id="question"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Explain how a REST API works"
        maxLength={2000}
        minLength={1}
        required
        rows={4}
      />
      <div className="form-footer">
        <div className="level-field">
          <label htmlFor="difficulty">Explain it for a</label>
          <select id="difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>{loading ? "Creating explanation…" : "Explain it →"}</button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
    </form>
  );
}
