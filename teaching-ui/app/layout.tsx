import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visual Teaching Agent",
  description: "Learn a concept one clear step at a time.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <nav className="container nav" aria-label="Main navigation">
            <Link href="/" className="brand"><span className="brand-mark">✳</span> Visual Teaching Agent</Link>
            <div className="nav-links">
              <Link href="/">Ask a question</Link>
              <Link href="/history">History</Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
