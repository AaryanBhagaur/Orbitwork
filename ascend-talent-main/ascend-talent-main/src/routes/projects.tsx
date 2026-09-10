import { createFileRoute } from "@tanstack/react-router";
import { Bookmark, Clock, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { projects, type Project } from "@/lib/data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Find Work — Open projects | Orbitwork" },
      {
        name: "description",
        content:
          "Browse open freelance projects by budget, skill and experience level, then send a proposal with your portfolio attached.",
      },
      { property: "og:title", content: "Find freelance work on Orbitwork" },
      {
        property: "og:description",
        content: "Open projects with clear budgets, skills and timelines.",
      },
    ],
  }),
  component: FindWork,
});

function FindWork() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("Any");
  const [type, setType] = useState("Any");
  const [saved, setSaved] = useState<string[]>([]);
  const [active, setActive] = useState<Project | null>(null);
  const [sent, setSent] = useState<string[]>([]);

  const list = useMemo(
    () =>
      projects.filter((p) => {
        const text = `${p.title} ${p.company} ${p.skills.join(" ")} ${p.category}`.toLowerCase();
        if (q && !text.includes(q.toLowerCase())) return false;
        if (level !== "Any" && p.level !== level) return false;
        if (type !== "Any" && p.type !== type) return false;
        return true;
      }),
    [q, level, type],
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">Find work</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Projects matched to the skills on your profile. Save what looks promising, then send a
        proposal with relevant portfolio pieces attached.
      </p>

      <div className="glass mt-8 flex flex-wrap items-center gap-2 rounded-2xl p-2">
        <Search className="ml-3 size-5 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects, skills or companies…"
          className="min-w-[160px] flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
        >
          {["Any", "Beginner", "Intermediate", "Expert"].map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
        >
          {["Any", "Fixed Price", "Hourly"].map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="mt-8 space-y-4">
        {list.map((p) => (
          <article key={p.id} className="surface-card p-6 transition-colors hover:border-[var(--violet)]/50">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{p.company}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {p.posted}
                  </span>
                  <span>·</span>
                  <span>{p.level}</span>
                </div>
                <h2 className="mt-2 font-display text-xl font-semibold">{p.title}</h2>
                <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="size-3.5" /> {p.applications} applications
                  </span>
                  <span>{p.duration}</span>
                  <span>{p.category}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold">
                  ${p.budgetLow.toLocaleString()}–{p.budgetHigh.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">{p.type}</p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() =>
                      setSaved((s) => (s.includes(p.id) ? s.filter((x) => x !== p.id) : [...s, p.id]))
                    }
                    className={`grid size-10 place-items-center rounded-full border border-border transition-colors ${
                      saved.includes(p.id) ? "bg-accent text-foreground" : "text-muted-foreground"
                    }`}
                    aria-label="Save project"
                  >
                    <Bookmark className={`size-4 ${saved.includes(p.id) ? "fill-current" : ""}`} />
                  </button>
                  <button
                    onClick={() => setActive(p)}
                    disabled={sent.includes(p.id)}
                    className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    {sent.includes(p.id) ? "Proposal sent" : "Apply"}
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
        {list.length === 0 && (
          <div className="surface-card p-12 text-center text-muted-foreground">
            No open projects match that search.
          </div>
        )}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="surface-card max-h-[90vh] w-full max-w-lg overflow-y-auto p-7">
            <h2 className="font-display text-2xl font-bold">Submit a proposal</h2>
            <p className="mt-1 text-sm text-muted-foreground">{active.title}</p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent((s) => [...s, active.id]);
                setActive(null);
              }}
            >
              <Field label="Cover message">
                <textarea
                  required
                  rows={4}
                  defaultValue="I can build your project within 10 days…"
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-[var(--violet)]"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Proposed price">
                  <input
                    required
                    type="number"
                    defaultValue={active.budgetLow}
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-[var(--violet)]"
                  />
                </Field>
                <Field label="Estimated delivery">
                  <input
                    required
                    defaultValue="10 days"
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-[var(--violet)]"
                  />
                </Field>
              </div>
              <Field label="Attach portfolio projects">
                <div className="space-y-2">
                  {["E-Commerce Experience Redesign", "Product Launch Platform"].map((p) => (
                    <label key={p} className="flex items-center gap-2.5 text-sm">
                      <input type="checkbox" defaultChecked className="size-4 accent-[var(--violet)]" />
                      {p}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Questions for the client">
                <input
                  placeholder="Anything you need clarified?"
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-[var(--violet)]"
                />
              </Field>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full border border-border px-5 py-2.5 text-sm"
                >
                  Cancel
                </button>
                <button className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-5 py-2.5 text-sm font-semibold text-white">
                  Send proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}
