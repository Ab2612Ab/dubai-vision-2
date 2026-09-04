import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { DemoLayout, Note } from "@/components/DemoChrome";
import { PropertyCard } from "@/components/PropertyCard";
import { useFavorites } from "@/lib/favorites";
import {
  bedsLabel,
  buildEnquiryMessage,
  formatPrice,
  getProperty,
  images,
  properties,
  statusLabel,
} from "@/lib/trd-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/properties/$propertyId")({
  loader: ({ params }) => {
    const property = getProperty(params.propertyId);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.property;
    const title = p
      ? `${p.project}, ${p.area} — concept demo`
      : "Property unavailable — concept demo";
    const description = p
      ? `Concept demo (not the live website): ${p.headline}. ${bedsLabel(p.beds)}, ${p.baths} bath, ${p.sqft} sq. ft. in ${p.area}.`
      : "This concept demo page is unavailable.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Detail,
});

const intents = ["a viewing", "a call back", "the floor plan and payment details"];

function Detail() {
  const { property: p } = Route.useLoaderData();
  const { isFavorite, toggle } = useFavorites();
  const [active, setActive] = useState(0);
  const [intent, setIntent] = useState(intents[0]!);
  const saved = isFavorite(p.id);
  const similar = properties.filter((x) => x.id !== p.id && x.purpose === p.purpose).slice(0, 3);
  const message = buildEnquiryMessage(p, intent);

  return (
    <DemoLayout>
      <div className="mx-auto max-w-7xl px-5 py-10">
        <Link
          to="/properties"
          search={{ intent: p.purpose === "rent" ? "rent" : "buy" }}
          className="text-sm text-muted-foreground underline decoration-brass/50 underline-offset-4"
        >
          ← Back to search
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <img
              src={images[p.gallery[active]!]}
              alt={`Illustrative concept image ${active + 1} for ${p.project}`}
              width={1200}
              height={800}
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
            <div className="mt-3 flex gap-3 overflow-x-auto hide-scrollbar">
              {p.gallery.map((g, i) => (
                <button
                  key={g + i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-current={i === active}
                  className={cn(
                    "w-28 shrink-0 overflow-hidden rounded-sm border-2",
                    i === active ? "border-brass" : "border-transparent opacity-70",
                  )}
                >
                  <img
                    src={images[g]}
                    alt=""
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Illustrative concept imagery — it does not depict the actual listed unit.
            </p>

            <div className="mt-10">
              <p className="eyebrow">{p.purpose === "buy" ? "For sale" : "For rent"}</p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                {p.project}, {p.area}
              </h1>
              <p className="mt-2 text-muted-foreground">{p.headline}</p>
              <p className="mt-5 font-display text-2xl font-semibold">{formatPrice(p)}</p>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-xl font-semibold">Specifications</h2>
              <dl className="mt-4 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
                {[
                  ["Project", p.project],
                  ["Area", p.area],
                  ["Property type", p.type],
                  ["Bedrooms", bedsLabel(p.beds)],
                  ["Bathrooms", `${p.baths}`],
                  ["Size", `${p.sqft.toLocaleString("en-US")} sq. ft.`],
                  ["Purpose", p.purpose === "buy" ? "Sale" : "Rent (yearly)"],
                  ["Completion", statusLabel(p.status)],
                  ["Listing agent", p.listingAgent],
                ].map(([k, v]) => (
                  <div key={k} className="bg-card px-5 py-4">
                    <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {k}
                    </dt>
                    <dd className="mt-1 text-sm font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4">
                <Note>
                  Only the specifications published on the live listing card are shown. Service
                  charges, permit numbers, handover dates, yields and returns are omitted because
                  they are not publicly verifiable here.
                </Note>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm border border-border bg-card p-6">
              <p className="eyebrow">Enquire</p>
              <p className="mt-3 font-display text-lg font-semibold">{p.listingAgent}</p>
              <p className="text-sm text-muted-foreground">Listing agent</p>

              <fieldset className="mt-5">
                <legend className="text-sm font-medium">I'd like to request</legend>
                <div className="mt-3 flex flex-col gap-2">
                  {intents.map((i) => (
                    <label key={i} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="intent"
                        checked={intent === i}
                        onChange={() => setIntent(i)}
                      />
                      <span className="capitalize">{i}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5 rounded-sm border border-dashed border-brass/60 bg-sand/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brass-deep">
                  Message preview — nothing is sent
                </p>
                <pre className="mt-3 whitespace-pre-wrap font-body text-sm text-foreground">
                  {message}
                </pre>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                {["Send enquiry", "WhatsApp this message", "Call agent"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    disabled
                    title="Disabled in this concept demo"
                    className="cursor-not-allowed rounded-sm border border-border bg-primary/95 px-5 py-3 text-sm font-medium text-primary-foreground opacity-80"
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  aria-pressed={saved}
                  className="rounded-sm border border-border px-5 py-3 text-sm font-medium hover:bg-secondary"
                >
                  {saved ? "Saved" : "Save property"}
                </button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Concept demo — enquiry, WhatsApp and call actions are intentionally inert. The
                preview above shows the exact prefilled text a real implementation would carry.
              </p>
            </div>

            <div className="mt-6 rounded-sm border border-border bg-card p-6">
              <p className="eyebrow">Mobile journey</p>
              <p className="mt-3 text-sm text-muted-foreground">
                See the purpose-built mobile version of this flow, with swipeable imagery and sticky
                contact controls.
              </p>
              <Link
                to="/mobile"
                className="mt-4 inline-block text-sm underline decoration-brass underline-offset-4"
              >
                Open the mobile concept
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-20">
          <h2 className="font-display text-xl font-semibold">Similar listings</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => (
              <PropertyCard key={s.id} p={s} />
            ))}
          </div>
        </section>
      </div>
    </DemoLayout>
  );
}
