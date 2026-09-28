import { QuestionForm } from "@/components/question-form";

export default function Home() {
  return (
    <main className="container home">
      <div className="eyebrow">UNDERSTAND THE HOW AND WHY</div>
      <h1>What would you like to understand?</h1>
      <p className="intro">Ask a question and get a clear explanation, a concrete example, a common mistake, and a question to check your understanding.</p>
      <QuestionForm />
      <div className="milestone-note">
        <span className="note-dot" />
        <span>This first milestone uses text explanations. Interactive visual steps are coming in a later milestone.</span>
      </div>
    </main>
  );
}
