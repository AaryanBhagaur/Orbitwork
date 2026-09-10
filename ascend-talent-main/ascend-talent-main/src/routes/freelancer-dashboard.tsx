import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  FileText,
  Users,
  Heart,
  CheckCircle,
  DollarSign,
  Plus,
  Award,
  Target,
  BarChart3,
  ArrowRight,
  ExternalLink,
  Edit,
  Zap,
} from "lucide-react";
import { useState, useMemo } from "react";
import { freelancers, projects, type Freelancer, type Project } from "@/lib/data";
import { ScoreRing } from "@/components/score-ring";
import { initials } from "@/lib/data";

export const Route = createFileRoute("/freelancer-dashboard")({
  head: () => ({
    meta: [
      { title: "Freelancer Dashboard | Orbitwork" },
      { name: "description", content: "Manage your profile, proposals, projects, and track your Orbit Score." },
    ],
  }),
  component: FreelancerDashboard,
});

const fl = freelancers[0]; // Demo freelancer

const tabs = [
  { key: "overview", label: "Overview", icon: Briefcase },
  { key: "projects", label: "Available Projects", icon: Target },
  { key: "applications", label: "My Applications", icon: FileText },
  { key: "active", label: "Active Projects", icon: CheckCircle },
  { key: "completed", label: "Completed", icon: CheckCircle },
  { key: "earnings", label: "Earnings", icon: DollarSign },
  { key: "leaderboard", label: "Leaderboard", icon: Award },
] as const;

const mockApplications = [
  { id: "1", project: "Restaurant Website", client: "Ember & Oak", budget: "$500–900", status: "pending", applied: "2h ago", proposedRate: 35, proposedDays: 10 },
  { id: "2", project: "AI Support Agent", client: "Halcyon Labs", budget: "$3,000–6,000", status: "shortlisted", applied: "1d ago", proposedRate: 62, proposedDays: 14 },
  { id: "3", project: "Brand Identity", client: "Northlane", budget: "$4,000–7,500", status: "declined", applied: "3d ago", proposedRate: 40, proposedDays: 21 },
  { id: "4", project: "Product Explainer", client: "Fieldnote", budget: "$45–70/hr", status: "pending", applied: "4h ago", proposedRate: 30, proposedDays: 14 },
];

const mockActiveProjects = [
  { id: "1", title: "E-Commerce Redesign", client: "Nova Retail", status: "in-progress", progress: 65, milestone: "Development Phase", budget: 2800, earned: 1820, deadline: "2024-02-20" },
  { id: "2", title: "Mobile App", client: "Pacemakers", status: "review", progress: 90, milestone: "Final Review", budget: 7500, earned: 6750, deadline: "2024-02-28" },
];

const mockCompletedProjects = [
  { id: "1", title: "Product Launch Platform", client: "Halcyon Labs", completed: "2024-01-15", budget: 3200, rating: 5, review: "Excellent work, delivered ahead of schedule" },
  { id: "2", title: "Internal Operations Suite", client: "Fieldnote", completed: "2023-12-10", budget: 2100, rating: 4, review: "Strong work, very responsive" },
  { id: "3", title: "Marketing Site", client: "Cadence Health", completed: "2023-11-22", budget: 1800, rating: 5, review: "Perfect execution" },
];

const monthlyEarnings = [
  { month: "Aug", value: 2400 },
  { month: "Sep", value: 3100 },
  { month: "Oct", value: 2800 },
  { month: "Nov", value: 4200 },
  { month: "Dec", value: 3900 },
  { month: "Jan", value: 5100 },
];

