import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  Clock,
  MapPin,
  MessageSquare,
  Repeat,
  Wallet,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { Stars } from "@/components/stars";
import { ScoreRing } from "@/components/score-ring";
import { freelancers, initials, money } from "@/lib/data";

export const Route = createFileRoute("/freelancers/$id")({
  loader: ({ params }) => {
    const fl = freelancers.find((f) => f.id === params.id);
    if (!fl) throw notFound();
    return { fl };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Freelancer not found | Orbitwork" }, { name: "robots", content: "noindex" }],
      };
    }
    const { fl } = loaderData;
    const title = `${fl.name} — ${fl.title} | Orbitwork`;
    const desc = `${fl.name} is a ${fl.title.toLowerCase()} in ${fl.location}. ${fl.rating}★ across ${fl.projects} completed projects, from $${fl.rate}/hr.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: Profile,
});

const tabs = [
  "About",
  "Portfolio",
  "Services",
  "Reviews",
  "Experience",
  "Achievements",
] as const;

function Profile() {
  const { fl } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof tabs)[number]>("About");

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      {/* header */}
      <div className="surface-card relative overflow-hidden p-7 sm:p-9">
        <div
          className={`pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-gradient-to-br ${fl.accent} opacity-20 blur-3xl`}
        />
        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center">
          <span
            className={`grid size-24 shrink-0 place-items-center rounded-3xl bg-gradient-to-br ${fl.accent} font-display text-3xl font-bold text-white`}
          >
            {initials(fl.name)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-3xl font-bold sm:text-4xl">{fl.name}</h1>
              <BadgeCheck className="size-6 text-[var(--electric)]" />
            </div>
            <p className="mt-1 text-lg text-muted-foreground">{fl.title}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" /> {fl.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Stars rating={fl.rating} /> <b className="text-foreground">{fl.rating}</b> (
                {fl.reviews} reviews)
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> {fl.availability}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {fl.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-center lg:text-right">
            <p className="font-display text-4xl font-bold">${fl.rate}</p>
            <p className="text-sm text-muted-foreground">per hour</p>
            <div className="mt-4 flex gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent"
              >
                <MessageSquare className="size-4" /> Contact
              </Link>
              <Link
                to="/post-project"
                className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_auto]">
        <div className="surface-card grid grid-cols-2 gap-6 p-6 sm:grid-cols-5">
          {[
            { label: "Projects completed", value: fl.projects },
            { label: "Total earnings", value: money(fl.earnings) },
            { label: "Average rating", value: fl.rating },
            { label: "Response rate", value: `${fl.responseRate}%` },
            { label: "Repeat clients", value: fl.repeatClients },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-bold">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="surface-card flex items-center gap-5 p-6">
          <ScoreRing score={fl.score} size={104} />
          <div>
            <p className="font-display text-lg font-semibold">
              {fl.score >= 95 ? "Elite Freelancer" : fl.score >= 88 ? "Top Rated" : "Rising Talent"}
            </p>
            <p className="mt-1 max-w-[200px] text-xs text-muted-foreground">
              Orbit Score blends ratings, on-time delivery, repeat clients and portfolio depth.
            </p>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-10 flex gap-1.5 overflow-x-auto border-b border-border pb-px">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`whitespace-nowrap rounded-t-xl px-4 py-3 text-sm font-medium transition-colors ${
              tab === t
                ? "border-b-2 border-[var(--violet)] text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="py-8">
        {tab === "About" && (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="surface-card p-7">
              <h2 className="font-display text-xl font-bold">About</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{fl.about}</p>
              <h3 className="mt-8 font-display text-lg font-semibold">Skills</h3>
              <div className="mt-4 space-y-3">
                {fl.skills.map((s, i) => (
                  <div key={s}>
                    <div className="flex justify-between text-sm">
                      <span>{s}</span>
                      <span className="text-muted-foreground">{95 - i * 6}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)]"
                        style={{ width: `${95 - i * 6}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="surface-card h-fit p-7">
              <h3 className="font-display text-lg font-semibold">Education & certifications</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <p className="font-medium">BSc Computer Science</p>
                  <p className="text-muted-foreground">University programme, 2014 — 2018</p>
                </li>
                <li>
                  <p className="font-medium">Professional certification</p>
                  <p className="text-muted-foreground">{fl.skills[0]} advanced track</p>
                </li>
              </ul>
              <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
                Identity checks are not performed in this demo, so no verification claims are made
                about this sample profile.
              </div>
            </div>
          </div>
        )}

        {tab === "Portfolio" && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {fl.portfolio.map((p, i) => (
              <article key={p.title} className="surface-card lift overflow-hidden">
                <div className={`relative aspect-[16/10] bg-gradient-to-br ${fl.accent}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] text-white backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-medium text-[var(--electric)]">{p.result}</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      View project <ExternalLink className="size-3.5" />
                    </span>
                  </div>
                </div>
                <span className="sr-only">{i}</span>
              </article>
            ))}
          </div>
        )}

        {tab === "Services" && (
          <div className="grid gap-5 md:grid-cols-3">
            {fl.services.map((s) => (
              <div key={s.name} className="surface-card p-6">
                <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                <p className="mt-3 font-display text-3xl font-bold">${s.price.toLocaleString()}</p>
                <p className="mt-1 text-sm text-muted-foreground">Delivery: {s.delivery}</p>
                <Link
                  to="/post-project"
                  className="mt-6 block rounded-full border border-border py-2.5 text-center text-sm font-medium hover:bg-accent"
                >
                  Request this
                </Link>
              </div>
            ))}
          </div>
        )}

        {tab === "Reviews" && (
          <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
            <div className="surface-card h-fit p-7 text-center">
              <p className="font-display text-6xl font-bold">{fl.rating}</p>
              <div className="mt-2 flex justify-center">
                <Stars rating={fl.rating} size={18} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{fl.reviews} client reviews</p>
              <div className="mt-6 space-y-3 text-left text-sm">
                {[
                  ["Communication", 5],
                  ["Quality", 5],
                  ["Professionalism", 5],
                  ["Timeliness", 4],
                ].map(([k, v]) => (
                  <div key={k as string} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <Stars rating={v as number} size={13} />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {fl.reviewsList.map((r) => (
                <div key={r.client} className="surface-card p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{r.client}</p>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{r.project}</p>
                  <p className="mt-3 text-sm leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Experience" && (
          <div className="surface-card p-7">
            <ol className="relative space-y-8 border-l border-border pl-7">
              {fl.experienceList.map((e) => (
                <li key={e.role}>
                  <span className="absolute -left-[7px] mt-1.5 size-3.5 rounded-full border-2 border-background bg-[var(--violet)]" />
                  <p className="font-display text-lg font-semibold">{e.role}</p>
                  <p className="text-sm text-muted-foreground">
                    {e.org} · {e.period}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {tab === "Achievements" && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Top Rated", icon: Award, tint: "from-amber-400 to-orange-500" },
              { name: "Fast Responder", icon: Clock, tint: "from-sky-400 to-blue-500" },
              { name: "Client Favorite", icon: Repeat, tint: "from-fuchsia-400 to-violet-500" },
              { name: "On-Time Pro", icon: Wallet, tint: "from-emerald-400 to-teal-500" },
            ].map((b) => (
              <div key={b.name} className="surface-card lift p-6 text-center">
                <span
                  className={`mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br ${b.tint} shadow-lg`}
                >
                  <b.icon className="size-7 text-white" />
                </span>
                <p className="mt-4 font-display font-semibold">{b.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">Unlocked</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
