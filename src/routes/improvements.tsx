import { createFileRoute, Link } from "@tanstack/react-router";

import { DemoLayout, Note, Section } from "@/components/DemoChrome";

const title = "Improvement summary — TheRealtorDubai V2 concept demo";
const description =
  "Concept demo (not the live website): what this Version 2 proposal changes, why, the expected visitor and enquiry impact, incremental versus deeper work, and performance, SEO and accessibility items to validate.";

export const Route = createFileRoute("/improvements")({
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
  component: Improvements,
});

type Row = {
  what: string;
  why: string;
  visitor: string;
  enquiry: string;
};

const rows: Row[] = [
  {
    what: "A homepage that opens with intent — “Find Your Place in Dubai” plus Buy, Rent, Sell and Invest, with area, type and budget fields in the hero.",
    why: "A visitor arriving from search or social has one question: can this site show me something relevant in a few seconds? Putting the four intents and the search fields first answers it immediately.",
    visitor: "The first action is obvious and reachable without scrolling; the journey splits by intent rather than pushing everyone through one generic list.",
    enquiry: "More visitors reach a property page, which is where enquiries actually start. Sellers and investors get their own entry point instead of leaving.",
  },
  {
    what: "A dedicated property discovery page with buy / rent / invest modes, area, type, budget, bedroom and ready / off-plan filters, a live result count, clear-filters, sorting and grid or list views.",
    why: "The public listings vary widely in price, purpose and size, so browsing them as one flat list makes the visitor do the filtering mentally.",
    visitor: "Shortlisting is faster and reversible — the count and the clear-filters control make it safe to experiment, and the URL carries the search so it can be shared or returned to.",
    enquiry: "Fewer dead ends means more property pages seen per visit, and enquiries arrive already matched to a budget and area.",
  },
  {
    what: "Saved properties (favourites) that persist across the demo.",
    why: "Property choices are rarely made in one sitting, and comparison usually happens with someone else.",
    visitor: "A shortlist survives browsing and revisits without an account or a sign-up wall.",
    enquiry: "A returning visitor with a saved shortlist is much closer to a viewing request than a first-time browser.",
  },
  {
    what: "A property detail page with a large gallery, a structured specification table, and contextual enquiry, WhatsApp and call controls in a sticky rail.",
    why: "Detail pages are the decision point, and the decision needs specifics — size, bedrooms, bathrooms, purpose, completion and who to speak to — laid out consistently.",
    visitor: "The information needed to decide is in a predictable place, and the way to ask a question is always visible.",
    enquiry: "The contact step is never more than a glance away, on any scroll position.",
  },
  {
    what: "A visible prefilled enquiry message, shown before anything is sent.",
    why: "Writing the first message is the real friction in a property enquiry. Showing the exact text removes the blank-page problem and sets expectations.",
    visitor: "No wondering what to write or whether the agent will know which property is meant.",
    enquiry: "Agents receive the project, area, price, specs and a reference in the first message, so the conversation starts at the useful part instead of “which unit is this?”.",
  },
  {
    what: "A purpose-built mobile journey: simplified first-step search, swipeable imagery, price-first cards, thumb-sized targets and sticky WhatsApp / Call / Schedule Viewing controls.",
    why: "Dubai property browsing is overwhelmingly mobile, and a desktop layout narrowed to a phone hides price and buries contact controls.",
    visitor: "The flow from search to enquiry works one-handed, with the price and the next action always on screen.",
    enquiry: "The contact bar travels with the visitor, so intent turns into a message at the moment it appears rather than after a hunt for a phone number.",
  },
  {
    what: "Agent profiles carrying only publicly published details, linked from the listings they appear on.",
    why: "Advisory purchases are trust purchases; people want to know who they will be speaking to before they speak.",
    visitor: "A named, contextual person instead of an anonymous form.",
    enquiry: "Enquiries land with the right advisor, and the visitor has already chosen them.",
  },
  {
    what: "Invest and area-guide pages written as guidance — process, what to ask, community facts — with no returns, yields or performance claims.",
    why: "Investor and relocation research is a reading task before it is a buying task, and credibility comes from restraint here rather than numbers.",
    visitor: "Useful orientation without pressure or unverifiable promises.",
    enquiry: "Earlier-stage visitors have a reason to stay and a natural next step into a consultation.",
  },
  {
    what: "One consistent visual system — typography scale, spacing, restrained brass accents, unified cards and buttons — across every page.",
    why: "Consistency is most of what “premium” means on the web; mismatched components read as improvised.",
    visitor: "The site feels like one considered product, and controls behave the same way everywhere.",
    enquiry: "Trust carries straight into willingness to hand over a phone number.",
  },
];

const incremental = [
  "Homepage hero: headline, intent tabs and the search fields.",
  "Filter, sort, result count, clear-filters and grid or list controls on the existing listings page.",
  "Price-first listing cards with consistent specs and a favourite control.",
  "Consistent specification table on property detail pages.",
  "Prefilled WhatsApp and enquiry text generated from the listing data.",
  "Sticky mobile contact bar on property pages.",
  "Typography, spacing and button or card consistency pass.",
  "Per-page titles, descriptions and social preview metadata.",
];