const badges = [
  { name: "Top Rated", icon: Award, tint: "from-amber-400 to-orange-500", unlocked: true },
  { name: "Fast Responder", icon: Zap, tint: "from-sky-400 to-blue-500", unlocked: true },
  { name: "Client Favorite", icon: Heart, tint: "from-fuchsia-400 to-violet-500", unlocked: true },
  { name: "On-Time Pro", icon: Clock, tint: "from-emerald-400 to-teal-500", unlocked: true },
  { name: "100 Projects", icon: Target, tint: "from-indigo-400 to-purple-500", unlocked: true },
  { name: "Rising Talent", icon: TrendingUp, tint: "from-rose-400 to-pink-500", unlocked: false },
  { name: "5-Star Expert", icon: Star, tint: "from-amber-400 to-yellow-500", unlocked: false },
  { name: "Elite Freelancer", icon: Shield, tint: "from-violet-400 to-purple-500", unlocked: false },
];

function FreelancerDashboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("overview");
  const profileCompletion = 78;

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      {/* Profile Header */}
      <div className="surface-card relative overflow-hidden p-7 sm:p-9 mb-8">
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] opacity-15 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <span className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] font-display text-2xl font-bold text-white">
              {initials(fl.name)}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold">{fl.name}</h1>
                <span className="grid size-5 place-items-center rounded-full bg-emerald-500/10 text-emerald-500"><Shield className="size-3" /></span>
              </div>
              <p className="text-lg text-muted-foreground">{fl.title}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">{fl.rating}★ · {fl.projects} projects</span>
                <span className="flex items-center gap-1.5">${fl.rate}/hr</span>
                <span className="flex items-center gap-1.5">{fl.availability}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:ml-auto">
            <Link to="/freelancers/aarav-sharma" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-accent">
              <ExternalLink className="size-4" /> View Public Profile
            </Link>
            <div className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground">
              #42 in {fl.category}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-6">
          <StatMini label="Orbit Score" value={`${fl.score}/100`} icon={<ScoreRing score={fl.score} size={48} />} />
          <StatMini label="Earnings (All Time)" value={`$${fl.earnings.toLocaleString()}`} icon={<DollarSign className="size-5 text-[var(--electric)]" />} />
          <StatMini label="Projects Completed" value={fl.projects} icon={<CheckCircle className="size-5 text-emerald-500" />} />
          <StatMini label="Avg Rating" value={`${fl.rating}★`} icon={<Star className="size-5 fill-current text-amber-500" />} />
          <StatMini label="Response Rate" value={`${fl.responseRate}%`} icon={<Clock className="size-5 text-sky-500" />} />
          <StatMini label="Repeat Clients" value={fl.repeatClients} icon={<Users className="size-5 text-fuchsia-500" />} />
        </div>
      </div>

      {/* Profile Completion Card */}
      <div className="surface-card p-5 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-[var(--violet)]/10"><Target className="size-4 text-[var(--violet)]" /></div>
            <div>
              <p className="font-medium">Profile Completion</p>
              <p className="text-sm text-muted-foreground">{profileCompletion}% complete — {100 - profileCompletion}% to go</p>
            </div>
          </div>
          <div className="h-3 w-48 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] rounded-full" style={{ width: `${profileCompletion}%` }} />
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <CompletionItem label="Portfolio" done={true} />
          <CompletionItem label="Skills" done={true} />
          <CompletionItem label="Services" done={true} />
          <CompletionItem label="Video Intro" done={false} />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="surface-card rounded-2xl p-1 mb-6">
        <div className="flex flex-wrap gap-1" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              role="tab"
              aria-selected={tab === t.key}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                tab === t.key
                  ? "bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] text-white shadow-[0_4px_20px_-8px_var(--violet)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <t.icon className="size-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {tab === "overview" && <OverviewTab fl={fl} badges={badges} monthlyEarnings={monthlyEarnings} />}
        {tab === "projects" && <ProjectsTab />}
        {tab === "applications" && <ApplicationsTab applications={mockApplications} />}
        {tab === "active" && <ActiveProjectsTab projects={mockActiveProjects} />}
        {tab === "completed" && <CompletedProjectsTab projects={mockCompletedProjects} />}
        {tab === "earnings" && <EarningsTab monthlyEarnings={monthlyEarnings} />}
        {tab === "leaderboard" && <LeaderboardTab />}
      </div>
    </div>
  );
}

