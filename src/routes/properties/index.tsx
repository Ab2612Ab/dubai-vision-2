import { createFileRoute, useSearch, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ChevronDown, Grid3x3, List, Heart } from "lucide-react";

import { DemoLayout, Section } from "@/components/DemoChrome";
import { PropertyCard } from "@/components/PropertyCard";
import {
  locations,
  properties,
  propertyTypes,
  type Property,
  type Purpose,
} from "@/lib/trd-data";
import { cn } from "@/lib/utils";

type SearchParams = {
  intent?: Purpose | "invest";
  location?: string;
  type?: string;
  budget?: number;
  beds?: string;
  ready?: "true" | "false";
};

const title = "Buy | Rent Properties in Dubai — TheRealtorDubai V2";
const description = "Find your next property in Dubai with experienced real estate advisors.";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  validateSearch: (search: Record<string, any>): SearchParams => ({
    intent: search.intent || "buy",
    location: search.location || "",
    type: search.type || "",
    budget: search.budget ? Number(search.budget) : undefined,
    beds: search.beds || "",
    ready: search.ready || "",
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const params = useSearch({ from: Route.id });
  const navigate = useNavigate({ from: Route.id });
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("featured");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filter properties based on search params
  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      // Purpose filter
      if (params.intent && params.intent !== "invest" && p.purpose !== params.intent) {
        return false;
      }

      // Location filter
      if (params.location && p.area !== params.location) {
        return false;
      }

      // Type filter
      if (params.type && p.type !== params.type) {
        return false;
      }

      // Budget filter
      if (params.budget) {
        if (params.budget < p.price) {
          return false;
        }
      }

      // Bedrooms filter
      if (params.beds) {
        const targetBeds = params.beds === "studio" ? 0 : Number(params.beds);
        if (p.beds !== targetBeds) {
          return false;
        }
      }

      // Ready status filter
      if (params.ready === "true" && p.status !== "ready") {
        return false;
      }

      return true;
    });

    // Apply sorting
    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [params, sort]);

  const handleClearFilters = () => {
    void navigate({
      to: "/properties",
      search: { intent: params.intent || "buy" },
    });
    setSort("featured");
  };

  const hasActiveFilters =
    params.location || params.type || params.budget || params.beds || params.ready;

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <DemoLayout>
      <Section eyebrow="Browse properties" title="Find your next home" className="pb-0">
        <div className="flex flex-wrap items-center gap-3 rounded-sm border border-border bg-secondary/40 p-4">
          <span className="text-sm font-medium">
            {filtered.length} of {properties.length} properties
            {hasActiveFilters ? " matching your search" : ""}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-sm text-muted-foreground underline decoration-brass underline-offset-2 hover:text-foreground"
            >
              Clear filters
            </button>
          )}
        </div>
      </Section>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 md:grid-cols-4">
        {/* Sidebar filters */}
        <aside className="md:col-span-1">
          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Refine search</h2>

            <div className="mt-6 space-y-5">
              {/* Intent filter */}
              <fieldset>
                <legend className="mb-3 text-sm font-medium">Looking to</legend>
                <div className="space-y-2">
                  {[
                    { value: "buy", label: "Buy" },
                    { value: "rent", label: "Rent" },
                    { value: "invest", label: "Invest" },
                  ].map((o) => (
                    <label key={o.value} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="intent"
                        value={o.value}
                        checked={params.intent === o.value}
                        onChange={(e) => {
                          void navigate({
                            to: "/properties",
                            search: { ...params, intent: e.target.value as Purpose | "invest" },
                          });
                        }}
                        className="rounded"
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Location filter */}
              <fieldset>
                <legend className="mb-3 text-sm font-medium">Location</legend>
                <select
                  value={params.location || ""}
                  onChange={(e) => {
                    void navigate({
                      to: "/properties",
                      search: { ...params, location: e.target.value || undefined },
                    });
                  }}
                  className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">All areas ({locations.length})</option>
                  {locations.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Type filter */}
              <fieldset>
                <legend className="mb-3 text-sm font-medium">Type</legend>
                <select
                  value={params.type || ""}
                  onChange={(e) => {
                    void navigate({
                      to: "/properties",
                      search: { ...params, type: e.target.value || undefined },
                    });
                  }}
                  className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Any type</option>
                  {propertyTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Bedrooms filter */}
              <fieldset>
                <legend className="mb-3 text-sm font-medium">Bedrooms</legend>
                <select
                  value={params.beds || ""}
                  onChange={(e) => {
                    void navigate({
                      to: "/properties",
                      search: { ...params, beds: e.target.value || undefined },
                    });
                  }}
                  className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Any</option>
                  <option value="studio">Studio</option>
                  <option value="1">1 bed</option>
                  <option value="2">2 beds</option>
                  <option value="3">3 beds</option>
                  <option value="4">4+ beds</option>
                </select>
              </fieldset>

              {/* Budget filter */}
              <fieldset>
                <legend className="mb-3 text-sm font-medium">
                  Max budget (AED)
                </legend>
                <input
                  type="number"
                  value={params.budget || ""}
                  onChange={(e) => {
                    void navigate({
                      to: "/properties",
                      search: {
                        ...params,
                        budget: e.target.value ? Number(e.target.value) : undefined,
                      },
                    });
                  }}
                  placeholder="e.g. 2000000"
                  className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm"
                />
              </fieldset>

              {/* Ready status filter */}
              <fieldset>
                <legend className="mb-3 text-sm font-medium">Availability</legend>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={params.ready === "true"}
                    onChange={(e) => {
                      void navigate({
                        to: "/properties",
                        search: {
                          ...params,
                          ready: e.target.checked ? "true" : undefined,
                        },
                      });
                    }}
                    className="rounded"
                  />
                  Ready to move only
                </label>
              </fieldset>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="md:col-span-3">
          {/* Controls */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-sm border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={cn(
                  "rounded-sm border p-2 transition-colors",
                  view === "grid"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input hover:border-border",
                )}
                aria-label="Grid view"
              >
                <Grid3x3 className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={cn(
                  "rounded-sm border p-2 transition-colors",
                  view === "list"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input hover:border-border",
                )}
                aria-label="List view"
              >
                <List className="size-4" />
              </button>
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="rounded-sm border border-border bg-card p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No properties match your search criteria. Try adjusting your filters.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-4 text-sm underline decoration-brass underline-offset-2"
              >
                Clear filters
              </button>
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <PropertyCard
                  key={p.id}
                  p={p}
                  isFavorite={favorites.has(p.id)}
                  onToggleFavorite={() => toggleFavorite(p.id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((p) => (
                <PropertyListItem
                  key={p.id}
                  p={p}
                  isFavorite={favorites.has(p.id)}
                  onToggleFavorite={() => toggleFavorite(p.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DemoLayout>
  );
}

function PropertyListItem({
  p,
  isFavorite,
  onToggleFavorite,
}: {
  p: Property;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const { formatPrice, bedsLabel } = require("@/lib/trd-data");

  return (
    <Link
      to="/properties/$propertyId"
      params={{ propertyId: p.id }}
      className="group flex gap-4 overflow-hidden rounded-sm border border-border bg-card transition-all hover:border-border/80 hover:shadow-[0_8px_20px_-12px_oklch(0.3_0.04_318/0.4)]"
    >
      <div className="h-32 w-32 shrink-0 overflow-hidden bg-secondary sm:h-40 sm:w-40">
        <img
          src={require(`@/assets/${p.gallery[0]}.jpg`).default}
          alt={p.headline}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brass">
            {p.project}
          </p>
          <h3 className="mt-2 text-lg font-semibold">{p.headline}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {p.area} · {bedsLabel(p.beds)} · {p.baths} bath
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-display text-lg font-semibold text-brass">
            {formatPrice(p)}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className="rounded-sm border border-input p-2 transition-colors hover:bg-secondary"
          >
            <Heart
              className={cn("size-4", isFavorite && "fill-brass text-brass")}
            />
          </button>
        </div>
      </div>
    </Link>
  );
}
