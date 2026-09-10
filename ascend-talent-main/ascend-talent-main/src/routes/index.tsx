import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Briefcase,
  Camera,
  Clapperboard,
  Code2,
  Feather,
  PenTool,
  Search,
  Sparkles,
  TrendingUp,
  Trophy,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { HeroOrb } from "@/components/hero-orb";
import { Counter } from "@/components/counter";
import { FreelancerCard } from "@/components/freelancer-card";
import { categories, freelancers, stats, trustedBy } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orbitwork — Find the right talent. Build something great." },
      {
        name: "description",
        content:
          "Discover vetted freelancers, compare rates and ratings, post projects and hire with confidence on Orbitwork.",
      },
      { property: "og:title", content: "Orbitwork — Find the right talent" },
      {
        property: "og:description",
        content: "A reputation-first freelance marketplace for ambitious teams.",
      },
    ],
  }),
  component: Home,
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

const quickCats = [
  "Web Development",
  "UI/UX Design",
  "Graphic Design",
  "Video Editing",
  "Marketing",
  "AI & Automation",
  "Writing",
  "3D Design",
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--violet),transparent_65%)] opacity-20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs text-muted-foreground">
              <Zap className="size-3.5 text-[var(--electric)]" />
              Ranked by outcomes, not ad spend
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
              Find the right talent.
              <br />
              <span className="text-gradient">Build something great.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Connect with skilled freelancers, discover exceptional talent, and get your next
              project done — with portfolios, ratings and pricing all in the open.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/freelancers"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_var(--violet)] transition-transform hover:scale-[1.03]"
              >
                Find a Freelancer
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-accent"
              >
                Start Freelancing
              </Link>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="glass mt-10 flex items-center gap-2 rounded-2xl p-2"
            >
              <Search className="ml-3 size-5 shrink-0 text-muted-foreground" />
              <input
                className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                placeholder="What do you need help with? Try “web designers, developers, video editors…”"
              />
              <Link
                to="/freelancers"
                className="shrink-0 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background"
              >
                Search
              </Link>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickCats.map((c) => (
                <Link
                  key={c}
                  to="/freelancers"
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-[var(--violet)] hover:text-foreground"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          <HeroOrb />
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <p className="text-center text-sm text-muted-foreground">
            Trusted by ambitious businesses and independent professionals
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 opacity-60">
            {trustedBy.map((t) => (
              <span key={t} className="font-display text-lg font-semibold tracking-tight">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl font-bold">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Whatever you need, find someone who can build it.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ten disciplines, thousands of specialists, transparent starting rates.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((c) => {
            const Icon = icons[c.icon] ?? Code2;
            return (
              <Link
                key={c.name}
                to="/freelancers"
                className="surface-card lift group relative overflow-hidden p-6"
              >
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-[var(--violet)]/10 blur-2xl transition-opacity group-hover:opacity-100 md:opacity-0" />
                <span className="grid size-11 place-items-center rounded-xl border border-border bg-muted/60">
                  <Icon className="size-5 text-[var(--electric)]" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{c.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {c.count.toLocaleString("en-US")} freelancers
                  </span>
                  <span className="font-semibold">from ${c.from}/hr</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-8">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--electric)]"
          >
            Browse all categories <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* FREELANCERS */}
      <section className="border-y border-border bg-card/40 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl font-bold sm:text-5xl">Meet top freelancers</h2>
              <p className="mt-3 text-muted-foreground">
                Ranked this week by the Orbit Score — quality, reliability and repeat clients.
              </p>
            </div>
            <Link
              to="/freelancers"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              View all talent
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {freelancers.slice(0, 6).map((fl) => (
              <FreelancerCard key={fl.id} fl={fl} />
            ))}
          </div>
        </div>
      </section>

      {/* LEADERBOARD TEASER */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="surface-card relative overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(circle,var(--gold),transparent_60%)] opacity-20 blur-2xl" />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
                <Trophy className="size-3.5 text-[var(--gold)]" /> Live rankings
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold">
                A leaderboard that rewards craft, not tenure
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                The Orbit Score blends client ratings, on-time delivery, response rate, repeat
                clients and portfolio depth — so a specialist with 20 outstanding projects can
                outrank someone with 200 average ones.
              </p>
              <Link
                to="/leaderboard"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-6 py-3 text-sm font-semibold text-white"
              >
                See the Top 100 <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {freelancers.slice(0, 3).map((fl, i) => (
                <div
                  key={fl.id}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-background/60 p-4"
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-xl font-display text-sm font-bold ${
                      i === 0
                        ? "bg-[var(--gold)] text-black"
                        : i === 1
                          ? "bg-zinc-300 text-black"
                          : "bg-amber-700 text-white"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{fl.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{fl.title}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold">{fl.score}/100</p>
                    <p className="text-xs text-muted-foreground">{fl.projects} projects</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS STRIP */}
      <section className="border-t border-border bg-card/40 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-10 lg:grid-cols-2">
            {[
              {
                title: "For employers",
                icon: ShieldCheck,
                steps: [
                  "Post a project in under three minutes",
                  "Review proposals with portfolios attached",
                  "Hire, track milestones, release payment",
                  "Leave a structured review that shapes rankings",
                ],
                cta: { label: "Post a Project", to: "/post-project" as const },
              },
              {
                title: "For freelancers",
                icon: Sparkles,
                steps: [
                  "Build a profile with real portfolio work",
                  "Apply to matched projects with one-click proposals",
                  "Deliver against clear milestones",
                  "Grow your Orbit Score and climb the leaderboard",
                ],
                cta: { label: "Find Work", to: "/projects" as const },
              },
            ].map((b) => (
              <div key={b.title} className="surface-card p-8">
                <span className="grid size-11 place-items-center rounded-xl border border-border bg-muted/60">
                  <b.icon className="size-5 text-[var(--violet)]" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold">{b.title}</h3>
                <ol className="mt-5 space-y-3">
                  {b.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full border border-border text-[11px] font-semibold text-foreground">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
                <Link
                  to={b.cta.to}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--electric)]"
                >
                  {b.cta.label} <ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
