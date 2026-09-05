import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

import { brand } from "@/lib/trd-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Buy | Rent" },
  { to: "/invest", label: "Invest" },
  { to: "/areas/$areaSlug", params: { areaSlug: "town-square" }, label: "Area Guide" },
  { to: "/team", label: "Team" },
  { to: "/mobile", label: "Mobile journey" },
  { to: "/improvements", label: "Improvement summary" },
] as const;

export function ConceptBanner() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-1 px-5 py-2 text-[11px] leading-snug sm:text-xs">
        <span className="inline-flex items-center gap-2 font-semibold tracking-wide">
          <span className="inline-block size-1.5 rounded-full bg-brass" aria-hidden="true" />
          Concept demo — not live website
        </span>
        <span className="text-primary-foreground/70">
          Independent Version 2 proposal. The live site at therealtordubai.com is unchanged.
        </span>
      </div>
    </div>
  );
}

function Wordmark() {
  return (
    <Link to="/" className="group flex items-baseline gap-2">
      <span className="font-display text-lg font-semibold tracking-tight text-foreground">
        TheRealtor<span className="text-brass-deep">Dubai</span>
      </span>
      <span className="rounded-sm border border-border px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground">
        V2
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-pearl/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Wordmark />
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.slice(0, 5).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              params={"params" in item ? item.params : undefined}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/improvements"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Improvement summary
          </Link>
          <Link
            to="/properties"
            className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Browse properties
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="rounded-sm border border-border px-3 py-2 text-sm lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-border bg-pearl px-5 pb-5 pt-2 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              params={"params" in item ? item.params : undefined}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 py-3 text-sm text-foreground last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {brand.legalName}
            <br />
            {brand.address}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {brand.phone} · {brand.email}
          </p>
        </div>
        <div>
          <p className="eyebrow">Concept pages</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  params={"params" in item ? item.params : undefined}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="eyebrow">Disclosure</p>
          <p className="mt-4">
            This is a design concept created to illustrate a possible Version 2 experience. It is
            not the live website, is not published as the brand's site, and the production site has
            not been modified.
          </p>
          <p className="mt-3">
            Property, team, service and area content is transcribed from publicly visible pages on
            therealtordubai.com. Photography is illustrative and does not depict the actual listed
            units. No testimonials, awards, licence details or financial performance figures are
            shown anywhere in this demo, and no enquiry, call or message is ever sent.
          </p>
          <p className="mt-3">
            <a
              href={brand.liveSite}
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-brass/60 underline-offset-4 hover:text-foreground"
            >
              Visit the live website
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ConceptBanner />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Section({
  eyebrow,
  title,
  intro,
  children,
  className,
  action,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <section className={cn("mx-auto max-w-7xl px-5 py-16 sm:py-20", className)}>
      {(eyebrow || title || intro || action) && (
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? (
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-4xl">{title}</h2>
            ) : null}
            {intro ? <p className="mt-4 text-muted-foreground">{intro}</p> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-sm border border-border bg-secondary/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}
