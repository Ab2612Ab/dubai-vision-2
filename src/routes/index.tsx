import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { DemoLayout, Note, Section } from "@/components/DemoChrome";
import { PropertyCard } from "@/components/PropertyCard";
import {
  agents,
  areaGuides,
  brand,
  images,
  locations,
  properties,
  propertyTypes,
  services,
  teamOrder,
} from "@/lib/trd-data";
import { cn } from "@/lib/utils";

const title = "Find Your Place in Dubai — TheRealtorDubai V2 concept demo";
const description =
  "Concept demo (not the live website) of a Version 2 experience for TheRealtorDubai: buy, rent, sell or invest with experienced Dubai real estate advisors.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const intents = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "sell", label: "Sell" },
  { key: "invest", label: "Invest" },
] as const;

function HeroSearch() {
  const navigate = useNavigate();
  const [intent, setIntent] = useState<(typeof intents)[number]["key"]>("buy");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  const submit = () => {
    if (intent === "sell") {
      void navigate({ to: "/improvements", hash: "seller" });
      return;
    }
    void navigate({
      to: "/properties",
      search: {
        intent: intent === "invest" ? "invest" : intent,
        ...(location ? { location } : {}),
        ...(type ? { type } : {}),
        ...(budget ? { budget: Number(budget) } : {}),
      },
    });
  };

  return (
    <div className="rounded-sm border border-border bg-card/95 p-5 shadow-[0_30px_60px_-45px_oklch(0.3_0.04_318/0.7)] backdrop-blur sm:p-6">
      <div
        role="tablist"
        aria-label="What would you like to do?"
        className="flex flex-wrap gap-2 border-b border-border pb-4"
      >
        {intents.map((i) => (
          <button
            key={i.key}
            role="tab"
            aria-selected={intent === i.key}
            onClick={() => setIntent(i.key)}
            className={cn(
              "rounded-sm px-4 py-2 text-sm font-medium transition-colors",
              intent === i.key
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {i.label}
          </button>
        ))}
      </div>

      {intent === "sell" ? (
        <div className="pt-5">
          <p className="text-sm text-muted-foreground">
            In this concept, sellers get a dedicated intake instead of a listings search. The demo
            routes you to the improvement summary where the seller flow is described — no valuation
            estimate or figure is generated, because that cannot be verified here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 pt-5 sm:grid-cols-3">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Location</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm"
            >
              <option value="">All areas</option>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Property type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm"
            >
              <option value="">Any type</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">
              Max budget {intent === "rent" ? "(AED / year)" : "(AED)"}
            </span>
            <input
              value={budget}
              onChange={(e) => setBudget(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              placeholder={intent === "rent" ? "e.g. 90000" : "e.g. 1500000"}
              className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm"
            />
          </label>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={submit}
          className="rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {intent === "sell" ? "See the seller flow" : "Search properties"}
        </button>
        <Link
          to="/properties"
          search={{ intent: "buy" }}
          className="text-sm text-muted-foreground underline decoration-brass/60 underline-offset-4 hover:text-foreground"
        >
          Browse all {properties.length} concept listings
        </Link>
      </div>
    </div>
  );
}

function Home() {
  const featured = properties.slice(0, 6);

  return (
    <DemoLayout>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={images.hero}
          alt="Illustrative concept image of the Dubai skyline at dusk"
          width={1600}
          height={1000}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/45 to-background" />
        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-20 sm:pt-28">
          <p className="eyebrow text-sand">Version 2 experience concept</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl">
            Find Your Place in Dubai
          </h1>
          <p className="mt-5 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
            Buy, rent, sell or invest with experienced Dubai real estate advisors.
          </p>
          <div className="mt-10 max-w-4xl">
            <HeroSearch />
          </div>
          <p className="mt-6 max-w-2xl text-xs text-primary-foreground/75">
            Concept demo — not the live website. Imagery is illustrative and does not depict the
            actual listed units.
          </p>
        </div>
      </section>

      <Section
        eyebrow="Featured listings"
        title="Publicly listed properties, presented with clearer hierarchy"
        intro="Every card below uses price, project, area, bedrooms, bathrooms, size, listing agent and headline exactly as published on the live site's Buy | Rent page."
        action={
          <Link
            to="/properties"
            search={{ intent: "buy" }}
            className="rounded-sm border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary"
          >
            View all listings
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How we work"
        title="What the brokerage publicly says about its approach"
        intro="No statistics, awards or testimonials are added in this concept. The three points below paraphrase only what the live site already publishes."
        className="border-y border-border bg-secondary/40"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Buyer representation",
              d: "The founder publicly describes specialising in representing buyers through a “Real Estate Concierge” service, and working with committed sellers.",
            },
            {
              t: "Sales, leasing and off-plan",
              d: "Published expertise covers residential leasing and sales, commercial sales and leasing, and off-plan sales.",
            },
            {
              t: "Multilingual guidance",
              d: "The founder's public profile lists Spanish, English, French and Italian, with many clients from Spanish-speaking backgrounds.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-sm border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">{c.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Note>
            Trust content in this concept is deliberately limited to verifiable public statements.
            Client counts, transaction records and market claims appear only on the founder's own
            profile page, where they are already published.
          </Note>
        </div>
      </Section>

      <Section
        eyebrow="Areas"
        title="Area guides currently published"
        intro="The live site publishes three area guides. The concept turns each into a richer, navigable guide — Town Square is built out in full here."
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {areaGuides.map((a) => (
            <Link
              key={a.slug}
              to="/areas/$areaSlug"
              params={{ areaSlug: a.slug }}
              className="group overflow-hidden rounded-sm border border-border bg-card"
            >
              <img
                src={images[a.image]}
                alt={`Illustrative concept image for ${a.name}`}
                loading="lazy"
                width={1400}
                height={800}
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="font-display text-lg font-semibold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.status}</p>
                </div>
                <span className="text-sm text-brass-deep">View guide →</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Services"
        title="Services listed on the live site"
        className="border-y border-border bg-secondary/40"
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li
              key={s}
              className="flex items-center gap-3 rounded-sm border border-border bg-card px-5 py-4 text-sm"
            >
              <span className="size-1.5 rounded-full bg-brass" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Team"
        title="The consultants published on the live site"
        intro="Initial monograms are used instead of portraits, because photography of the team cannot be reused in a concept demo. Roles are exactly as published."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamOrder.map((slug) => {
            const a = agents[slug]!;
            const initials = a.name
              .split(" ")
              .map((n) => n[0])
              .join("");
            return (
              <div key={slug} className="rounded-sm border border-border bg-card p-6">
                <div className="grid size-14 place-items-center rounded-full bg-sand font-display text-lg font-semibold text-brass-deep">
                  {initials}
                </div>
                <p className="mt-4 font-display text-lg font-semibold">{a.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{a.role}</p>
                {a.hasPublicProfile ? (
                  <Link
                    to="/team/$agentSlug"
                    params={{ agentSlug: slug }}
                    className="mt-4 inline-block text-sm underline decoration-brass underline-offset-4"
                  >
                    View profile
                  </Link>
                ) : (
                  <p className="mt-4 text-xs text-muted-foreground">
                    No public profile page published yet.
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <Link to="/team" className="text-sm underline decoration-brass underline-offset-4">
            See the full team page
          </Link>
        </div>
      </Section>

      <Section className="pb-24">
        <div className="rounded-sm border border-border bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <p className="eyebrow text-sand">Consultation</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold sm:text-4xl">
            Talk to an advisor before you commit to anything
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/80">
            In this concept the consultation request is a short, guided form with the property or
            area already attached. Nothing is submitted from this demo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/properties"
              search={{ intent: "buy" }}
              className="rounded-sm bg-brass px-6 py-3 text-sm font-medium text-accent-foreground"
            >
              Start with properties
            </Link>
            <Link
              to="/improvements"
              className="rounded-sm border border-primary-foreground/40 px-6 py-3 text-sm font-medium"
            >
              Read the improvement summary
            </Link>
          </div>
          <p className="mt-6 text-xs text-primary-foreground/70">
            Public contact details: {brand.phone} · {brand.email}
          </p>
        </div>
      </Section>
    </DemoLayout>
  );
}
