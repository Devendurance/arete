import Link from "next/link";
import type { ReactNode } from "react";

const navigation = [
  { href: "/", label: "Today" }, { href: "/challenge", label: "Practice" },
  { href: "/leaderboard", label: "Archive" }, { href: "/profile", label: "My record" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return <div className="page-shell"><a className="skip-link" href="#main-content">Skip to content</a><header className="site-header"><nav className="site-container site-nav" aria-label="Primary navigation"><Link className="brand" href="/" aria-label="Arete home">Arete <span className="brand-mark">/ RECORD</span></Link><ul className="nav-links">{navigation.map((item) => <li key={item.href}><Link className="nav-link" href={item.href}>{item.label}</Link></li>)}</ul></nav></header><main id="main-content" className="site-main site-container">{children}</main><footer className="site-footer"><div className="site-container footer-grid"><div><p className="footer-title">Arete</p><p className="footer-copy">A daily practice that keeps an earned record of verified skill for Nimiq Pay.</p></div><div><p className="micro-label">Explore</p><div className="footer-links"><Link href="/challenge">Today&apos;s practice</Link><Link href="/leaderboard">Verification archive</Link><Link href="/profile">My record</Link><Link href="/sponsor">Sponsor safeguards</Link></div></div><div><p className="micro-label">Disclosure</p><p className="disclosure">Free to play · Skill only · Sponsor-funded</p></div></div></footer></div>;
}

export function Eyebrow({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "review" | "proof" | "ink" }) { return <p className={`eyebrow ${tone}`}>{children}</p>; }
export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) { return <Link className={variant === "primary" ? "button-primary" : "button-secondary"} href={href}>{children}</Link>; }
export function PlaceholderButton({ children }: { children: ReactNode }) { return <button type="button" disabled className="button-disabled">{children}</button>; }
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) { return <section className={`card ${className}`}>{children}</section>; }

export function Scoreline({ state = "pending", className = "" }: { state?: "pending" | "not-connected" | "empty" | "sponsor"; className?: string }) {
  const values = state === "not-connected" ? ["Arete / —", "Wallet not connected", "Score —", "Time —", "Rank —"] : state === "empty" ? ["Arete / —", "Archive empty", "Score —", "Time —", "Rank —"] : state === "sponsor" ? ["Sponsor / pending", "Campaign pending", "Eligibility applies", "Score —", "Rank —"] : ["Arete / pending", "Subject pending", "Score pending", "Time pending", "Rank pending"];
  return <div className={`scoreline ${className}`} aria-label="Scoreline status">{values.map((value, index) => <span key={value} className={index === 0 ? "scoreline-active" : undefined}>{value}</span>)}</div>;
}

export function EarnedRecordObject({ state = "pending" }: { state?: "pending" | "not-connected" }) {
  const connection = state === "not-connected" ? "Not connected" : "Pending";
  return <div className="record-object" aria-label="Earned Record preview"><div className="record-sheet"><div><div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "start" }}><div><p className="eyebrow">The Earned Record</p><h2 className="card-title" style={{ marginTop: "18px", maxWidth: "340px" }}>Excellence leaves a record.</h2></div><span className="record-stamp" aria-hidden="true">↗</span></div><div className="record-lines" style={{ marginTop: "42px" }}><div className="record-line"><p className="micro-label">Edition</p><p className="proof-text record-placeholder">Edition pending</p></div><div className="record-line"><p className="micro-label">Practice</p><p className="proof-text record-placeholder">Details pending</p></div><div className="record-line"><p className="micro-label">Record state</p><p className="proof-text record-placeholder">{connection}</p></div></div></div><div className="record-overlay"><p className="proof-text" style={{ margin: 0 }}>Record pending</p><p className="micro-label" style={{ marginTop: "4px" }}>Awaiting publication</p></div></div></div>;
}

export function SponsorLine() { return <p className="sponsor-line">Sponsor-funded · <Link className="sponsor-link" href="/sponsor#eligibility">eligibility applies</Link></p>; }
