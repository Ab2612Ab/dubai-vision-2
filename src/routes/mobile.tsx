import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { DemoLayout, Note, Section } from "@/components/DemoChrome";
import {
  bedsLabel,
  buildEnquiryMessage,
  formatPrice,
  images,
  locations,
  properties,
  propertyTypes,
  statusLabel,
  type Property,
} from "@/lib/trd-data";
import { cn } from "@/lib/utils";

const title = "Mobile property journey — TheRealtorDubai V2 concept demo";
const description =
  "Concept demo (not the live website) of a mobile-first Dubai property journey: simplified search, swipeable imagery, clear pricing and sticky WhatsApp, call and viewing controls that never send anything.";

export const Route = createFileRoute("/mobile")({
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
  component: MobileJourney;
});

type Step = "search" | "results" | "detail" | "enquiry";

const steps: { key: Step; label: string }[] = [
  { key: "search", label: "1 · Search" },
  { key: "results", label: "2 · Results" },
  { key: "detail", label: "3 · Details" },
  { key: "enquiry", label: "4 · Enquiry" },
];

const intents = ["a viewing", "a call back", "the floor plan and payment details"];

function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="mx-auto w-full max-w-[26rem]">
      <div className="rounded-[2.25rem] border border-border bg-card p-2 shadow-[0_40px_80px_-50px_oklch(0.3_0.04_318/0.55)]">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-background">
          <div className="flex items-center justify-center border-b border-border/70 bg-pearl/80 py-2 text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            {label}
          </div>
          <div className="max-h-[34rem] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

