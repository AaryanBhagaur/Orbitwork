import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { FreelancerCard } from "@/components/freelancer-card";
import { Stars } from "@/components/stars";
import { categories, freelancers } from "@/lib/data";

export const Route = createFileRoute("/freelancers/")({
  head: () => ({
    meta: [
      { title: "Find Talent — Browse freelancers | Orbitwork" },
      {
        name: "description",
        content:
          "Filter thousands of freelancers by skill, rating, price, experience and availability, then compare shortlists side by side.",
      },
      { property: "og:title", content: "Find Talent on Orbitwork" },
      {
        property: "og:description",
        content: "Browse, filter and compare independent professionals.",
      },
    ],
  }),
  component: FindTalent,
});

const sorts = [
  "Recommended",
  "Top Rated",
  "Most Experienced",
  "Lowest Price",
  "Most Projects",
] as const;

function FindTalent() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [maxRate, setMaxRate] = useState(80);
  const [level, setLevel] = useState("Any");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Recommended");
  const [compare, setCompare] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const list = freelancers.filter((f) => {
      const text = `${f.name} ${f.title} ${f.skills.join(" ")} ${f.location}`.toLowerCase();
      if (q && !text.includes(q.toLowerCase())) return false;
      if (cat !== "All" && f.category !== cat) return false;
      if (f.rating < minRating) return false;
      if (f.rate > maxRate) return false;
      if (level !== "Any" && f.experience !== level) return false;
      if (availableOnly && f.availability !== "Available now") return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "Top Rated") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "Most Experienced") sorted.sort((a, b) => b.projects - a.projects);
    if (sort === "Lowest Price") sorted.sort((a, b) => a.rate - b.rate);
    if (sort === "Most Projects") sorted.sort((a, b) => b.projects - a.projects);
    if (sort === "Recommended") sorted.sort((a, b) => b.score - a.score);
    return sorted;
  }, [q, cat, minRating, maxRate, level, availableOnly, sort]);

  const toggleCompare = (id: string) =>
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < 4 ? [...c, id] : c));

  const compared = freelancers.filter((f) => compare.includes(f.id));

  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">Find talent</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {freelancers.length} specialists shown from our sample directory. Filter, sort and compare
        up to four at a time.
      </p>

      <div className="glass mt-8 flex items-center gap-2 rounded-2xl p-2">
        <Search className="ml-3 size-5 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a designer for my website…"
          className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={() => setFiltersOpen((o) => !o)}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm lg:hidden"
        >
          <SlidersHorizontal className="size-4" /> Filters
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
          <div className="surface-card sticky top-24 space-y-6 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Category
              </p>
              <div className="mt-3 space-y-1">
                {["All", ...categories.map((c) => c.name)].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                      cat === c ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Minimum rating
              </p>
              <div className="mt-3 flex gap-2">
                {[0, 4.5, 4.8, 4.9].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      minRating === r ? "border-[var(--violet)] text-foreground" : "border-border text-muted-foreground"
                    }`}
                  >
                    {r === 0 ? "Any" : `${r}+`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Max hourly rate — ${maxRate}
              </p>
              <input
                type="range"
                min={15}
                max={80}
                value={maxRate}
                onChange={(e) => setMaxRate(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--violet)]"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Experience
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Any", "Beginner", "Intermediate", "Expert"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      level === l ? "border-[var(--violet)] text-foreground" : "border-border text-muted-foreground"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="size-4 accent-[var(--violet)]"
              />
              Available now only
            </label>
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{results.length} freelancers</p>
            <div className="flex flex-wrap gap-1.5">
              {sorts.map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                    sort === s
                      ? "bg-foreground text-background"
                      : "border border-border text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map((fl) => (
              <FreelancerCard
                key={fl.id}
                fl={fl}
                compareOn
                onCompare={toggleCompare}
                selected={compare.includes(fl.id)}
              />
            ))}
          </div>

          {results.length === 0 && (
            <div className="surface-card mt-6 p-12 text-center text-muted-foreground">
              No freelancers match those filters yet. Try widening the rate or rating.
            </div>
          )}

          {compared.length > 0 && (
            <div className="surface-card mt-10 overflow-x-auto p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold">
                  Compare freelancers ({compared.length}/4)
                </h2>
                <button
                  onClick={() => setCompare([])}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" /> Clear
                </button>
              </div>
              <table className="mt-5 w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                    <th className="pb-3">Freelancer</th>
                    <th className="pb-3">Rating</th>
                    <th className="pb-3">Projects</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Typical delivery</th>
                    <th className="pb-3" />
                  </tr>
                </thead>
                <tbody>
                  {compared.map((f) => (
                    <tr key={f.id} className="border-t border-border">
                      <td className="py-3 font-medium">
                        {f.name}
                        <span className="block text-xs text-muted-foreground">{f.title}</span>
                      </td>
                      <td className="py-3">
                        <span className="flex items-center gap-1.5">
                          <Stars rating={f.rating} size={12} /> {f.rating}
                        </span>
                      </td>
                      <td className="py-3">{f.projects}</td>
                      <td className="py-3">${f.rate}/hr</td>
                      <td className="py-3">{f.deliveryDays} days</td>
                      <td className="py-3 text-right">
                        <Link
                          to="/freelancers/$id"
                          params={{ id: f.id }}
                          className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent"
                        >
                          Profile
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
