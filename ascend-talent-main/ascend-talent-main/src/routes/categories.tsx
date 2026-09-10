import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Boxes,
  Briefcase,
  Camera,
  Clapperboard,
  Code2,
  Feather,
  PenTool,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { categories } from "@/lib/data";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Browse Categories — Ten disciplines | Orbitwork" },
      {
        name: "description",
        content:
          "Explore freelance categories from AI and development to design, marketing, video, writing, data and 3D — with live talent counts and starting rates.",
      },
      { property: "og:title", content: "Freelance categories on Orbitwork" },
      {
        property: "og:description",
        content: "Ten disciplines, thousands of specialists, transparent starting rates.",
      },
    ],
  }),
  component: Categories,
});

const icons: Record<string, typeof Code2> = {
  Sparkles,
  Code2,
  PenTool,
  TrendingUp,
  Clapperboard,
  Feather,
  Briefcase,
  BarChart3,
  Boxes,
  Camera,
};

function Categories() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">Browse categories</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Every discipline on Orbitwork, with the number of active specialists and the rate work
        typically starts at.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const Icon = icons[c.icon] ?? Code2;
          return (
            <Link
              key={c.name}
              to="/freelancers"
              className="surface-card lift group relative overflow-hidden p-6"
            >
              <div className="absolute -right-12 -top-12 size-36 rounded-full bg-[var(--violet)]/10 blur-2xl" />
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-2xl border border-border bg-muted/60">
                  <Icon className="size-5 text-[var(--electric)]" />
                </span>
                <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold">{c.name}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="text-muted-foreground">
                  {c.count.toLocaleString("en-US")} freelancers
                </span>
                <span className="font-semibold">from ${c.from}/hr</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
