import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  FileText,
  Users,
  MessageSquare,
  Heart,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  Star,
} from "lucide-react";
import { useState, useMemo } from "react";
import { projects, freelancers, type Project, type Freelancer } from "@/lib/data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Employer Dashboard | Orbitwork" },
      { name: "description", content: "Manage your projects, proposals, and hired freelancers." },
    ],
  }),
  component: EmployerDashboard,
});

const tabs = [
  { key: "overview", label: "Overview", icon: Briefcase },
  { key: "active", label: "Active Projects", icon: CheckCircle },
  { key: "jobs", label: "Open Jobs", icon: Briefcase },
  { key: "proposals", label: "Proposals", icon: FileText },
  { key: "saved", label: "Saved Freelancers", icon: Heart },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "completed", label: "Completed", icon: CheckCircle },
] as const;

const mockProjects = [
  { id: "1", title: "Restaurant Website", status: "active", freelancer: "Aarav Sharma", budget: 1200, spent: 400, progress: 35, milestone: "Design Phase", deadline: "2024-02-15" },
  { id: "2", title: "AI Support Agent", status: "active", freelancer: "Daniel Ruiz", budget: 4500, spent: 1800, progress: 60, milestone: "RAG Implementation", deadline: "2024-03-01" },
  { id: "3", title: "Brand Identity System", status: "review", freelancer: "Hana Sato", budget: 5500, spent: 5500, progress: 100, milestone: "Final Delivery", deadline: "2024-01-28" },
  { id: "4", title: "Product Explainer Video", status: "completed", freelancer: "Mina Okafor", budget: 2800, spent: 2800, progress: 100, milestone: "Completed", deadline: "2024-01-10" },
];

const mockProposals = [
  { id: "1", project: "Restaurant Website", freelancer: "Alex Moreau", rate: 48, delivery: "10 days", cover: "I can build this with Next.js...", status: "pending", portfolio: ["E-Commerce Experience Redesign", "Product Launch Platform"] },
  { id: "2", project: "AI Support Agent", freelancer: "Priya Nair", rate: 33, delivery: "14 days", cover: "I have extensive RAG experience...", status: "pending", portfolio: ["Analytics Stack Setup"] },
  { id: "3", project: "Brand Identity System", freelancer: "Jonas Weber", rate: 52, delivery: "21 days", cover: "My approach to brand systems...", status: "shortlisted", portfolio: ["Brand System for Fintech"] },
];

const mockSavedFreelancers = freelancers.slice(0, 5);

function EmployerDashboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("overview");
  const [activeProposal, setActiveProposal] = useState<typeof mockProposals[0] | null>(null);

  const stats = useMemo(() => ({
    activeProjects: mockProjects.filter(p => p.status === "active").length,
    openJobs: projects.length,
    totalProposals: mockProposals.length,
    totalSpending: mockProjects.reduce((a, b) => a + b.spent, 0),
    completedProjects: mockProjects.filter(p => p.status === "completed").length,
  }), []);

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Manage your projects and freelancers</p>
        </div>
        <Link to="/post-project" className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-5 py-2.5 text-sm font-semibold text-white">
          <Plus className="size-4 mr-2" /> Post Project
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
        <StatCard label="Active Projects" value={stats.activeProjects} icon={Briefcase} trend="+2 this week" trendIcon={TrendingUp} />
        <StatCard label="Open Jobs" value={stats.openJobs} icon={FileText} trend="3 new matches" trendIcon={Star} />
        <StatCard label="Pending Proposals" value={stats.totalProposals} icon={FileText} trend="5 awaiting review" trendIcon={Clock} />
        <StatCard label="Total Spending" value={`$${stats.totalSpending.toLocaleString()}`} icon={DollarSign} trend="This quarter" trendIcon={TrendingUp} />
        <StatCard label="Completed" value={stats.completedProjects} icon={CheckCircle} trend="4.9 avg rating" trendIcon={Star} />
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
        {tab === "overview" && <OverviewTab stats={stats} projects={mockProjects} recommended={freelancers.slice(0, 4)} />}
        {tab === "active" && <ProjectsTab projects={mockProjects.filter(p => p.status === "active")} />}
        {tab === "jobs" && <JobsTab />}
        {tab === "proposals" && <ProposalsTab proposals={mockProposals} onView={setActiveProposal} />}
        {tab === "saved" && <SavedFreelancersTab freelancers={mockSavedFreelancers} />}
        {tab === "messages" && <MessagesTab />}
        {tab === "completed" && <ProjectsTab projects={mockProjects.filter(p => p.status === "completed")} />}
      </div>

      {/* Proposal Modal */}
      {activeProposal && (
        <ProposalModal proposal={activeProposal} onClose={() => setActiveProposal(null)} />
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, trend, trendIcon: TrendIcon }: { label: string; value: string | number; icon: typeof Briefcase; trend: string; trendIcon: typeof TrendingUp }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-2xl font-bold">{value}</p>
        </div>
        <div className="grid size-10 place-items-center rounded-xl bg-[var(--violet)]/10">
          <Icon className="size-5 text-[var(--violet)]" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <TrendIcon className="size-3" />
        <span>{trend}</span>
      </div>
    </div>
  );
}

