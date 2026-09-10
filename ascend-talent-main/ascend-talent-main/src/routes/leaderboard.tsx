import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Trophy, Medal } from "lucide-react";
import { useMemo, useState } from "react";
import { Stars } from "@/components/stars";
import { freelancers, initials } from "@/lib/data";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Top Freelancers Leaderboard | Orbitwork" },
      {
        name: "description",
        content:
          "Live rankings of the highest performing freelancers by Orbit Score — ratings, delivery, repeat clients and portfolio depth.",
      },
      { property: "og:title", content: "Top Freelancers on Orbitwork" },
      { property: "og:description", content: "Rankings that reward craft, not tenure." },
    ],
  }),
  component: Leaderboard,
});

const filters = ["Overall", "Development & IT", "Design & Creative", "Marketing", "Writing & Content", "Video & Audio", "AI & Automation", "3D & Animation"];
const periods = ["This Month", "This Year", "All Time"];

function Leaderboard() {
  const [filter, setFilter] = useState("Overall");
  const [period, setPeriod] = useState("This Month");

  const ranked = useMemo(() => {
    const base = filter === "Overall" ? freelancers : freelancers.filter((f) => f.category === filter);
    return [...base].sort((a, b) => b.score - a.score);
  }, [filter]);

  const podium = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,var(--violet),transparent_60%)] opacity-15" />
      <div className="relative mx-auto max-w-6xl px-5 py-14">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground">
            <Trophy className="size-3.5 text-[var(--gold)]" /> Updated hourly
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold sm:text-6xl">Top Freelancers</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Ranked by Orbit Score: client ratings, on-time delivery, response rate, repeat clients
            and portfolio quality — weighted so newer specialists can still rise fast.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1.5 text-xs transition-colors ${
                filter === f
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-full px-3.5 py-1.5 text-xs ${
                period === p ? "border border-[var(--violet)] text-foreground" : "text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* podium */}
        <div className="mt-14 grid gap-5 md:grid-cols-3 md:items-end">
          {podium.map((fl, i) => {
            const order = [1, 0, 2][i];
            const isFirst = i === 0;
            return (
              <div
                key={fl.id}
                style={{ order }}
                className={`surface-card relative overflow-hidden p-7 text-center ${
                  isFirst ? "glow-ring md:-mt-10 md:pb-10" : ""
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 -top-16 h-40 blur-2xl ${
                    isFirst ? "bg-[var(--gold)]/25" : "bg-[var(--violet)]/15"
                  }`}
                />
                <div className="relative">
                  <span className="animate-float mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br shadow-xl"
                    style={{
                      backgroundImage: isFirst
                        ? "linear-gradient(135deg,#f7d774,#c9922f)"
                        : i === 1
                          ? "linear-gradient(135deg,#e6e8ec,#9aa1ac)"
                          : "linear-gradient(135deg,#e0a06a,#9a5a2c)",
                    }}
                  >
                    {isFirst ? (
                      <Crown className="size-7 text-black/80" />
                    ) : (
                      <Medal className="size-7 text-black/70" />
                    )}
                  </span>
                  <p className="mt-4 font-display text-sm font-bold tracking-widest text-muted-foreground">
                    #{i + 1}
                  </p>
                  <span
                    className={`mx-auto mt-4 grid size-20 place-items-center rounded-3xl bg-gradient-to-br ${fl.accent} font-display text-2xl font-bold text-white`}
                  >
                    {initials(fl.name)}
                  </span>
                  <h2 className="mt-4 font-display text-xl font-bold">{fl.name}</h2>
                  <p className="text-sm text-muted-foreground">{fl.title}</p>
                  <div className="mt-3 flex items-center justify-center gap-2 text-sm">
                    <Stars rating={fl.rating} /> <b>{fl.rating}</b>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
                    <Stat label="Projects" value={fl.projects} />
                    <Stat label="Success" value={`${fl.successRate}%`} />
                    <Stat label="Rate" value={`$${fl.rate}`} />
                  </div>
                  <Link
                    to="/freelancers/$id"
                    params={{ id: fl.id }}
                    className="mt-6 block rounded-full border border-border py-2.5 text-sm font-medium hover:bg-accent"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* table */}
        <div className="surface-card mt-10 overflow-x-auto p-2 sm:p-4">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="p-4">Rank</th>
                <th className="p-4">Freelancer</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Projects</th>
                <th className="p-4">Success</th>
                <th className="p-4">Score</th>
                <th className="p-4">Rate</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody>
              {rest.map((fl, i) => (
                <tr key={fl.id} className="border-t border-border transition-colors hover:bg-accent/40">
                  <td className="p-4 font-display font-bold text-muted-foreground">#{i + 4}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid size-9 place-items-center rounded-xl bg-gradient-to-br ${fl.accent} text-xs font-bold text-white`}
                      >
                        {initials(fl.name)}
                      </span>
                      <div>
                        <p className="font-medium">{fl.name}</p>
                        <p className="text-xs text-muted-foreground">{fl.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5">
                      <Stars rating={fl.rating} size={12} /> {fl.rating}
                    </span>
                  </td>
                  <td className="p-4">{fl.projects}</td>
                  <td className="p-4">{fl.successRate}%</td>
                  <td className="p-4 font-semibold">{fl.score}</td>
                  <td className="p-4">${fl.rate}/hr</td>
                  <td className="p-4 text-right">
                    <Link
                      to="/freelancers/$id"
                      params={{ id: fl.id }}
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
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-muted/40 p-2">
      <p className="font-semibold">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}
