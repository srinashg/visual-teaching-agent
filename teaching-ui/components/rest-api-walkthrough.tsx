"use client";

import { useState } from "react";
import { restApiSteps, type RestApiStep } from "@/lib/rest-api-steps";

export function RestApiWalkthrough() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = restApiSteps[stepIndex];
  const lastStepIndex = restApiSteps.length - 1;

  return (
    <section className="walkthrough" aria-label="REST API walkthrough">
      <div className="walkthrough-topline">
        <span>Step {stepIndex + 1} of {restApiSteps.length}</span>
        <span>GET /books</span>
      </div>
      <div
        className="walkthrough-progress"
        role="progressbar"
        aria-label="Walkthrough progress"
        aria-valuemin={1}
        aria-valuemax={restApiSteps.length}
        aria-valuenow={stepIndex + 1}
      >
        <span style={{ width: `${((stepIndex + 1) / restApiSteps.length) * 100}%` }} />
      </div>

      <div className="visual-stage">
        <DesktopDiagram step={step} />
        <MobileDiagram step={step} />
      </div>

      <div className="walkthrough-bottom">
        <div className="walkthrough-caption" aria-live="polite" aria-atomic="true">
          <span className="eyebrow">STEP {String(stepIndex + 1).padStart(2, "0")}</span>
          <h2>{step.title}</h2>
          <p>{step.explanation}</p>
        </div>
        <div className="walkthrough-controls" aria-label="Walkthrough controls">
          <button type="button" className="walkthrough-secondary" onClick={() => setStepIndex(0)} disabled={stepIndex === 0}>Restart</button>
          <button type="button" className="walkthrough-secondary" onClick={() => setStepIndex((current) => current - 1)} disabled={stepIndex === 0}>← Back</button>
          <button type="button" className="walkthrough-primary" onClick={() => setStepIndex((current) => current + 1)} disabled={stepIndex === lastStepIndex}>Next →</button>
        </div>
      </div>
    </section>
  );
}

function DiagramNode({ x, y, title, detail, active }: {
  x: number;
  y: number;
  title: string;
  detail: string;
  active: boolean;
}) {
  return (
    <g className={active ? "diagram-node diagram-node-active" : "diagram-node"}>
      <rect x={x} y={y} width="210" height="105" rx="18" />
      <text className="diagram-node-title" x={x + 105} y={y + 41} textAnchor="middle">{title}</text>
      <text className="diagram-node-detail" x={x + 105} y={y + 72} textAnchor="middle">{detail}</text>
    </g>
  );
}

function DesktopDiagram({ step }: { step: RestApiStep }) {
  return (
    <svg className="diagram diagram-desktop" viewBox="0 0 800 350" role="img" aria-label={`Browser client and API server. ${step.explanation}`}>
      <defs>
        <marker id="request-arrow-desktop" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#12756e" /></marker>
        <marker id="response-arrow-desktop" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4775ad" /></marker>
      </defs>
      <DiagramNode x={55} y={120} title="Browser (client)" detail={step.clientDetail} active={step.activeNode === "client"} />
      <DiagramNode x={535} y={120} title="API server" detail={step.serverDetail} active={step.activeNode === "server"} />
      {step.showRequest && <g className="diagram-request"><path d="M 280 146 H 516" markerEnd="url(#request-arrow-desktop)" /><text x="398" y="128" textAnchor="middle">GET /books</text></g>}
      {step.showResponse && <g className="diagram-response"><path d="M 520 206 H 280" markerEnd="url(#response-arrow-desktop)" /><text x="400" y="241" textAnchor="middle">200 OK · JSON</text></g>}
    </svg>
  );
}

function MobileDiagram({ step }: { step: RestApiStep }) {
  return (
    <svg className="diagram diagram-mobile" viewBox="0 0 360 460" role="img" aria-label={`Browser client and API server. ${step.explanation}`}>
      <defs>
        <marker id="request-arrow-mobile" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#12756e" /></marker>
        <marker id="response-arrow-mobile" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4775ad" /></marker>
      </defs>
      <DiagramNode x={75} y={25} title="Browser (client)" detail={step.clientDetail} active={step.activeNode === "client"} />
      <DiagramNode x={75} y={320} title="API server" detail={step.serverDetail} active={step.activeNode === "server"} />
      {step.showRequest && <g className="diagram-request"><path d="M 125 146 V 301" markerEnd="url(#request-arrow-mobile)" /><text x="111" y="235" textAnchor="end">GET /books</text></g>}
      {step.showResponse && <g className="diagram-response"><path d="M 235 302 V 147" markerEnd="url(#response-arrow-mobile)" /><text x="250" y="228" textAnchor="start">200 OK</text><text x="250" y="249" textAnchor="start">JSON</text></g>}
    </svg>
  );
}