function StatMini({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-2">{icon}</div>
      <p className="font-display text-lg font-bold">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

function CompletionItem({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`size-4 rounded border ${done ? "bg-emerald-500 border-emerald-500" : "border-border"}`}>
        {done && <CheckCircle className="size-3 text-white mx-auto" />}
      </span>
      <span className={done ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}

function OverviewTab({ fl, badges, monthlyEarnings }: { fl: typeof freelancers[0]; badges: typeof badges; monthlyEarnings: typeof monthlyEarnings }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <div className="surface-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Your Badges</h2>
            <Link to="/freelancers/aarav-sharma#achievements" className="text-xs text-[var(--electric)]">View all</Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {badges.map((b) => (
              <div key={b.name} className={`surface-card lift p-4 text-center ${!b.unlocked ? "opacity-50" : ""}`}>
                <span className={`mx-auto grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${b.tint} shadow-lg`}>
                  <b.icon className="size-6 text-white" />
                </span>
                <p className="mt-3 font-medium text-sm">{b.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{b.unlocked ? "Unlocked" : "Locked"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-5">
          <h2 className="font-display text-xl font-semibold">Monthly Earnings</h2>
          <div className="mt-4 h-48 flex items-end justify-around gap-2">
            {monthlyEarnings.map((m, i) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-[var(--violet)] to-[var(--electric)] transition-all hover:from-[var(--electric)] hover:to-[var(--violet)]"
                  style={{ height: `${(m.value / 6000) * 100}%`, minHeight: 8 }}
                />
                <span className="text-[10px] text-muted-foreground">{m.month}</span>
                <span className="text-xs font-medium">${m.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-5">
          <h2 className="font-display text-xl font-semibold">Quick Actions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Link to="/freelancer-dashboard?tab=projects" className="flex items-center gap-3 rounded-xl border border-border p-4 hover:bg-accent transition-colors">
              <div className="grid size-10 place-items-center rounded-lg bg-[var(--violet)]/10"><Target className="size-4 text-[var(--violet)]" /></div>
              <div><p className="font-medium">Find Projects</p><p className="text-xs text-muted-foreground">Browse matching work</p></div>
            </Link>
            <Link to="/freelancers/aarav-sharma" className="flex items-center gap-3 rounded-xl border border-border p-4 hover:bg-accent transition-colors">
              <div className="grid size-10 place-items-center rounded-lg bg-[var(--electric)]/10"><Edit className="size-4 text-[var(--electric)]" /></div>
              <div><p className="font-medium">Edit Profile</p><p className="text-xs text-muted-foreground">Update your profile</p></div>
            </Link>
            <Link to="/freelancer-dashboard?tab=applications" className="flex items-center gap-3 rounded-xl border border-border p-4 hover:bg-accent transition-colors">
              <div className="grid size-10 place-items-center rounded-lg bg-amber-500/10"><FileText className="size-4 text-amber-500" /></div>
              <div><p className="font-medium">My Applications</p><p className="text-xs text-muted-foreground">Track proposals</p></div>
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="surface-card p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold">Orbit Score Breakdown</h3>
            <span className="text-xs text-[var(--electric)]">Updated hourly</span>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { label: "Client Ratings", value: 98, weight: "35%" },
              { label: "On-Time Delivery", value: 96, weight: "25%" },
              { label: "Response Rate", value: 94, weight: "15%" },
              { label: "Repeat Clients", value: 92, weight: "15%" },
              { label: "Portfolio Depth", value: 88, weight: "10%" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-[130px]">{s.label}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] rounded-full" style={{ width: `${s.value}%` }} />
                </div>
                <span className="text-sm font-semibold w-12 text-right">{s.value}</span>
                <span className="text-xs text-muted-foreground w-16">{s.weight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-5">
          <h3 className="font-display font-semibold">Leaderboard Position</h3>
          <div className="mt-4 flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500">
              <Award className="size-7 text-white" />
            </div>
            <div>
              <p className="font-display text-2xl font-bold">#42</p>
              <p className="text-sm text-muted-foreground">in {fl.category} (This Month)</p>
              <div className="mt-2 h-2 w-40 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] rounded-full" style={{ width: "65%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsTab() {
  return (
    <div className="space-y-4">
      {projects.map((p) => (
        <FreelancerProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}

function FreelancerProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="surface-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{project.company}</span>
            <span>·</span>
            <span>{project.posted}</span>
            <span>·</span>
            <span>{project.level}</span>
          </div>
          <h3 className="mt-1 font-display font-semibold">{project.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.skills.map((s) => (
              <span key={s} className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] text-muted-foreground">{s}</span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-xl font-bold">{project.type === "Hourly" ? `$${project.budgetLow}–${project.budgetHigh}/hr` : `$${project.budgetLow}–${project.budgetHigh}`}</p>
          <p className="text-xs text-muted-foreground">{project.type} · {project.duration}</p>
          <div className="mt-3 flex justify-end gap-2">
            <button className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">Save</button>
            <Link to={`/projects/${project.id}`} className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-4 py-2 text-sm font-semibold text-white">Apply</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationsTab({ applications }: { applications: typeof mockApplications }) {
  const statusColors = {
    pending: "bg-[var(--violet)]/10 text-[var(--violet)]",
    shortlisted: "bg-emerald-500/10 text-emerald-500",
    declined: "bg-destructive/10 text-destructive",
    hired: "bg-sky-500/10 text-sky-500",
  } as const;

  return (
    <div className="space-y-3">
      {applications.map((a) => (
        <div key={a.id} className="surface-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold">{a.project}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusColors[a.status]}`}>{a.status}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{a.client} · {a.budget} · Applied {a.applied}</p>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <span>Proposed: ${a.proposedRate}/hr</span>
                <span>Delivery: {a.proposedDays} days</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">View Proposal</button>
              {a.status === "pending" && <button className="rounded-full border border-destructive text-destructive px-4 py-2 text-sm hover:bg-destructive/10">Withdraw</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActiveProjectsTab({ projects }: { projects: typeof mockActiveProjects }) {
  return (
    <div className="space-y-4">
      {projects.map((p) => (
        <Link key={p.id} to={`/project/${p.id}`} className="surface-card p-5 hover:border-[var(--violet)]/50 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold">{p.title}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${p.status === "in-progress" ? "bg-[var(--violet)]/10 text-[var(--violet)]" : "bg-amber-500/10 text-amber-500"}`}>
                  {p.status.replace("-", " ")}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Client: {p.client}</p>
              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                <span>Budget: ${p.budget.toLocaleString()}</span>
                <span>Earned: ${p.earned.toLocaleString()}</span>
                <span>Deadline: {new Date(p.deadline).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="w-48 shrink-0">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)]" style={{ width: `${p.progress}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground text-right">{p.progress}% · {p.milestone}</p>
            </div>
            <ArrowRight className="size-5 text-muted-foreground shrink-0" />
          </div>
        </Link>
      ))}
    </div>
  );
}

function CompletedProjectsTab({ projects }: { projects: typeof mockCompletedProjects }) {
  return (
    <div className="space-y-4">
      {projects.map((p) => (
        <div key={p.id} className="surface-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.client} · Completed {new Date(p.completed).toLocaleDateString()}</p>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="font-semibold">${p.budget.toLocaleString()}</span>
                <div className="flex items-center gap-1">
                  <Star className="size-3.5 fill-current text-amber-500" /> {p.rating}.0
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">"{p.review}"</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Link to={`/freelancers/aarav-sharma#reviews`} className="text-xs text-[var(--electric)]">View on profile</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EarningsTab({ monthlyEarnings }: { monthlyEarnings: typeof monthlyEarnings }) {
  const totalThisYear = monthlyEarnings.reduce((a, b) => a + b.value, 0);
  const avgMonthly = Math.round(totalThisYear / monthlyEarnings.length);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="surface-card p-5">
        <h2 className="font-display text-xl font-semibold">Earnings Overview</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <EarningStat label="This Year" value={`$${totalThisYear.toLocaleString()}`} icon={<DollarSign className="size-5 text-[var(--electric)]" />} />
          <EarningStat label="Avg/Month" value={`$${avgMonthly.toLocaleString()}`} icon={<BarChart3 className="size-5 text-emerald-500" />} />
          <EarningStat label="Active Projects" value="2" icon={<Briefcase className="size-5 text-sky-500" />} />
        </div>
        <div className="mt-8 h-64 flex items-end justify-around gap-2">
          {monthlyEarnings.map((m, i) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-gradient-to-t from-[var(--violet)] to-[var(--electric)] transition-all hover:from-[var(--electric)] hover:to-[var(--violet)]"
                style={{ height: `${(m.value / 6000) * 100}%`, minHeight: 8 }}
              />
              <span className="text-[10px] text-muted-foreground">{m.month}</span>
              <span className="text-xs font-medium">${m.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="surface-card p-5">
        <h2 className="font-display text-xl font-semibold">Recent Payouts</h2>
        <div className="mt-4 space-y-3">
          {[
            { date: "2024-01-20", project: "Product Launch Platform", amount: 3200, status: "completed" },
            { date: "2024-01-05", project: "E-Commerce Redesign (Milestone 2)", amount: 1400, status: "completed" },
            { date: "2023-12-28", project: "Internal Operations Suite", amount: 2100, status: "completed" },
            { date: "2023-12-15", project: "Mobile App (Milestone 1)", amount: 2250, status: "completed" },
            { date: "2023-12-01", project: "Marketing Site", amount: 1800, status: "completed" },
          ].map((p, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
              <div>
                <p className="font-medium">{p.project}</p>
                <p className="text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-display font-semibold text-emerald-500">+${p.amount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground capitalize">{p.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EarningStat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="grid size-9 place-items-center rounded-lg bg-[var(--violet)]/10">{icon}</div>
      </div>
      <p className="mt-2 font-display text-xl font-bold">{value}</p>
    </div>
  );
}

function LeaderboardTab() {
  const myRank = 42;
  const topFreelancers = freelancers.slice(0, 10);

  return (
    <div className="surface-card overflow-hidden">
      {/* My Position */}
      <div className="p-5 border-b border-border bg-gradient-to-r from-[var(--violet)]/5 to-[var(--electric)]/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500">
              <span className="font-display text-xl font-bold text-white">#{myRank}</span>
            </div>
            <div>
              <p className="font-display font-semibold">Your Position</p>
              <p className="text-sm text-muted-foreground">{fl.category} · This Month</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold">{fl.score}/100</p>
            <p className="text-xs text-muted-foreground">Orbit Score</p>
          </div>
        </div>
      </div>

      {/* Top 10 */}
      <div className="divide-y divide-border/50">
        {topFreelancers.map((f, i) => (
          <Link key={f.id} to={`/freelancers/${f.id}`} className={`flex items-center gap-4 p-4 transition-colors ${i < 3 ? "bg-gradient-to-r from-amber-500/5 to-orange-500/5" : "hover:bg-accent/50"}`}>
            <span className={`shrink-0 font-display font-bold text-lg ${i < 3 ? "text-amber-500" : "text-muted-foreground"}`}>#{i + 1}</span>
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-xs font-bold text-white">
              {initials(f.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate">{f.name}</p>
              <p className="text-xs text-muted-foreground">{f.title} · ${f.rate}/hr</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{f.score}/100</p>
              <p className="text-xs text-muted-foreground">{f.projects} projects</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}