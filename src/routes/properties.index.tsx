import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { DemoLayout, Note } from "@/components/DemoChrome";
import { PropertyCard } from "@/components/PropertyCard";
import { useFavorites } from "@/lib/favorites";
import { locations, properties, propertyTypes } from "@/lib/trd-data";
import { cn } from "@/lib/utils";

type Intent = "buy" | "rent" | "invest";

type SearchParams = {
  intent?: Intent | undefined;
  location?: string | undefined;
  type?: string | undefined;
  budget?: number | undefined;
  beds?: string | undefined;
  status?: string | undefined;
};

const title = "Property search — TheRealtorDubai V2 concept demo";
const description =
  "Concept demo (not the live website) of a clearer Dubai property search with buy, rent and invest modes, filters, sorting, list and grid views and saved properties.";

export const Route = createFileRoute("/properties/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    intent: (["buy", "rent", "invest"] as const).includes(search.intent as Intent)
      ? (search.intent as Intent)
      : undefined,
    location: typeof search.location === "string" ? search.location : undefined,
    type: typeof search.type === "string" ? search.type : undefined,
    budget: typeof search.budget === "number" ? search.budget : undefined,
    beds: typeof search.beds === "string" ? search.beds : undefined,
    status: typeof search.status === "string" ? search.status : undefined,
  }),
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
  component: Discovery,
});

function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium">{label}</span>
      {children}
    </label>
  );
}

const selectClass = "w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm";

function Discovery() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { ids, isFavorite } = useFavorites();
  const [sort, setSort] = useState("recommended");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [onlySaved, setOnlySaved] = useState(false);

  const intent: Intent = search.intent ?? "buy";
  const set = (patch: SearchParams) =>
    void navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const activeFilters = [
    search.location,
    search.type,
    search.budget,
    search.beds,
    search.status,
  ].filter(Boolean).length;

  const results = useMemo(() => {
    let list = properties.filter((p) =>
      intent === "rent" ? p.purpose === "rent" : p.purpose === "buy",
    );
    if (search.location) list = list.filter((p) => p.area === search.location);
    if (search.type) list = list.filter((p) => p.type === search.type);
    if (search.budget) list = list.filter((p) => p.price <= search.budget!);
    if (search.beds)
      list = list.filter((p) =>
        search.beds === "studio" ? p.beds === 0 : p.beds >= Number(search.beds),
      );
    if (search.status)
      list = list.filter((p) => (search.status === "ready" ? p.status === "ready" : false));
    if (onlySaved) list = list.filter((p) => isFavorite(p.id));

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "size-desc") sorted.sort((a, b) => b.sqft - a.sqft);
    return sorted;
  }, [intent, search.location, search.type, search.budget, search.beds, search.status, onlySaved, isFavorite, sort]);

  return (
    <DemoLayout>
      <div className="mx-auto max-w-7xl px-5 py-10">
        <p className="eyebrow">Property discovery</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Find the right property in Dubai</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Search, filter and sort the publicly listed properties. Buy, rent and invest are separate
          modes so the results and the guidance match the visitor's intent.
        </p>

        <div className="mt-8 rounded-sm border border-border bg-card p-5">
          <div className="flex flex-wrap gap-2 border-b border-border pb-4">
            {(["buy", "rent", "invest"] as const).map((i) => (
              <button
                key={i}
                type="button"
                aria-pressed={intent === i}
                onClick={() => set({ intent: i })}
                className={cn(
                  "rounded-sm px-4 py-2 text-sm font-medium capitalize transition-colors",
                  intent === i
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {i}
              </button>
            ))}
          </div>

          <div className="grid gap-4 pt-5 sm:grid-cols-2 lg:grid-cols-5">
            <FilterBlock label="Location">
              <select
                value={search.location ?? ""}
                onChange={(e) => set({ location: e.target.value || undefined })}
                className={selectClass}
              >
                <option value="">All areas</option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </FilterBlock>
            <FilterBlock label="Property type">
              <select
                value={search.type ?? ""}
                onChange={(e) => set({ type: e.target.value || undefined })}
                className={selectClass}
              >
                <option value="">Any type</option>
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </FilterBlock>
            <FilterBlock label={intent === "rent" ? "Max AED / year" : "Max budget (AED)"}>
              <input
                value={search.budget ?? ""}
                inputMode="numeric"
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  set({ budget: v ? Number(v) : undefined });
                }}
                placeholder="Any"
                className={selectClass}
              />
            </FilterBlock>
            <FilterBlock label="Bedrooms">
              <select
                value={search.beds ?? ""}
                onChange={(e) => set({ beds: e.target.value || undefined })}
                className={selectClass}
              >
                <option value="">Any</option>
                <option value="studio">Studio</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </FilterBlock>
            <FilterBlock label="Completion">
              <select
                value={search.status ?? ""}
                onChange={(e) => set({ status: e.target.value || undefined })}
                className={selectClass}
              >
                <option value="">Any</option>
                <option value="ready">Ready</option>
                <option value="off-plan">Off-plan</option>
              </select>
            </FilterBlock>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm">
            <span className="text-muted-foreground">
              {activeFilters} filter{activeFilters === 1 ? "" : "s"} active
            </span>
            <button
              type="button"
              onClick={() =>
                void navigate({ search: { intent }, replace: true })
              }
              className="underline decoration-brass underline-offset-4"
            >
              Clear filters
            </button>
            <label className="ml-auto flex items-center gap-2">
              <input
                type="checkbox"
                checked={onlySaved}
                onChange={(e) => setOnlySaved(e.target.checked)}
              />
              Saved only ({ids.length})
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{results.length}</span> propert
            {results.length === 1 ? "y" : "ies"} found
          </p>
          <div className="flex items-center gap-3">
            <label className="text-sm">
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-sm border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="size-desc">Largest first</option>
              </select>
            </label>
            <div className="flex overflow-hidden rounded-sm border border-border">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                  className={cn(
                    "px-3 py-2 text-sm capitalize",
                    view === v ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {intent === "invest" ? (
          <div className="mt-6">
            <Note>
              Invest mode filters the same publicly listed sale properties. It deliberately shows no
              yield, appreciation, ROI or return figures — those cannot be verified from public
              content, so the concept routes investors to an advisor conversation instead.
            </Note>
          </div>
        ) : null}
        {search.status === "off-plan" ? (
          <div className="mt-6">
            <Note>
              The live site offers an Off-Plan filter, but no currently published listing states
              off-plan status, so this filter honestly returns nothing here rather than guessing.
            </Note>
          </div>
        ) : null}

        <div
          className={cn(
            "mt-8",
            view === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-5",
          )}
        >
          {results.map((p) => (
            <PropertyCard key={p.id} p={p} view={view} />
          ))}
        </div>

        {results.length === 0 ? (
          <div className="mt-10 rounded-sm border border-border bg-card p-10 text-center">
            <p className="font-display text-lg font-semibold">No properties match these filters</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try widening the budget or clearing filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setOnlySaved(false);
                void navigate({ search: { intent }, replace: true });
              }}
              className="mt-6 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Clear filters
            </button>
          </div>
        ) : null}

        <p className="mt-10 text-xs text-muted-foreground">
          Concept demo — not the live website. The live Buy | Rent page currently publishes 55
          properties; this demo uses the {properties.length} listings visible without pagination.{" "}
          <Link to="/improvements" className="underline decoration-brass underline-offset-4">
            Read the improvement summary
          </Link>
          .
        </p>
      </div>
    </DemoLayout>
  );
}
