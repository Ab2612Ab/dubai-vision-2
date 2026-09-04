import { createFileRoute, Link } from "@tanstack/react-router";

import { DemoLayout, Note, Section } from "@/components/DemoChrome";
import { agents, teamOrder } from "@/lib/trd-data";

const title = "Our team — TheRealtorDubai V2 concept demo";
const description =
  "Concept demo (not the live website) of the team page, showing only the consultants and roles published on therealtordubai.com.";

export const Route = createFileRoute("/team/")({
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
  component: Team,
});

function Team() {
  return (
    <DemoLayout>
      <Section
        eyebrow="Team"
        title="The consultants published on the live site"
        intro="Names and roles are exactly as published. Monograms stand in for portraits, since team photography cannot be reused in a concept demo."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamOrder.map((slug) => {
            const a = agents[slug]!;
            return (
              <div key={slug} className="rounded-sm border border-border bg-card p-6">
                <div className="grid size-16 place-items-center rounded-full bg-sand font-display text-xl font-semibold text-brass-deep">
                  {a.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
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
                    No public profile page is published for this consultant, so this concept does
                    not create one.
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-8">
          <Note>
            The live site also credits listing agents whose profiles are not published (for example
            Tarek Kabbani). Their names appear on listings only, exactly as published.
          </Note>
        </div>
      </Section>
    </DemoLayout>
  );
}