function OverviewTab({ stats, projects, recommended }: { stats: ReturnType<typeof useMemo>; projects: typeof mockProjects; recommended: typeof freelancers }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Recent Projects</h2>
        {projects.slice(0, 3).map((p) => (
          <ProjectRow key={p.id} project={p} />
        ))}
        <Link to="/dashboard?tab=active" className="block text-center py-3 text-sm font-medium text-[var(--electric)] hover:text-[var(--violet)]">
          View all projects <ArrowRight className="size-4 inline" />
        </Link>
      </div>
      <div className="space-y-6">
        <div className="surface-card p-5">
          <h3 className="font-display font-semibold">Quick Actions</h3>
          <div className="mt-4 grid gap-2">
            <Link to="/post-project" className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent transition-colors">
              <div className="grid size-9 place-items-center rounded-lg bg-[var(--violet)]/10"><Plus className="size-4 text-[var(--violet)]" /></div>
              <div><p className="font-medium">Post a Project</p><p className="text-xs text-muted-foreground">Start a new project</p></div>
            </Link>
            <Link to="/freelancers" className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent transition-colors">
              <div className="grid size-9 place-items-center rounded-lg bg-[var(--electric)]/10"><Users className="size-4 text-[var(--electric)]" /></div>
              <div><p className="font-medium">Find Talent</p><p className="text-xs text-muted-foreground">Browse freelancers</p></div>
            </Link>
            <Link to="/projects" className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent transition-colors">
              <div className="grid size-9 place-items-center rounded-lg bg-emerald-500/10"><Briefcase className="size-4 text-emerald-500" /></div>
              <div><p className="font-medium">Browse Projects</p><p className="text-xs text-muted-foreground">See what others are posting</p></div>
            </Link>
          </div>
        </div>
        <div className="surface-card p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold">Recommended for You</h3>
            <Link to="/freelancers" className="text-xs text-[var(--electric)]">View all</Link>
          </div>
          <div className="mt-4 space-y-3">
            {recommended.map((fl) => (
              <div key={fl.id} className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-xs font-bold text-white">
                  {fl.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{fl.name}</p>
                  <p className="text-xs text-muted-foreground">{fl.title} · ${fl.rate}/hr · {fl.rating}★</p>
                </div>
                <Link to={`/freelancers/${fl.id}`} className="text-xs text-[var(--violet)] font-medium">View</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsTab({ projects }: { projects: typeof mockProjects }) {
  return (
    <div className="space-y-3">
      {projects.length === 0 ? (
        <div className="surface-card p-12 text-center text-muted-foreground">No projects in this category</div>
      ) : (
        projects.map((p) => <ProjectRow key={p.id} project={p} />)
      )}
    </div>
  );
}

function ProjectRow({ project }: { project: typeof mockProjects[0] }) {
  const statusColors = {
    active: "bg-[var(--violet)]/10 text-[var(--violet)]",
    review: "bg-amber-500/10 text-amber-500",
    completed: "bg-emerald-500/10 text-emerald-500",
  } as const;

  return (
    <Link to={`/project/${project.id}`} className="surface-card p-5 hover:border-[var(--violet)]/50 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold">{project.title}</h3>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusColors[project.status]}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Freelancer: {project.freelancer}</p>
          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
            <span>Budget: ${project.budget.toLocaleString()}</span>
            <span>Spent: ${project.spent.toLocaleString()}</span>
            <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="w-48 shrink-0">
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground text-right">{project.progress}% · {project.milestone}</p>
        </div>
        <ArrowRight className="size-5 text-muted-foreground shrink-0" />
      </div>
    </Link>
  );
}

function JobsTab() {
  return (
    <div className="space-y-3">
      {projects.map((p) => (
        <JobCard key={p.id} project={p} />
      ))}
    </div>
  );
}

function JobCard({ project }: { project: typeof projects[0] }) {
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
          <p className="font-display text-xl font-bold">${project.budgetLow}–${project.budgetHigh}</p>
          <p className="text-xs text-muted-foreground">{project.type}</p>
          <div className="mt-3 flex justify-end gap-2">
            <Link to={`/projects/${project.id}`} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">View</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProposalsTab({ proposals, onView }: { proposals: typeof mockProposals; onView: (p: typeof mockProposals[0]) => void }) {
  return (
    <div className="space-y-4">
      {proposals.map((p) => (
        <div key={p.id} className="surface-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold">{p.project}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${p.status === "shortlisted" ? "bg-emerald-500/10 text-emerald-500" : "bg-[var(--violet)]/10 text-[var(--violet)]"}`}>
                  {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.freelancer} · ${p.rate}/hr · {p.delivery}</p>
              <p className="mt-2 text-sm line-clamp-2 text-muted-foreground">{p.cover}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.portfolio.map((item) => (
                  <span key={item} className="rounded-full bg-[var(--violet)]/10 px-2.5 py-1 text-[11px] text-[var(--violet)]">{item}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onView(p)} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">Review</button>
              {p.status === "pending" && (
                <button className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-4 py-2 text-sm font-semibold text-white">Shortlist</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SavedFreelancersTab({ freelancers: saved }: { freelancers: typeof freelancers }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {saved.map((fl) => (
        <SavedFreelancerCard key={fl.id} fl={fl} />
      ))}
    </div>
  );
}

function SavedFreelancerCard({ fl }: { fl: typeof freelancers[0] }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-xs font-bold text-white">
          {fl.name.split(" ").map(n => n[0]).join("").slice(0,2)}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold truncate">{fl.name}</h3>
          <p className="text-sm text-muted-foreground">{fl.title} · ${fl.rate}/hr</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {fl.skills.slice(0, 3).map((s) => (
              <span key={s} className="rounded-full border border-border bg-muted/60 px-2 py-1 text-[10px] text-muted-foreground">{s}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Star className="size-3.5 fill-current text-amber-500" /> {fl.rating} · {fl.projects} projects
        </div>
        <Link to={`/freelancers/${fl.id}`} className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent">Profile</Link>
      </div>
    </div>
  );
}

function MessagesTab() {
  const conversations = [
    { id: "1", name: "Aarav Sharma", project: "Restaurant Website", lastMessage: "I've completed the homepage design", time: "2h ago", unread: 2, avatar: "AS" },
    { id: "2", name: "Sarah Lindqvist", project: "Brand Identity", lastMessage: "Here are the logo concepts", time: "5h ago", unread: 0, avatar: "SL" },
    { id: "3", name: "Daniel Ruiz", project: "AI Support Agent", lastMessage: "The RAG pipeline is ready for testing", time: "1d ago", unread: 1, avatar: "DR" },
  ];

  return (
    <div className="surface-card overflow-hidden">
      {conversations.map((c) => (
        <Link key={c.id} to={`/messages/${c.id}`} className="flex items-center gap-4 p-4 border-b border-border/50 last:border-0 hover:bg-accent/50 transition-colors">
          <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-sm font-bold text-white">{c.avatar}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="font-medium truncate">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.time}</p>
            </div>
            <p className="mt-1 truncate text-sm text-muted-foreground">{c.lastMessage}</p>
            <p className="mt-1 text-xs text-[var(--electric)]">{c.project}</p>
          </div>
          {c.unread > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-[var(--violet)] text-[10px] font-bold text-white">{c.unread}</span>
          )}
        </Link>
      ))}
    </div>
  );
}

function ProposalModal({ proposal, onClose }: { proposal: typeof mockProposals[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="surface-card max-h-[90vh] w-full max-w-2xl overflow-y-auto p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">Proposal from {proposal.freelancer}</h2>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-accent">×</button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl border border-border p-3"><p className="text-muted-foreground">Rate</p><p className="font-semibold">${proposal.rate}/hr</p></div>
            <div className="rounded-xl border border-border p-3"><p className="text-muted-foreground">Delivery</p><p className="font-semibold">{proposal.delivery}</p></div>
            <div className="rounded-xl border border-border p-3"><p className="text-muted-foreground">Status</p><p className="font-semibold capitalize">{proposal.status}</p></div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Cover Message</p>
            <p className="text-sm text-muted-foreground">{proposal.cover}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Portfolio Attachments</p>
            <div className="flex flex-wrap gap-2">
              {proposal.portfolio.map((item) => (
                <span key={item} className="rounded-full bg-[var(--violet)]/10 px-3 py-1 text-sm text-[var(--violet)]">{item}</span>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <button onClick={onClose} className="rounded-full border border-border px-5 py-2.5 text-sm">Close</button>
            {proposal.status === "pending" && (
              <button className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-5 py-2.5 text-sm font-semibold text-white">Shortlist & Reply</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}