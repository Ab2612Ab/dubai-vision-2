import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { DemoLayout, Note, Section } from "@/components/DemoChrome";
import { PropertyCard } from "@/components/PropertyCard";
import { areaGuides, images, properties, townSquareGuide } from "@/lib/trd-data";

export const Route = createFileRoute("/areas/$areaSlug")({
  loader: ({ params }) => {
    const meta = areaGuides.find((a) => a.slug === params.areaSlug);
    if (!meta) throw notFound();
    return { meta, guide: params.areaSlug === "town-square" ? townSquareGuide : null };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.meta.name ?? "Area guide";
    const title = `${name} area guide — TheRealtorDubai V2 concept demo`;
    const description = `Concept demo (not the live website) of the ${name} area guide, using only content published on therealtordubai.com.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AreaDetail,
});

function AreaDetail() {
  const { meta, guide } = Route.useLoaderData();
  const listings = properties.filter((p) => p.area === meta.name);

  return (
    <DemoLayout>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={images[meta.image]}
          alt={`Illustrative concept image for ${meta.name}`}
          width={1400}
          height={800}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/40" />
        <div className="relative mx-auto max-w-7xl px-5 py-24">
          <p className="eyebrow text-sand">Area guide · {meta.status}</p>
          <h1 className="mt-4 text-4xl font-semibold text-primary-foreground sm:text-5xl">
            {meta.name}
          </h1>
        </div>
      </section>

      {guide ? (
        <>
          <Section eyebrow="About" title={`About ${guide.name}`} intro={guide.about}>
            <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-8">
                {guide.sections.map((s) => (
                  <article key={s.title} className="border-t border-border pt-6">
                    <h2 className="font-display text-xl font-semibold">{s.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </article>
                ))}
              </div>
              <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-sm border border-border bg-card p-6">
                  <p className="eyebrow">In a nutshell</p>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {guide.nutshell.map((n) => (
                      <li key={n} className="flex gap-3">
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-brass"
                          aria-hidden="true"
                        />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-sm border border-border bg-card p-6">
                  <p className="eyebrow">Location</p>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {guide.location.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
                <Note>
                  All guide copy is quoted or condensed from the live area guide page. No price
                  trends, yields or growth figures are added.
                </Note>
              </aside>
            </div>
          </Section>

          {listings.length ? (
            <Section
              eyebrow="Available here"
              title={`Publicly listed properties in ${guide.name}`}
              className="border-t border-border bg-secondary/40"
              action={
                <Link
                  to="/properties"
                  search={{ intent: "rent", location: meta.name }}
                  className="rounded-sm border border-border px-4 py-2.5 text-sm font-medium hover:bg-card"
                >
                  Search this area
                </Link>
              }
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((p) => (
                  <PropertyCard key={p.id} p={p} />
                ))}
              </div>
            </Section>
          ) : null}
        </>
      ) : (
        <Section eyebrow="Area guide" title={`${meta.name} guide`}>
          <Note>
            The live site publishes a guide for {meta.name}, but this concept only builds out Town
            Square in full so that no area content is invented. The same template would be applied
            to {meta.name} using its published copy.
          </Note>
          <div className="mt-6">
            <Link
              to="/areas/$areaSlug"
              params={{ areaSlug: "town-square" }}
              className="text-sm underline decoration-brass underline-offset-4"
            >
              See the fully built Town Square guide
            </Link>
          </div>
        </Section>
      )}
    </DemoLayout>
  );
}
