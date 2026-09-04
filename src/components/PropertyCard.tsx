import { Link } from "@tanstack/react-router";

import { useFavorites } from "@/lib/favorites";
import { bedsLabel, formatPrice, images, type Property } from "@/lib/trd-data";
import { cn } from "@/lib/utils";

function FavoriteButton({ id }: { id: string }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from saved properties" : "Save property"}
      className={cn(
        "absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full border backdrop-blur transition-colors",
        active
          ? "border-brass bg-brass text-accent-foreground"
          : "border-white/50 bg-black/25 text-white hover:bg-black/40",
      )}
    >
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path
          d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}

function Specs({ p }: { p: Property }) {
  return (
    <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
      <div className="flex gap-1">
        <dt className="sr-only">Bedrooms</dt>
        <dd>{bedsLabel(p.beds)}</dd>
      </div>
      <span aria-hidden="true">·</span>
      <div className="flex gap-1">
        <dt className="sr-only">Bathrooms</dt>
        <dd>{p.baths} bath</dd>
      </div>
      <span aria-hidden="true">·</span>
      <div className="flex gap-1">
        <dt className="sr-only">Size</dt>
        <dd>{p.sqft.toLocaleString("en-US")} sq. ft.</dd>
      </div>
    </dl>
  );
}

export function PropertyCard({ p, view = "grid" }: { p: Property; view?: "grid" | "list" }) {
  const list = view === "list";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-sm border border-border bg-card transition-shadow hover:shadow-[0_18px_40px_-30px_oklch(0.3_0.04_318/0.6)]",
        list && "sm:grid sm:grid-cols-[minmax(0,18rem)_1fr]",
      )}
    >
      <FavoriteButton id={p.id} />
      <Link
        to="/properties/$propertyId"
        params={{ propertyId: p.id }}
        className="block overflow-hidden"
      >
        <img
          src={images[p.gallery[0]!]}
          alt={`Illustrative concept image for ${p.project}, ${p.area}`}
          loading="lazy"
          width={1200}
          height={800}
          className={cn(
            "w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
            list ? "h-full min-h-52" : "aspect-[4/3]",
          )}
        />
      </Link>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-primary px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
            {p.purpose === "buy" ? "For sale" : "For rent"}
          </span>
          {p.status === "ready" ? (
            <span className="rounded-sm border border-brass/60 bg-sand px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brass-deep">
              Ready
            </span>
          ) : null}
          <span className="text-xs text-muted-foreground">{p.type}</span>
        </div>

        <p className="font-display text-xl font-semibold">{formatPrice(p)}</p>
        <p className="text-sm font-medium text-foreground">
          {p.project} · {p.area}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">{p.headline}</p>
        <Specs p={p} />

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm">
          <span className="text-muted-foreground">
            {p.agentSlug && p.agentSlug === "nadia-cortes" ? (
              <Link
                to="/team/$agentSlug"
                params={{ agentSlug: p.agentSlug }}
                className="underline decoration-brass/50 underline-offset-4 hover:text-foreground"
              >
                {p.listingAgent}
              </Link>
            ) : (
              p.listingAgent
            )}
          </span>
          <Link
            to="/properties/$propertyId"
            params={{ propertyId: p.id }}
            className="font-medium text-foreground underline decoration-brass underline-offset-4"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
