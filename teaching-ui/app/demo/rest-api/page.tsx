import type { Metadata } from "next";
import { RestApiWalkthrough } from "@/components/rest-api-walkthrough";

export const metadata: Metadata = { title: "How a REST API works | Visual Teaching Agent" };

export default function RestApiDemoPage() {
  return (
    <main className="container content-page">
      <span className="eyebrow">INTERACTIVE EXAMPLE</span>
      <h1>How a REST API works</h1>
      <p className="intro">Watch a browser ask for data, see the server handle the request, and follow the response back.</p>
      <RestApiWalkthrough />
    </main>
  );
}
