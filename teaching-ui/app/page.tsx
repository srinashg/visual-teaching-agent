import Link from "next/link";
import { QuestionForm } from "@/components/question-form";

export default function Home() {
  return (
    <main className="container home">
      <div className="eyebrow">UNDERSTAND THE HOW AND WHY</div>
      <h1>What would you like to understand?</h1>
      <p className="intro">Ask a question and get a clear explanation, a concrete example, a common mistake, and a question to check your understanding.</p>
      <QuestionForm />
      <section className="demo-invitation" aria-labelledby="demo-invitation-title">
        <div>
          <span className="eyebrow">TRY A VISUAL WALKTHROUGH</span>
          <h2 id="demo-invitation-title">See how a REST API works</h2>
          <p>Follow a request from the browser to an API server and back, one step at a time.</p>
        </div>
        <Link href="/demo/rest-api" className="demo-link">Open the example →</Link>
      </section>
    </main>
  );
}