function StickyBar({ onEnquire }: { onEnquire: () => void }) {
  return (
    <div className="sticky bottom-0 z-10 grid grid-cols-3 gap-2 border-t border-border bg-pearl/95 p-3 backdrop-blur">
      {[
        { label: "WhatsApp", primary: true },
        { label: "Call", primary: false },
        { label: "Schedule Viewing", primary: false },
      ].map((b) => (
        <button
          key={b.label}
          type="button"
          onClick={onEnquire}
          className={cn(
            "min-h-12 rounded-sm px-2 text-center text-xs font-semibold leading-tight",
            b.primary
              ? "bg-primary text-primary-foreground"
              : "border border-border text-foreground hover:bg-secondary",
          )}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}

function Swiper({ p }: { p: Property }) {
  const [i, setI] = useState(0);
  return (
    <div className="relative">
      <div
        className="flex snap-x snap-mandatory overflow-x-auto hide-scrollbar"
        onScroll={(e) => {
          const el = e.currentTarget;
          setI(Math.round(el.scrollLeft / Math.max(el.clientWidth, 1)));
        }}
      >
        {p.gallery.map((g, idx) => (
          <img
            key={g + idx}
            src={images[g]}
            alt={`Illustrative concept image ${idx + 1} for ${p.project}`}
            loading="lazy"
            width={1200}
            height={800}
            className="aspect-[4/3] w-full shrink-0 snap-center object-cover"
          />
        ))}
      </div>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {p.gallery.map((g, idx) => (
          <span
            key={g + idx}
            aria-hidden="true"
            className={cn(
              "size-1.5 rounded-full",
              idx === i ? "bg-brass" : "bg-white/60",
            )}
          />
        ))}
      </div>
      <p className="px-4 pt-3 text-[11px] text-muted-foreground">
        Swipe the imagery sideways. Photography is illustrative and does not depict the listed unit.
      </p>
    </div>
  );
}

function MobileJourney() {
  const [step, setStep] = useState<Step>("search");
  const [purpose, setPurpose] = useState<"buy" | "rent">("buy");
  const [area, setArea] = useState("");
  const [type, setType] = useState("");
  const [selected, setSelected] = useState<Property>(properties[0]!);
  const [intent, setIntent] = useState(intents[0]!);

  const results = properties.filter(
    (p) =>
      p.purpose === purpose && (!area || p.area === area) && (!type || p.type === type),
  );
  const message = buildEnquiryMessage(selected, intent);

  return (
    <DemoLayout>
      <Section
        eyebrow="Mobile journey"
        title="A mobile-first path from search to enquiry"
        intro="Most Dubai property browsing happens on a phone. This is a purpose-built mobile flow rather than a shrunken desktop page: fewer filters up front, price and key specs above the fold, swipeable imagery, thumb-sized targets and contact controls that stay in reach. Nothing is ever sent, dialled or opened."
      >
        <div className="mb-8 flex flex-wrap gap-2">
          {steps.map((s) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={step === s.key}
              onClick={() => setStep(s.key)}
              className={cn(
                "min-h-11 rounded-sm px-4 text-sm font-medium",
                step === s.key
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-start">
          <Phone label={step === "search" ? "Search" : step === "results" ? "Results" : step === "detail" ? "Property" : "Enquiry"}>
            {step === "search" ? (
              <div className="p-4">
                <h2 className="font-display text-lg font-semibold">Find your place in Dubai</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Three choices to start — everything else is refined after the first results.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {(["buy", "rent"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={purpose === v}
                      onClick={() => setPurpose(v)}
                      className={cn(
                        "min-h-12 rounded-sm text-sm font-semibold capitalize",
                        purpose === v
                          ? "bg-primary text-primary-foreground"
                          : "border border-border",
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <label className="mt-4 block text-sm font-medium">
                  Area
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="mt-1.5 min-h-12 w-full rounded-sm border border-input bg-background px-3 text-sm"
                  >
                    <option value="">All areas</option>
                    {locations.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="mt-4 block text-sm font-medium">
                  Property type
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1.5 min-h-12 w-full rounded-sm border border-input bg-background px-3 text-sm"
                  >
                    <option value="">Any type</option>
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => setStep("results")}
                  className="mt-5 min-h-12 w-full rounded-sm bg-primary text-sm font-semibold text-primary-foreground"
                >
                  Show {results.length} properties
                </button>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  Budget, bedrooms and completion stay one tap away on the results screen, so the
                  first step never feels like a form.
                </p>
              </div>
            ) : null}

            {step === "results" ? (
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">
                    {results.length} {purpose === "buy" ? "for sale" : "for rent"}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep("search")}
                    className="min-h-11 rounded-sm border border-border px-3 text-xs"
                  >
                    Edit search
                  </button>
                </div>
                <div className="mt-4 space-y-4">
                  {results.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelected(p);
                        setStep("detail");
                      }}
                      className="block w-full overflow-hidden rounded-sm border border-border text-left"
                    >
                      <img
                        src={images[p.gallery[0]!]}
                        alt={`Illustrative concept image for ${p.project}, ${p.area}`}
                        loading="lazy"
                        width={1200}
                        height={800}
                        className="aspect-[16/10] w-full object-cover"
                      />
                      <div className="p-3">
                        <p className="font-display text-base font-semibold">{formatPrice(p)}</p>
                        <p className="mt-0.5 text-sm">
                          {p.project} · {p.area}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {bedsLabel(p.beds)} · {p.baths} bath ·{" "}
                          {p.sqft.toLocaleString("en-US")} sq. ft.
                        </p>
                      </div>
                    </button>
                  ))}
                  {results.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No публично listed properties match. Widen the area or type.
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {step === "detail" ? (
              <div>
                <Swiper p={selected} />
                <div className="p-4">
                  <p className="font-display text-xl font-semibold">{formatPrice(selected)}</p>
                  <h2 className="mt-1 text-base font-medium">
                    {selected.project}, {selected.area}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{selected.headline}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border text-sm">
                    {[
                      ["Bedrooms", bedsLabel(selected.beds)],
                      ["Bathrooms", `${selected.baths}`],
                      ["Size", `${selected.sqft.toLocaleString("en-US")} sq. ft.`],
                      ["Completion", statusLabel(selected.status)],
                      ["Type", selected.type],
                      ["Agent", selected.listingAgent],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-card px-3 py-2.5">
                        <dt className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                          {k}
                        </dt>
                        <dd className="mt-0.5 font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <button
                    type="button"
                    onClick={() => setStep("results")}
                    className="mt-4 min-h-11 rounded-sm border border-border px-3 text-xs"
                  >
                    ← Back to results
                  </button>
                </div>
                <StickyBar onEnquire={() => setStep("enquiry")} />
              </div>
            ) : null}

            {step === "enquiry" ? (
              <div>
                <div className="p-4">
                  <h2 className="font-display text-lg font-semibold">Contact {selected.listingAgent}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selected.project}, {selected.area} · {formatPrice(selected)}
                  </p>
                  <fieldset className="mt-4">
                    <legend className="text-sm font-medium">I'd like to request</legend>
                    <div className="mt-2 space-y-2">
                      {intents.map((i) => (
                        <label
                          key={i}
                          className="flex min-h-12 items-center gap-3 rounded-sm border border-border px-3 text-sm"
                        >
                          <input
                            type="radio"
                            name="mobile-intent"
                            checked={intent === i}
                            onChange={() => setIntent(i)}
                          />
                          <span className="capitalize">{i}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="mt-4 rounded-sm border border-dashed border-brass/60 bg-sand/70 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brass-deep">
                      Prefilled WhatsApp message — nothing is sent
                    </p>
                    <pre className="mt-2 whitespace-pre-wrap font-body text-[13px] leading-relaxed">
                      {message}
                    </pre>
                  </div>
                  <p className="mt-3 text-[11px] text-muted-foreground">
                    In a real build, tapping WhatsApp would open the chat with exactly this text
                    already typed, so the visitor only has to press send. Here every control is
                    inert.
                  </p>
                </div>
                <StickyBar onEnquire={() => setStep("enquiry")} />
              </div>
            ) : null}
          </Phone>

          <div className="space-y-6">
            <div className="rounded-sm border border-border bg-card p-6">
              <p className="eyebrow">What the mobile flow changes</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Search starts with three taps.</span>{" "}
                  Buy or rent, area, type — the rest of the filters appear on the results screen.
                </li>
                <li>
                  <span className="font-medium text-foreground">Price leads every card.</span>{" "}
                  Price, project, area and the three specs that decide a shortlist sit above the
                  fold with no horizontal scrolling.
                </li>
                <li>
                  <span className="font-medium text-foreground">Imagery is swipeable.</span> Full
                  width, snap scrolling and dot indicators instead of small arrows.
                </li>
                <li>
                  <span className="font-medium text-foreground">Targets are thumb-sized.</span>{" "}
                  Every control is at least 44–48px tall with generous spacing.
                </li>
                <li>
                  <span className="font-medium text-foreground">Contact never scrolls away.</span>{" "}
                  WhatsApp, Call and Schedule Viewing stay pinned to the bottom of the property and
                  enquiry screens.
                </li>
                <li>
                  <span className="font-medium text-foreground">The message is written for them.</span>{" "}
                  The prefilled text names the property, price, specs and reference, so agents get a
                  usable enquiry instead of “is this still available?”.
                </li>
              </ul>
            </div>
            <Note>
              This is a concept demo. The WhatsApp, Call and Schedule Viewing buttons do not send a
              message, dial a number or book anything — they only move between the demo screens so
              the prefilled copy can be inspected. Photography is illustrative and property, agent
              and area details are transcribed from publicly visible pages.
            </Note>
          </div>
        </div>
      </Section>
    </DemoLayout>
  );
}
