import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin } from "lucide-react";
import type { Freelancer } from "@/lib/data";
import { initials } from "@/lib/data";
import { Stars } from "./stars";

export function FreelancerCard({
  fl,
  compareOn,
  onCompare,
  selected,
}: {
  fl: Freelancer;
  compareOn?: boolean;
  onCompare?: (id: string) => void;
  selected?: boolean;
}) {
  return (
    <article className="surface-card lift group flex flex-col p-5">
      <div className="flex items-start gap-3.5">
        <span
          className={`grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${fl.accent} font-display text-lg font-bold text-white`}
        >
          {initials(fl.name)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-display text-base font-semibold">{fl.name}</h3>
            <BadgeCheck className="size-4 shrink-0 text-[var(--electric)]" />
          </div>
          <p className="truncate text-sm text-muted-foreground">{fl.title}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" /> {fl.location}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-lg font-bold">${fl.rate}</p>
          <p className="text-[11px] text-muted-foreground">per hour</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <Stars rating={fl.rating} />
        <span className="font-semibold">{fl.rating}</span>
        <span className="text-muted-foreground">· {fl.projects} projects</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {fl.skills.slice(0, 4).map((s) => (
          <span
            key={s}
            className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 overflow-hidden rounded-xl">
        {fl.portfolio.slice(0, 3).map((p, i) => (
          <div
            key={p.title}
            className="relative aspect-[4/3] rounded-lg border border-border bg-gradient-to-br from-muted to-card"
          >
            <div
              className={`absolute inset-0 rounded-lg bg-gradient-to-br ${fl.accent} opacity-${i === 0 ? "30" : "15"}`}
              style={{ opacity: 0.32 - i * 0.1 }}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${
            fl.availability === "Available now"
              ? "bg-emerald-500/10 text-emerald-500"
              : "bg-amber-500/10 text-amber-500"
          }`}
        >
          <span className="size-1.5 rounded-full bg-current" /> {fl.availability}
        </span>
        <span className="text-muted-foreground">Score {fl.score}/100</span>
      </div>

      <div className="mt-5 flex gap-2">
        <Link
          to="/freelancers/$id"
          params={{ id: fl.id }}
          className="flex-1 rounded-full border border-border py-2.5 text-center text-sm font-medium transition-colors hover:bg-accent"
        >
          View Profile
        </Link>
        {compareOn && (
          <button
            onClick={() => onCompare?.(fl.id)}
            className={`rounded-full px-4 text-sm font-medium transition-colors ${
              selected
                ? "bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] text-white"
                : "border border-border hover:bg-accent"
            }`}
          >
            {selected ? "Added" : "Compare"}
          </button>
        )}
      </div>
    </article>
  );
}