const deeper = [
  "A structured listings data source so filters, sorting, counts and prefilled messages all read from one place.",
  "Saved properties tied to an account, with alerts when matching listings appear.",
  "Enquiry routing and tracking: which listing, which advisor, which channel, and what happened next.",
  "Off-plan and payment-plan content modelled properly, including handover and permit fields where they can be verified.",
  "Area guides as a maintained content type with linked live inventory.",
  "Map-based search and drawn-area search.",
  "Multilingual content, including Arabic with right-to-left layout.",
  "Image pipeline: responsive sizes, modern formats and an editorial photography standard.",
];

const validate = [
  {
    area: "Performance",
    items: [
      "Measure Core Web Vitals (LCP, INP, CLS) on real mobile devices and networks for the homepage, a listings page and a property page — and treat the field data, not a single lab run, as the baseline.",
      "Check whether listing and hero imagery is served in modern formats at device-appropriate sizes, and whether below-the-fold images are lazily loaded.",
      "Review how much third-party script the pages load, and whether any of it blocks first render.",
      "Test how quickly the first listing results become visible and interactive on a mid-range Android phone.",
    ],
  },
  {
    area: "SEO",
    items: [
      "Confirm each page has a unique, descriptive title and meta description, and that they match what the page is actually about.",
      "Review whether property, area-guide and agent pages have crawlable, stable URLs and are reachable through internal links, not only through filters or scripts.",
      "Test whether filtered search states should be indexable, canonicalised to a parent, or excluded — and decide deliberately.",
      "Evaluate structured data (Organisation, RealEstateListing, BreadcrumbList, FAQ where genuine) for eligibility and correctness before adding it.",
      "Check sitemap and robots coverage against the pages that actually matter commercially.",
      "Compare area-guide and project pages against the queries people use, to see where content depth is worth adding.",
    ],
  },
  {
    area: "Accessibility",
    items: [
      "Verify colour contrast for body text, muted text and buttons against WCAG AA.",
      "Walk the whole search-to-enquiry flow with a keyboard only, checking visible focus and logical order.",
      "Test the flow with a screen reader (VoiceOver on iOS, NVDA on Windows), including the gallery and filter controls.",
      "Confirm every image has a meaningful alternative text or is correctly marked decorative.",
      "Check form fields have persistent visible labels and clear, associated error messages.",
      "Check tap-target size and spacing on mobile, and that the layout survives 200% zoom and text-only scaling.",
    ],
  },
];

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-sm border border-border bg-card p-6">{children}</div>;
}

function Improvements() {
  return (
    <DemoLayout>
      <Section
        eyebrow="Improvement summary"
        title="What this Version 2 concept proposes, and why"
        intro="This is an independent design concept for a possible next version of the TheRealtorDubai experience. It is not the live website and nothing on the production site has been changed. The sections below explain each proposed change, the reasoning behind it, the effect on the visitor and the effect on enquiries, then separate the work that can ship incrementally from the work that needs deeper development."
      >
        <Note>
          Every claim below is about this concept, not about the live site. No defects, rankings,
          speeds or conversion figures are asserted anywhere — the technical section lists things to
          measure, not problems found.
        </Note>

        <div className="mt-10 space-y-6">
          {rows.map((r, i) => (
            <Card key={r.what}>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 shrink-0 font-display text-sm font-semibold text-brass-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold leading-snug">{r.what}</h3>
                  <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                    {[
                      ["Why", r.why],
                      ["Visitor impact", r.visitor],
                      ["Enquiry impact", r.enquiry],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {k}
                        </dt>
                        <dd className="mt-1.5 text-sm text-muted-foreground">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Sequencing"
        title="Incremental changes versus deeper development"
        intro="The concept is deliberately separable. The first column is presentation and content work that can be applied to the current site in small releases. The second column needs data modelling, integrations or an ongoing content process."
        className="pt-0"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <p className="eyebrow">Can be implemented incrementally</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {incremental.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brass" />
                  {i}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="eyebrow">Requires deeper development</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {deeper.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/50"
                  />
                  {i}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Items to validate"
        title="Performance, SEO and accessibility opportunities to test"
        intro="These are checks worth running, not findings. Nothing here says the current site fails any of them — each item is a measurement or review that would tell you whether there is an opportunity, and how large it is."
        className="pt-0"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {validate.map((v) => (
            <Card key={v.area}>
              <p className="eyebrow">{v.area}</p>
              <p className="mt-2 text-xs text-muted-foreground">Items to test / validate</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {v.items.map((i) => (
                  <li key={i} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brass/70"
                    />
                    {i}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section id-anchor="seller" className="pt-0">
        <div id="seller" className="scroll-mt-28 rounded-sm border border-border bg-card p-8">
          <p className="eyebrow">Selling and letting</p>
          <h2 className="mt-3 font-display text-2xl font-semibold">
            A seller and landlord path, proposed for Version 2
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            The Sell action on the concept homepage points here on purpose. A seller or landlord
            journey — how a valuation appointment works, what documents are needed, how a listing is
            marketed and how updates are reported — would need to be written with the brokerage,
            because none of it is published on the live site today. Rather than invent that content,
            this demo names it as the next piece of work.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/properties"
              className="rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Explore the property search
            </Link>
            <Link
              to="/mobile"
              className="rounded-sm border border-border px-5 py-3 text-sm font-medium hover:bg-secondary"
            >
              Open the mobile journey
            </Link>
          </div>
        </div>
      </Section>
    </DemoLayout>
  );
}
