import { createFileRoute, Link } from "@tanstack/react-router";

import { DemoLayout, Note, Section } from "@/components/DemoChrome";
import { PropertyCard } from "@/components/PropertyCard";
import { images, properties } from "@/lib/trd-data";

const title = "Invest in Dubai — TheRealtorDubai V2 concept demo";
const description =
  "Concept demo (not the live website) of an Invest in Dubai page built around process and guidance, with no yield, return or appreciation claims.";

export const Route = createFileRoute("/invest")({
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
  component: Invest,
});

const steps = [
  {
    t: "1. Define the brief",
    d: "Budget, purpose, holding intention and preferred areas are captured up front so the shortlist is relevant rather than exhaustive.",
  },
  {
    t: "2. Shortlist publicly listed stock",
    d: "The advisor works from live listings — project, area, size, layout and asking price — instead of generic market promises.",
  },
  {
    t: "3. Review with an advisor",
    d: "Questions on service charges, tenancy status, cheque structures and handover are answered by the consultant, in writing, per property.",
  },
  {
    t: "4. Proceed with representation",
    d: "The brokerage publicly describes representing buyers through its “Real Estate Concierge” service and working with committed sellers.",
  },
];

function Invest() {
  const saleListings = properties.filter((p) => p.purpose === "buy").slice(0, 3);

  return (
    <DemoLayout>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={images.invest}
          alt="Illustrative concept image of Business Bay towers at blue hour"
          width={1400}
          height={800}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/75 to-primary/40" />
        <div className="relative mx-auto max-w-7xl px-5 py-24">
          <p className="eyebrow text-sand">Invest</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold text-primary-foreground sm:text-5xl">
            Invest in Dubai with advice, not projections
          </h1>
          <p className="mt-5 max-w-xl text-primary-foreground/85">
            This concept page is deliberately built around process, questions and representation. It
            states no rental yields, price appreciation, ROI or guaranteed returns.
          </p>
        </div>
      </section>

      <Section eyebrow="How the process works" title="Four steps, no promises">
        <div className="grid gap-6 sm:grid-cols-2">
          {steps.map((s) => (
            <div key={s.t} className="rounded-sm border border-border bg-card p-6">
              <h2 className="font-display text-lg font-semibold">{s.t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Note>
            No financial performance content appears on this page by design. Yield, appreciation,
            payback and “guaranteed return” figures cannot be substantiated from public content, and
            in a real build they would require compliance review before publication.
          </Note>
        </div>
      </Section>

      <Section
        eyebrow="Questions to bring to your advisor"
        title="What the concept prompts investors to ask"
        className="border-y border-border bg-secondary/40"
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Is the unit currently tenanted, and on what terms?",
            "What is the annual service charge for this project?",
            "How is the payment or cheque structure typically handled here?",
            "Which comparable units in this project have recently transacted?",
            "What are the transfer and agency costs for this transaction?",
            "For off-plan: what is the payment plan and stated handover?",
          ].map((q) => (
            <li
              key={q}
              className="flex gap-3 rounded-sm border border-border bg-card px-5 py-4 text-sm"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brass" aria-hidden="true" />
              {q}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Publicly listed sale properties"
        title="Start from real listings"
        action={
          <Link
            to="/properties"
            search={{ intent: "invest" }}
            className="rounded-sm border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary"
          >
            Open invest search
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saleListings.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </Section>
    </DemoLayout>
  );
}
