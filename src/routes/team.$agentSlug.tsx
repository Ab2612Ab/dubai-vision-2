import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { DemoLayout, Note } from "@/components/DemoChrome";
import { PropertyCard } from "@/components/PropertyCard";
import { agents, brand, properties } from "@/lib/trd-data";

export const Route = createFileRoute("/team/$agentSlug")({
  loader: ({ params }) => {
    const agent = agents[params.agentSlug];
    if (!agent || !agent.hasPublicProfile) throw notFound();
    return { agent };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.agent;
    const title = a ? `${a.name} — ${a.role} — concept demo` : "Profile unavailable — concept demo";
    const description = a
      ? `Concept demo (not the live website) of the agent profile for ${a.name}, ${a.role} at ${brand.legalName}, using only publicly published details.`
      : "This concept demo page is unavailable.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AgentProfile,
});

function AgentProfile() {
  const { agent } = Route.useLoaderData();
  const listings = properties.filter((p) => p.agentSlug === agent.slug);

  return (
    <DemoLayout>
      <div className="mx-auto max-w-7xl px-5 py-10">
        <Link to="/team" className="text-sm text-muted-foreground underline underline-offset-4">
          ← Back to team
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div>
            <div className="flex items-center gap-5">
              <div className="grid size-20 shrink-0 place-items-center rounded-full bg-sand font-display text-2xl font-semibold text-brass-deep">
                {agent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="eyebrow">Agent profile</p>
                <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{agent.name}</h1>
                <p className="mt-1 text-muted-foreground">{agent.role}</p>
              </div>
            </div>

            {agent.bio?.length ? (
              <div className="mt-10 space-y-4 text-sm leading-relaxed text-muted-foreground">
                {agent.bio.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            ) : null}

            {agent.expertise?.length ? (
              <div className="mt-10">
                <h2 className="font-display text-xl font-semibold">Expertise</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {agent.expertise.map((e) => (
                    <li
                      key={e}
                      className="rounded-sm border border-border bg-card px-3 py-1.5 text-sm"
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {agent.publicFacts?.length ? (
              <div className="mt-10">
                <h2 className="font-display text-xl font-semibold">Published details</h2>
                <dl className="mt-4 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
                  {agent.publicFacts.map((f) => (
                    <div key={f.label} className="bg-card px-5 py-4">
                      <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        {f.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4">
                  <Note>
                    Every figure above is quoted from this consultant's own public profile page. No
                    awards, licence numbers, testimonials or performance claims are added.
                  </Note>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm border border-border bg-card p-6">
              <p className="eyebrow">Get in touch</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Public brokerage contact details:
                <br />
                {brand.phone}
                <br />
                {brand.email}
              </p>
              <button
                type="button"
                disabled
                className="mt-5 w-full cursor-not-allowed rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground opacity-80"
              >
                Book a consultation
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                Concept demo — this action is intentionally inert.
              </p>
            </div>
          </aside>
        </div>

        {listings.length ? (
          <section className="mt-20">
            <h2 className="font-display text-xl font-semibold">
              Public listings credited to {agent.name}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Listing agent names are shown exactly as they appear on the live listing cards.
            </p>
          </section>
        ) : null}
      </div>
    </DemoLayout>
  );
}
