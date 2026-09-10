import { createFileRoute } from "@tanstack/react-router";
import {
  Users, Briefcase, DollarSign, Star, TrendingUp, Activity,
  BarChart3, Settings, Shield, Flag,
  MoreVertical, Search, Edit, Trash2, Plus
} from "lucide-react";
import { useState, useMemo } from "react";
import { freelancers, projects, categories } from "@/lib/data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Orbitwork" },
      { name: "description", content: "Platform administration and analytics" },
    ],
  }),
  component: AdminDashboard,
});

const adminTabs = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "users", label: "Users", icon: Users },
  { key: "freelancers", label: "Freelancers", icon: Briefcase },
  { key: "employers", label: "Employers", icon: Users },
  { key: "projects", label: "Projects", icon: Briefcase },
  { key: "categories", label: "Categories", icon: BarChart3 },
  { key: "reviews", label: "Reviews", icon: Star },
  { key: "payments", label: "Payments", icon: DollarSign },
  { key: "disputes", label: "Disputes", icon: Flag },
  { key: "leaderboard", label: "Leaderboard", icon: TrendingUp },
  { key: "badges", label: "Badges", icon: Shield },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

const mockUsers = [
  { id: "1", name: "Aarav Sharma", email: "aarav@example.com", role: "freelancer", status: "active", joined: "2023-01-15", projects: 248, earnings: 125000, rating: 4.98 },
  { id: "2", name: "Sarah Lindqvist", email: "sarah@example.com", role: "freelancer", status: "active", joined: "2023-03-22", projects: 173, earnings: 89000, rating: 4.95 },
  { id: "3", name: "Nova Retail", email: "hr@novaretail.com", role: "employer", status: "active", joined: "2023-02-10", projects: 12, spent: 45000, rating: 4.9 },
  { id: "4", name: "Halcyon Labs", email: "team@halcyon.io", role: "employer", status: "active", joined: "2023-04-05", projects: 8, spent: 32000, rating: 4.8 },
  { id: "5", name: "Alex Moreau", email: "alex@example.com", role: "freelancer", status: "pending", joined: "2024-01-20", projects: 0, earnings: 0, rating: 0 },
  { id: "6", name: "Fieldnote", email: "ops@fieldnote.co", role: "employer", status: "suspended", joined: "2023-06-15", projects: 5, spent: 18000, rating: 4.2 },
];

const mockDisputes = [
  { id: "1", project: "Brand Identity System", freelancer: "Hana Sato", employer: "Northlane", amount: 5500, reason: "Scope creep - client requested 3 additional revisions beyond agreement", status: "open", opened: "2024-01-20" },
  { id: "2", project: "Mobile App", freelancer: "Jonas Weber", employer: "Pacemakers", amount: 7500, reason: "Freelancer delivered 2 weeks late without communication", status: "in-review", opened: "2024-01-15" },
  { id: "3", project: "Product Explainer", freelancer: "Mina Okafor", employer: "Fieldnote", amount: 2800, reason: "Quality disputes - audio sync issues", status: "resolved", opened: "2024-01-10", resolved: "2024-01-18" },
];

const monthlyData = [
  { month: "Aug", users: 8200, projects: 1200, revenue: 185000, active: 3400 },
  { month: "Sep", users: 8650, projects: 1450, revenue: 210000, active: 3800 },
  { month: "Oct", users: 9100, projects: 1600, revenue: 235000, active: 4100 },
  { month: "Nov", users: 9500, projects: 1800, revenue: 265000, active: 4400 },
  { month: "Dec", users: 10000, projects: 2100, revenue: 310000, active: 4800 },
  { month: "Jan", users: 10400, projects: 2300, revenue: 345000, active: 5100 },
];

const categoryDistribution = categories.map(c => ({ name: c.name, value: c.count, color: `hsl(${Math.random() * 360}, 70%, 50%)` }));

