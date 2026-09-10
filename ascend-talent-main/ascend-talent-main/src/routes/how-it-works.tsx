import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck, Sparkles, Search, FileText, Users, MessageSquare,
  CheckCircle, Star, DollarSign, ArrowRight, Clock, Zap,
  Trophy, Target, Heart, BarChart3, ExternalLink
} from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works | Orbitwork" },
      { name: "description", content: "Learn how Orbitwork connects clients with top freelancers through our reputation-first marketplace." },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  const employerSteps = [
    {
      number: "01",
      title: "Post Your Project",
      description: "Describe your project in minutes using our guided wizard. Define scope, budget, timeline, and required skills.",
      icon: FileText,
      details: ["AI-assisted project brief creation", "Smart category & skill suggestions", "Budget guidance with market rates", "Attach files & requirements"],
    },
    {
      number: "02",
      title: "Receive Proposals",
      description: "Qualified freelancers apply with tailored proposals, relevant portfolio pieces, and clear pricing.",
      icon: MessageSquare,
      details: ["Portfolio attachments with proposals", "Side-by-side comparison table", "Freelancer Orbit Scores visible", "Direct messaging before hiring"],
    },
    {
      number: "03",
      title: "Hire & Collaborate",
      description: "Select the best fit, set up milestones, and work together in a dedicated project workspace.",
      icon: Users,
      details: ["Milestone-based payments", "Built-in messaging & file sharing", "Task tracking & timeline", "Real-time progress updates"],
    },
    {
      number: "04",
      title: "Review & Build Reputation",
      description: "Leave structured reviews that shape freelancer rankings and help future clients decide.",
      icon: Star,
      details: ["Multi-dimensional ratings", "Verified reviews only", "Impacts Orbit Score & leaderboard", "Freelancers can review clients too"],
    },
  ];

  const freelancerSteps = [
    {
      number: "01",
      title: "Build Your Profile",
      description: "Showcase your skills, portfolio, services, and experience. Get verified to stand out.",
      icon: Sparkles,
      details: ["Portfolio with case studies", "Service packages with pricing", "Skill proficiency bars", "Education & certifications"],
    },
    {
      number: "02",
      title: "Find Matched Projects",
      description: "Browse projects tailored to your skills. Save favorites and apply with one-click proposals.",
      icon: Target,
      details: ["Smart project recommendations", "Filter by budget, type, level", "Save & track applications", "Attach relevant portfolio work"],
    },
    {
      number: "03",
      title: "Deliver Excellence",
      description: "Work in structured milestones with clear deliverables. Communicate, share files, track tasks.",
      icon: CheckCircle,
      details: ["Milestone-based workflow", "Integrated messaging & files", "Task & timeline management", "Client feedback loops"],
    },
    {
      number: "04",
      title: "Grow Your Reputation",
      description: "Earn ratings, climb the leaderboard, unlock badges, and increase your Orbit Score.",
      icon: Trophy,
      details: ["Orbit Score: quality over quantity", "Live leaderboard rankings", "Achievement badges (3D)", "Higher visibility = better projects"],
    },
  ];

  const features = [
    { icon: ShieldCheck, title: "Secure Payments", desc: "Escrow-protected milestones. Funds released only when you approve deliverables." },
    { icon: Zap, title: "Fast Matching", desc: "AI-powered recommendations connect you with the right talent in minutes, not days." },
    { icon: BarChart3, title: "Transparent Pricing", desc: "See real market rates, freelancer pricing, and project budgets upfront — no hidden fees." },
    { icon: Heart, title: "Quality First", desc: "Orbit Score rewards craft, reliability, and client satisfaction — not just tenure or ad spend." },
    { icon: Clock, title: "Timezone Smart", desc: "See freelancer availability, response rates, and typical delivery times before you hire." },
    { icon: ExternalLink, title: "Portfolio Verified", desc: "Real project case studies with results, not just claims. Judge quality before you commit." },
  ];

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--violet),transparent_65%)] opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs text-muted-foreground">
            <Zap className="size-3.5 text-[var(--electric)]" /> Reputation-first marketplace
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
            How Orbitwork
            <br />
            <span className="text-gradient">works for everyone</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Whether you're hiring or freelancing, our platform makes it simple to find the right match,
            collaborate smoothly, and build lasting professional relationships.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/post-project" className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-6 py-3.5 text-sm font-semibold text-white">
              I Want to Hire
            </Link>
            <Link to="/projects" className="rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:bg-accent">
              I Want to Freelance
            </Link>
          </div>
        </div>
      </section>

      {/* Employer Journey */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-[var(--violet)]" /> For Clients
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold">From brief to delivery, seamlessly</h2>
          <p className="mt-3 text-muted-foreground">Post a project in under 3 minutes. Hire with confidence using verified reviews and Orbit Scores.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {employerSteps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* Freelancer Journey */}
      <section className="border-y border-border bg-card/40 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-[var(--electric)]" /> For Freelancers
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold">Build a career, not just a profile</h2>
            <p className="mt-3 text-muted-foreground">Showcase real work, get matched to relevant projects, and climb a leaderboard that rewards quality.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {freelancerSteps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl font-bold">Why professionals choose Orbitwork</h2>
          <p className="mt-3 text-muted-foreground">Built for the way modern teams and independent professionals actually work.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-y border-border bg-card/40 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl font-bold">Trust built into every interaction</h2>
            <p className="mt-3 text-muted-foreground">We only make verification claims where the platform actually implements the process.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "Verified Freelancers", desc: "Identity & skill verification available", badge: "Implemented" },
              { icon: ShieldCheck, title: "Verified Employers", desc: "Business verification for clients", badge: "Implemented" },
              { icon: DollarSign, title: "Secure Payments", desc: "Escrow milestones, instant release", badge: "Implemented" },
              { icon: Star, title: "Verified Reviews", desc: "Only from completed projects", badge: "Implemented" },
              { icon: Trophy, title: "Top Rated Badge", desc: "Orbit Score ≥ 95", badge: "Implemented" },
              { icon: Target, title: "Identity Verified", desc: "Government ID + video verification", badge: "In Progress" },
              { icon: Users, title: "Team Accounts", desc: "Multi-seat billing & permissions", badge: "Planned" },
              { icon: BarChart3, title: "Enterprise SLA", desc: "Dedicated support & custom terms", badge: "Planned" },
            ].map((t) => (
              <TrustCard key={t.title} trust={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="surface-card relative overflow-hidden p-8 sm:p-12 text-center">
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(circle,var(--gold),transparent_60%)] opacity-20 blur-2xl" />
          <h2 className="font-display text-4xl font-bold">Ready to get started?</h2>
          <p className="mt-4 max-w-lg mx-auto text-muted-foreground">
            Join 10,000+ freelancers and 2,500+ clients building great work together on Orbitwork.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/post-project" className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-6 py-3.5 text-sm font-semibold text-white">
              Post a Project
            </Link>
            <Link to="/freelancers" className="rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:bg-accent">
              Find Talent
            </Link>
            <Link to="/projects" className="rounded-full border border-border px-6 py-3.5 text-sm font-semibold hover:bg-accent">
              Find Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function StepCard({ step, index }: { step: typeof employerSteps[0]; index: number }) {
  return (
    <div className="surface-card lift p-7 relative">
      <div className="flex gap-4">
        <div className="shrink-0 w-12 flex flex-col items-center">
          <span className="font-display text-2xl font-bold text-[var(--violet)]">{step.number}</span>
          <div className="mt-2 h-full w-0.5 bg-border" style={{ height: index < 3 ? "calc(100% + 2rem)" : 0 }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl bg-[var(--violet)]/10">
              <step.icon className="size-5 text-[var(--violet)]" />
            </span>
            <h3 className="font-display text-xl font-semibold">{step.title}</h3>
          </div>
          <p className="mt-3 text-muted-foreground">{step.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {step.details.map((d) => (
              <span key={d} className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  return (
    <div className="surface-card lift p-6">
      <span className="grid size-12 place-items-center rounded-xl bg-[var(--violet)]/10">
        <feature.icon className="size-5 text-[var(--violet)]" />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold">{feature.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
    </div>
  );
}

function TrustCard({ trust }: { trust: { icon: typeof ShieldCheck; title: string; desc: string; badge: string } }) {
  const isImplemented = trust.badge === "Implemented";
  return (
    <div className="surface-card lift p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-[var(--violet)]/10">
          <trust.icon className="size-5 text-[var(--violet)]" />
        </span>
        <div>
          <h3 className="font-display font-semibold">{trust.title}</h3>
          <p className="text-sm text-muted-foreground">{trust.desc}</p>
        </div>
      </div>
      <div className="mt-4">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${isImplemented ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>
          {isImplemented ? <CheckCircle className="size-3" /> : <Clock className="size-3" />}
          {trust.badge}
        </span>
      </div>
    </div>
  );
}