function AdminDashboard() {
  const [tab, setTab] = useState<(typeof adminTabs)[number]["key"]>("overview");
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState<"all" | "freelancer" | "employer">("all");
  const [userStatusFilter, setUserStatusFilter] = useState<"all" | "active" | "pending" | "suspended">("all");

  const kpis = useMemo(() => ({
    totalUsers: 10400,
    activeUsers: 5100,
    totalProjects: 25800,
    completedProjects: 23400,
    totalRevenue: 1450000,
    avgRating: 4.8,
    thisMonth: { users: 400, projects: 200, revenue: 35000 },
  }), []);

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 glass border-b border-border px-5 py-3">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="relative grid size-8 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)]">
              <span className="size-2.5 rounded-full bg-background" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">Orbitwork Admin</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <span className="rounded-full border border-border px-3 py-1.5 text-xs font-medium bg-destructive/10 text-destructive">ADMIN</span>
            <Link to="/dashboard" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">Back to App</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-6">
        {/* Tab Navigation */}
        <div className="surface-card rounded-2xl p-1 mb-6 overflow-x-auto">
          <div className="flex gap-1 min-w-max" role="tablist">
            {adminTabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                role="tab"
                aria-selected={tab === t.key}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
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
          {tab === "overview" && <OverviewTab kpis={kpis} monthlyData={monthlyData} categoryDistribution={categoryDistribution} />}
          {tab === "users" && <UsersTab users={mockUsers} search={userSearch} setSearch={setUserSearch} roleFilter={userRoleFilter} setRoleFilter={setUserRoleFilter} statusFilter={userStatusFilter} setStatusFilter={setUserStatusFilter} />}
          {tab === "freelancers" && <FreelancersAdminTab />}
          {tab === "employers" && <EmployersAdminTab />}
          {tab === "projects" && <ProjectsAdminTab />}
          {tab === "categories" && <CategoriesAdminTab />}
          {tab === "reviews" && <ReviewsAdminTab />}
          {tab === "payments" && <PaymentsAdminTab />}
          {tab === "disputes" && <DisputesAdminTab disputes={mockDisputes} />}
          {tab === "leaderboard" && <LeaderboardAdminTab />}
          {tab === "badges" && <BadgesAdminTab />}
          {tab === "settings" && <SettingsAdminTab />}
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ kpis, monthlyData, categoryDistribution }: { kpis: any; monthlyData: any[]; categoryDistribution: any[] }) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminKPI label="Total Users" value={kpis.totalUsers.toLocaleString()} icon={<Users className="size-5" />} trend={`+${kpis.thisMonth.users} this month`} trendUp />
        <AdminKPI label="Active Users" value={kpis.activeUsers.toLocaleString()} icon={<Activity className="size-5" />} trend={`${Math.round(kpis.activeUsers/kpis.totalUsers*100)}% active`} trendUp />
        <AdminKPI label="Total Projects" value={kpis.totalProjects.toLocaleString()} icon={<Briefcase className="size-5" />} trend={`+${kpis.thisMonth.projects} this month`} trendUp />
        <AdminKPI label="Revenue" value={`$${(kpis.totalRevenue/1000).toFixed(0)}k`} icon={<DollarSign className="size-5" />} trend={`+$${(kpis.thisMonth.revenue/1000).toFixed(0)}k this month`} trendUp />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminKPI label="Completed Projects" value={kpis.completedProjects.toLocaleString()} icon={<Briefcase className="size-5" />} trend={`${Math.round(kpis.completedProjects/kpis.totalProjects*100)}% completion rate`} trendUp />
        <AdminKPI label="Avg Rating" value={kpis.avgRating} icon={<Star className="size-5 fill-current" />} trend="Excellent" trendUp />
        <AdminKPI label="Freelancers" value={freelancers.length} icon={<Users className="size-5" />} trend={`${categories.reduce((a,b)=>a+b.count,0)} total in system`} trendUp />
        <AdminKPI label="Categories" value={categories.length} icon={<BarChart3 className="size-5" />} trend="10 active disciplines" trendUp />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="surface-card p-6">
          <h2 className="font-display text-xl font-semibold">Platform Growth</h2>
          <div className="mt-4 h-80 flex items-end justify-around gap-2">
            {monthlyData.map((m, i) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t bg-gradient-to-t from-[var(--violet)] to-[var(--electric)] transition-all" style={{ height: `${(m.users / 12000) * 100}%`, minHeight: 8 }} title={`Users: ${m.users.toLocaleString()}`} />
                <span className="text-[10px] text-muted-foreground">{m.month}</span>
                <span className="text-xs font-medium">{m.users.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="size-2 rounded bg-[var(--violet)]" /> Users</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded bg-[var(--electric)]" /> Projects</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded bg-emerald-500" /> Revenue</span>
          </div>
        </div>

        <div className="surface-card p-6">
          <h2 className="font-display text-xl font-semibold">Category Distribution</h2>
          <div className="mt-4 space-y-3">
            {categoryDistribution.slice(0, 8).map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-32 truncate">{c.name}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] rounded-full" style={{ width: `${(c.value / 4000) * 100}%` }} />
                </div>
                <span className="text-sm font-medium w-16 text-right">{c.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="surface-card p-6">
        <h2 className="font-display text-xl font-semibold">Recent Activity</h2>
        <div className="mt-4 space-y-3">
          {[
            { action: "New user registered", user: "Alex Moreau", type: "freelancer", time: "5 min ago" },
            { action: "Project posted", user: "Ember & Oak", project: "Restaurant Website", time: "12 min ago" },
            { action: "Payment released", amount: "$600", project: "E-Commerce Redesign", time: "1 hour ago" },
            { action: "Review submitted", user: "Nova Retail", rating: 5, time: "2 hours ago" },
            { action: "Dispute opened", project: "Brand Identity System", time: "3 hours ago" },
            { action: "Freelancer verified", user: "Daniel Ruiz", time: "4 hours ago" },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-full bg-[var(--violet)]/10"><Activity className="size-4 text-[var(--violet)]" /></div>
                <div>
                  <p className="font-medium">{a.action}</p>
                  <p className="text-sm text-muted-foreground">{a.user || a.project || ""} {a.amount ? `· ${a.amount}` : ""} {a.rating ? `· ${a.rating}★` : ""}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminKPI({ label, value, icon, trend, trendUp }: { label: string; value: string | number; icon: React.ReactNode; trend: string; trendUp: boolean }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-2xl font-bold">{value}</p>
        </div>
        <div className="grid size-10 place-items-center rounded-xl bg-[var(--violet)]/10">{icon}</div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <TrendingUp className="size-3" />
        <span>{trend}</span>
      </div>
    </div>
  );
}

function UsersTab({ users, search, setSearch, roleFilter, setRoleFilter, statusFilter, setStatusFilter }: any) {
  const filtered = useMemo(() =>
    users.filter(u =>
      (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter === "all" || u.role === roleFilter) &&
      (statusFilter === "all" || u.status === statusFilter)
    ), [users, search, roleFilter, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="surface-card p-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[var(--violet)]" />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value as any)} className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm">
            <option value="all">All Roles</option>
            <option value="freelancer">Freelancers</option>
            <option value="employer">Employers</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Projects</th>
              <th className="p-4">Earnings/Spent</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-accent/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-xs font-bold text-white">{u.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</span>
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4"><span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${u.role === "freelancer" ? "bg-[var(--violet)]/10 text-[var(--violet)]" : "bg-[var(--electric)]/10 text-[var(--electric)]"}`}>{u.role}</span></td>
                <td className="p-4"><span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${u.status === "active" ? "bg-emerald-500/10 text-emerald-500" : u.status === "pending" ? "bg-amber-500/10 text-amber-500" : "bg-destructive/10 text-destructive"}`}>{u.status}</span></td>
                <td className="p-4 text-muted-foreground">{new Date(u.joined).toLocaleDateString()}</td>
                <td className="p-4">{u.projects}</td>
                <td className="p-4">{u.role === "freelancer" ? `$${u.earnings.toLocaleString()}` : `$${u.spent.toLocaleString()}`}</td>
                <td className="p-4">{u.rating ? `${u.rating}★` : "—"}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"><Eye className="size-4" /></button>
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"><Edit className="size-4" /></button>
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><UserX className="size-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FreelancersAdminTab() {
  return (
    <div className="space-y-4">
      <div className="surface-card p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Freelancer Management</h2>
          <button className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-4 py-2 text-sm font-semibold text-white"><Plus className="size-4 mr-2" /> Add Freelancer</button>
        </div>
      </div>
      <div className="surface-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <th className="p-4">Freelancer</th>
              <th className="p-4">Category</th>
              <th className="p-4">Orbit Score</th>
              <th className="p-4">Projects</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Earnings</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {freelancers.map((f) => (
              <tr key={f.id} className="hover:bg-accent/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-xs font-bold text-white">{f.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</span>
                    <div>
                      <p className="font-medium">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{f.title}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">{f.category}</td>
                <td className="p-4 font-semibold">{f.score}/100</td>
                <td className="p-4">{f.projects}</td>
                <td className="p-4">{f.rating}★</td>
                <td className="p-4">$${f.earnings.toLocaleString()}</td>
                <td className="p-4"><span className="rounded-full px-2.5 py-0.5 text-[10px] font-medium bg-emerald-500/10 text-emerald-500">Active</span></td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"><Eye className="size-4" /></button>
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"><Edit className="size-4" /></button>
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><UserX className="size-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmployersAdminTab() {
  return (
    <div className="surface-card p-6">
      <h2 className="font-display text-xl font-semibold mb-4">Employer Management</h2>
      <p className="text-muted-foreground">Employer management interface coming soon...</p>
    </div>
  );
}

function ProjectsAdminTab() {
  return (
    <div className="surface-card p-6">
      <h2 className="font-display text-xl font-semibold mb-4">Project Management</h2>
      <p className="text-muted-foreground">Project management interface coming soon...</p>
    </div>
  );
}

function CategoriesAdminTab() {
  return (
    <div className="space-y-4">
      <div className="surface-card p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Categories</h2>
          <button className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-4 py-2 text-sm font-semibold text-white"><Plus className="size-4 mr-2" /> Add Category</button>
        </div>
      </div>
      <div className="surface-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <th className="p-4">Category</th>
              <th className="p-4">Freelancers</th>
              <th className="p-4">Starting Rate</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {categories.map((c) => (
              <tr key={c.name} className="hover:bg-accent/50">
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4">{c.count.toLocaleString()}</td>
                <td className="p-4">${c.from}/hr</td>
                <td className="p-4 text-muted-foreground">{c.desc}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"><Edit className="size-4" /></button>
                    <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReviewsAdminTab() {
  return (
    <div className="surface-card p-6">
      <h2 className="font-display text-xl font-semibold mb-4">Review Moderation</h2>
      <p className="text-muted-foreground">Review moderation interface coming soon...</p>
    </div>
  );
}

function PaymentsAdminTab() {
  return (
    <div className="surface-card p-6">
      <h2 className="font-display text-xl font-semibold mb-4">Payment Management</h2>
      <p className="text-muted-foreground">Payment management interface coming soon...</p>
    </div>
  );
}

function DisputesAdminTab({ disputes }: { disputes: any[] }) {
  return (
    <div className="space-y-4">
      <div className="surface-card p-4">
        <h2 className="font-display text-xl font-semibold">Dispute Resolution</h2>
      </div>
      <div className="surface-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <th className="p-4">Dispute</th>
              <th className="p-4">Project</th>
              <th className="p-4">Parties</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Status</th>
              <th className="p-4">Opened</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {disputes.map((d) => (
              <tr key={d.id} className="hover:bg-accent/50">
                <td className="p-4 font-medium">#{d.id}</td>
                <td className="p-4">{d.project}</td>
                <td className="p-4">{d.freelancer} vs {d.employer}</td>
                <td className="p-4 font-semibold">${d.amount.toLocaleString()}</td>
                <td className="p-4 text-muted-foreground max-w-xs truncate">{d.reason}</td>
                <td className="p-4"><span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${d.status === "open" ? "bg-[var(--violet)]/10 text-[var(--violet)]" : d.status === "in-review" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"}`}>{d.status.replace("-", " ")}</span></td>
                <td className="p-4 text-muted-foreground">{new Date(d.opened).toLocaleDateString()}</td>
                <td className="p-4">
                  <button className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LeaderboardAdminTab() {
  return (
    <div className="surface-card p-6">
      <h2 className="font-display text-xl font-semibold mb-4">Leaderboard Management</h2>
      <p className="text-muted-foreground">Leaderboard management interface coming soon...</p>
    </div>
  );
}

function BadgesAdminTab() {
  return (
    <div className="surface-card p-6">
      <h2 className="font-display text-xl font-semibold mb-4">Badge Management</h2>
      <p className="text-muted-foreground">Badge management interface coming soon...</p>
    </div>
  );
}

function SettingsAdminTab() {
  return (
    <div className="space-y-6">
      <div className="surface-card p-6">
        <h2 className="font-display text-xl font-semibold mb-4">Platform Settings</h2>
        <div className="space-y-4">
          <SettingRow label="Platform Name" value="Orbitwork" />
          <SettingRow label="Commission Rate" value="10%" />
          <SettingRow label="Minimum Project Budget" value="$50" />
          <SettingRow label="Auto-approve Verification" value="Disabled" />
          <SettingRow label="Maintenance Mode" value="Off" />
        </div>
      </div>
      <div className="surface-card p-6">
        <h2 className="font-display text-xl font-semibold mb-4">Email Templates</h2>
        <p className="text-muted-foreground">Email template management coming soon...</p>
      </div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-medium">{value}</span>
        <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"><Edit className="size-4" /></button>
      </div>
    </div>
  );
}