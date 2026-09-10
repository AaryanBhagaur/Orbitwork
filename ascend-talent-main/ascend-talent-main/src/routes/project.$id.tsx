import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  MessageSquare,
  FileText,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  MoreVertical,
  Paperclip,
  Send,
  Smile,
  Mic,
  X,
  Download,
  Flag,
  Activity,
  Star,
  Edit,
} from "lucide-react";
import { useState, useMemo } from "react";
import { initials } from "@/lib/data";

export const Route = createFileRoute("/project/$id")({
  loader: ({ params }) => {
    const project = mockProjects.find(p => p.id === params.id);
    if (!project) throw new Error("Project not found");
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.project.title} — Project Workspace | Orbitwork` },
      { name: "description", content: `Manage ${loaderData.project.title} with ${loaderData.project.freelancer}` },
    ],
  }),
  component: ProjectWorkspace,
});

const projectTabs = [
  { key: "overview", label: "Overview", icon: Briefcase },
  { key: "milestones", label: "Milestones", icon: Flag },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "files", label: "Files", icon: FileText },
  { key: "tasks", label: "Tasks", icon: CheckCircle },
  { key: "timeline", label: "Timeline", icon: Activity },
  { key: "payments", label: "Payments", icon: DollarSign },
] as const;

const statusSteps = ["Brief", "In Progress", "Review", "Revision", "Completed"];

const mockProjects = [
  {
    id: "ecommerce-redesign",
    title: "E-Commerce Experience Redesign",
    client: "Nova Retail",
    freelancer: "Aarav Sharma",
    freelancerAvatar: "AS",
    freelancerRole: "Full Stack Developer",
    status: "in-progress",
    progress: 65,
    currentStep: 1, // In Progress
    budget: 2800,
    spent: 1820,
    startDate: "2024-01-15",
    deadline: "2024-02-20",
    description: "Complete redesign of the e-commerce platform including new checkout flow, product pages, and user dashboard.",
    skills: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    milestones: [
      { id: "1", title: "Discovery & Research", amount: 400, status: "completed", dueDate: "2024-01-22", completedDate: "2024-01-20" },
      { id: "2", title: "UI/UX Design System", amount: 600, status: "completed", dueDate: "2024-01-29", completedDate: "2024-01-28" },
      { id: "3", title: "Frontend Development", amount: 1000, status: "in-progress", dueDate: "2024-02-10" },
      { id: "4", title: "Backend Integration", amount: 500, status: "pending", dueDate: "2024-02-17" },
      { id: "5", title: "Testing & Launch", amount: 300, status: "pending", dueDate: "2024-02-20" },
    ],
    messages: [
      { id: "1", sender: "client", name: "Nova Retail", avatar: "NR", text: "Hi Aarav, excited to start this project! I've attached the current site analytics and brand guidelines.", time: "2024-01-15 09:30", attachments: ["analytics.pdf", "brand-guidelines.pdf"] },
      { id: "2", sender: "freelancer", name: "Aarav Sharma", avatar: "AS", text: "Thanks for the materials! I'll review them today and send over the discovery questions by EOD.", time: "2024-01-15 10:15" },
      { id: "3", sender: "client", name: "Nova Retail", avatar: "NR", text: "Perfect. Also, the team wants to prioritize mobile checkout — 68% of our traffic is mobile.", time: "2024-01-15 11:00" },
      { id: "4", sender: "freelancer", name: "Aarav Sharma", avatar: "AS", text: "Noted. I'll make mobile-first checkout the priority in the design phase. Starting the user research now.", time: "2024-01-15 11:30", attachments: ["discovery-questions.docx"] },
      { id: "5", sender: "system", name: "System", avatar: "S", text: "Milestone 1 completed: Discovery & Research. $400 released.", time: "2024-01-20 16:00", system: true },
      { id: "6", sender: "freelancer", name: "Aarav Sharma", avatar: "AS", text: "Design system is ready for review. I've created a Figma file with all components, color tokens, and responsive breakpoints.", time: "2024-01-28 14:20", attachments: ["design-system.fig"] },
      { id: "7", sender: "client", name: "Nova Retail", avatar: "NR", text: "Looks fantastic! The component library is very thorough. One small tweak — can we make the primary button slightly more prominent?", time: "2024-01-29 09:45" },
      { id: "8", sender: "freelancer", name: "Aarav Sharma", avatar: "AS", text: "Done! Updated the Figma file. Moving into frontend development now.", time: "2024-01-29 10:30" },
      { id: "9", sender: "system", name: "System", avatar: "S", text: "Milestone 2 completed: UI/UX Design System. $600 released.", time: "2024-01-29 11:00", system: true },
    ],
    files: [
      { id: "1", name: "analytics.pdf", type: "pdf", size: "2.4 MB", uploadedBy: "Nova Retail", date: "2024-01-15", milestone: "Discovery" },
      { id: "2", name: "brand-guidelines.pdf", type: "pdf", size: "5.1 MB", uploadedBy: "Nova Retail", date: "2024-01-15", milestone: "Discovery" },
      { id: "3", name: "discovery-questions.docx", type: "docx", size: "120 KB", uploadedBy: "Aarav Sharma", date: "2024-01-15", milestone: "Discovery" },
      { id: "4", name: "design-system.fig", type: "fig", size: "3.2 MB", uploadedBy: "Aarav Sharma", date: "2024-01-28", milestone: "Design" },
      { id: "5", name: "checkout-flow-v1.mp4", type: "video", size: "15.6 MB", uploadedBy: "Aarav Sharma", date: "2024-02-05", milestone: "Development" },
    ],
    tasks: [
      { id: "1", title: "Set up Next.js project with TypeScript", assignee: "Aarav Sharma", status: "done", milestone: "Development", dueDate: "2024-02-01" },
      { id: "2", title: "Implement design system components", assignee: "Aarav Sharma", status: "done", milestone: "Development", dueDate: "2024-02-03" },
      { id: "3", title: "Build product listing page", assignee: "Aarav Sharma", status: "done", milestone: "Development", dueDate: "2024-02-05" },
      { id: "4", title: "Build product detail page", assignee: "Aarav Sharma", status: "in-progress", milestone: "Development", dueDate: "2024-02-08" },
      { id: "5", title: "Build shopping cart & checkout", assignee: "Aarav Sharma", status: "todo", milestone: "Development", dueDate: "2024-02-12" },
      { id: "6", title: "Integrate payment gateway", assignee: "Aarav Sharma", status: "todo", milestone: "Backend", dueDate: "2024-02-15" },
      { id: "7", title: "User dashboard & order history", assignee: "Aarav Sharma", status: "todo", milestone: "Backend", dueDate: "2024-02-17" },
      { id: "8", title: "E2E testing & bug fixes", assignee: "Aarav Sharma", status: "todo", milestone: "Testing", dueDate: "2024-02-19" },
      { id: "9", title: "Deploy to production", assignee: "Aarav Sharma", status: "todo", milestone: "Testing", dueDate: "2024-02-20" },
    ],
    payments: [
      { id: "1", milestone: "Discovery & Research", amount: 400, status: "paid", date: "2024-01-20", transactionId: "txn_abc123" },
      { id: "2", milestone: "UI/UX Design System", amount: 600, status: "paid", date: "2024-01-29", transactionId: "txn_def456" },
      { id: "3", milestone: "Frontend Development", amount: 1000, status: "pending", date: "2024-02-10" },
      { id: "4", milestone: "Backend Integration", amount: 500, status: "pending", date: "2024-02-17" },
      { id: "5", milestone: "Testing & Launch", amount: 300, status: "pending", date: "2024-02-20" },
    ],
    timeline: [
      { date: "2024-01-15", title: "Project Started", description: "Contract signed, project initiated", type: "start" },
      { date: "2024-01-15", title: "Files Shared", description: "Client shared analytics and brand guidelines", type: "file" },
      { date: "2024-01-20", title: "Milestone 1 Completed", description: "Discovery & Research delivered, $400 released", type: "milestone" },
      { date: "2024-01-28", title: "Design System Delivered", description: "Figma file with full component library shared", type: "delivery" },
      { date: "2024-01-29", title: "Milestone 2 Completed", description: "UI/UX Design System approved, $600 released", type: "milestone" },
      { date: "2024-02-05", title: "Checkout Flow Demo", description: "Video walkthrough of v1 checkout flow shared", type: "delivery" },
      { date: "2024-02-08", title: "Product Detail Page", description: "In progress — expected completion today", type: "progress" },
    ],
  },
];

function ProjectWorkspace() {
  const { project } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof projectTabs)[number]["key"]>("overview");
  const [newMessage, setNewMessage] = useState("");
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<typeof project.milestones[0] | null>(null);

  const isClient = true; // Demo: viewing as client

  return (
    <div className="relative min-h-screen">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 glass border-b border-border px-5 py-3">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowRight className="size-4 rotate-180" /> Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              {project.title}
            </span>
            <div className="flex items-center gap-1">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                project.status === "completed" ? "bg-emerald-500/10 text-emerald-500" :
                project.status === "review" ? "bg-amber-500/10 text-amber-500" :
                "bg-[var(--violet)]/10 text-[var(--violet)]"
              }`}>
                {statusSteps[project.currentStep]}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-5 py-6">
        {/* Project Header */}
        <div className="surface-card relative overflow-hidden p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  project.status === "completed" ? "bg-emerald-500/10 text-emerald-500" :
                  project.status === "review" ? "bg-amber-500/10 text-amber-500" :
                  "bg-[var(--violet)]/10 text-[var(--violet)]"
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace("-", " ")}
                </span>
              </div>
              <h1 className="font-display text-2xl font-bold truncate">{project.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{project.client} · {project.freelancer} ({project.freelancerRole})</p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-4 shrink-0">
              <div className="text-right">
                <p className="font-display text-2xl font-bold">${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Spent / Budget</p>
              </div>
              <div className="w-48">
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] transition-all" style={{ width: `${project.progress}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground text-right">{project.progress}% complete</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-6 flex items-center justify-between">
            {statusSteps.map((step, i) => (
              <div key={step} className="flex flex-col items-center relative">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-display font-bold text-sm transition-all z-10 ${
                    i < project.currentStep ? "bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-white" :
                    i === project.currentStep ? "bg-[var(--violet)] text-white ring-4 ring-[var(--violet)]/20" :
                    "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < project.currentStep ? <CheckCircle className="size-5" /> : i + 1}
                </div>
                <span className="mt-1.5 text-[10px] font-medium text-center max-w-[70px] text-muted-foreground">{step}</span>
                {i < statusSteps.length - 1 && (
                  <div
                    className={`absolute top-5 left-[50%] h-1 w-full origin-left transition-all ${
                      i < project.currentStep ? "bg-gradient-to-r from-[var(--violet)] to-[var(--electric)]" : "bg-border"
                    }`}
                    style={{ transform: `scaleX(${i < project.currentStep ? 1 : 0})` }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="surface-card rounded-2xl p-1 mb-6">
          <div className="flex flex-wrap gap-1" role="tablist">
            {projectTabs.map((t) => (
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
          {tab === "overview" && <OverviewTab project={project} />}
          {tab === "milestones" && <MilestonesTab project={project} onEdit={setEditingMilestone} onAdd={() => setShowMilestoneModal(true)} />}
          {tab === "messages" && <MessagesTab project={project} newMessage={newMessage} setNewMessage={setNewMessage} />}
          {tab === "files" && <FilesTab project={project} />}
          {tab === "tasks" && <TasksTab project={project} />}
          {tab === "timeline" && <TimelineTab project={project} />}
          {tab === "payments" && <PaymentsTab project={project} />}
        </div>
      </div>

      {/* Milestone Modal */}
      {(editingMilestone || showMilestoneModal) && (
        <MilestoneModal
          milestone={editingMilestone}
          project={project}
          onClose={() => { setEditingMilestone(null); setShowMilestoneModal(false); }}
        />
      )}
    </div>
  );
}

function OverviewTab({ project }: { project: typeof mockProjects[0] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <div className="surface-card p-6">
          <h2 className="font-display text-xl font-semibold">Project Description</h2>
          <p className="mt-4 text-muted-foreground">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.skills.map((s) => (
              <span key={s} className="rounded-full border border-border bg-muted/60 px-3 py-1 text-sm text-muted-foreground">{s}</span>
            ))}
          </div>
        </div>

        <div className="surface-card p-6">
          <h2 className="font-display text-xl font-semibold">Key Dates</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <DateCard label="Start Date" value={new Date(project.startDate).toLocaleDateString()} icon={<Clock className="size-4" />} />
            <DateCard label="Deadline" value={new Date(project.deadline).toLocaleDateString()} icon={<Flag className="size-4" />} />
            <DateCard label="Current Milestone" value={project.milestones.find(m => m.status === "in-progress")?.title || "—"} icon={<Flag className="size-4" />} />
            <DateCard label="Next Milestone Due" value={project.milestones.find(m => m.status === "pending")?.dueDate ? new Date(project.milestones.find(m => m.status === "pending")!.dueDate).toLocaleDateString() : "—"} icon={<Clock className="size-4" />} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="surface-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Team</h2>
          </div>
          <div className="mt-4 space-y-3">
            <TeamMember name={project.client} role="Client" avatar={project.client.split(" ").map(w => w[0]).join("")} isClient />
            <TeamMember name={project.freelancer} role={project.freelancerRole} avatar={project.freelancerAvatar} />
          </div>
        </div>

        <div className="surface-card p-6">
          <h2 className="font-display text-xl font-semibold">Quick Actions</h2>
          <div className="mt-4 grid gap-2">
            <button className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent transition-colors text-left">
              <MessageSquare className="size-5 text-[var(--violet)]" />
              <div><p className="font-medium">Send Message</p><p className="text-xs text-muted-foreground">Contact team</p></div>
            </button>
            <button className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent transition-colors text-left">
              <FileText className="size-5 text-[var(--electric)]" />
              <div><p className="font-medium">Upload File</p><p className="text-xs text-muted-foreground">Share deliverables</p></div>
            </button>
            <button className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent transition-colors text-left">
              <DollarSign className="size-5 text-emerald-500" />
              <div><p className="font-medium">Release Payment</p><p className="text-xs text-muted-foreground">Pay for completed milestone</p></div>
            </button>
            {project.currentStep === 3 && (
              <button className="flex items-center gap-3 rounded-xl border border-destructive text-destructive p-3 hover:bg-destructive/10 transition-colors text-left">
                <Star className="size-5" />
                <div><p className="font-medium">Leave Review</p><p className="text-xs text-muted-foreground">Rate the freelancer</p></div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DateCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-1 font-display font-semibold">{value}</p>
    </div>
  );
}

function TeamMember({ name, role, avatar, isClient }: { name: string; role: string; avatar: string; isClient?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent/50 transition-colors">
      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-xs font-bold text-white">{avatar}</span>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{role}{isClient ? " (You)" : ""}</p>
      </div>
    </div>
  );
}

function MilestonesTab({ project, onEdit, onAdd }: { project: typeof mockProjects[0]; onEdit: (m: typeof project.milestones[0]) => void; onAdd: () => void }) {
  return (
    <div className="space-y-4">
      {project.milestones.map((m) => (
        <div key={m.id} className="surface-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className={`shrink-0 flex h-12 w-12 items-center justify-center rounded-xl ${
                m.status === "completed" ? "bg-emerald-500/10" :
                m.status === "in-progress" ? "bg-[var(--violet)]/10" :
                "bg-muted/50"
              }`}>
                {m.status === "completed" ? (
                  <CheckCircle className="size-6 text-emerald-500" />
                ) : m.status === "in-progress" ? (
                  <Clock className="size-6 text-[var(--violet)]" />
                ) : (
                  <Flag className="size-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <h3 className="font-display font-semibold">{m.title}</h3>
                <p className="text-sm text-muted-foreground">Due: {new Date(m.dueDate).toLocaleDateString()}{m.completedDate ? ` · Completed: ${new Date(m.completedDate).toLocaleDateString()}` : ""}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <p className="font-display font-bold">${m.amount.toLocaleString()}</p>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                  m.status === "completed" ? "bg-emerald-500/10 text-emerald-500" :
                  m.status === "in-progress" ? "bg-[var(--violet)]/10 text-[var(--violet)]" :
                  "bg-muted/50 text-muted-foreground"
                }`}>
                  {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                </span>
              </div>
              <button onClick={() => onEdit(m)} className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground">
                <Edit className="size-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button onClick={onAdd} className="w-full rounded-xl border-2 border-dashed border-border p-6 text-center text-muted-foreground hover:border-[var(--violet)]/50 hover:text-foreground transition-colors">
        <Plus className="size-6 mx-auto mb-2" />
        <span>Add Milestone</span>
      </button>
    </div>
  );
}

function MessagesTab({ project, newMessage, setNewMessage }: { project: typeof mockProjects[0]; newMessage: string; setNewMessage: (v: string) => void }) {
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  return (
    <div className="surface-card flex flex-col h-[calc(100vh-300px)] min-h-[500px]">
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {project.messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isOwn={msg.sender === "freelancer"} onEdit={setEditingMessage} />
        ))}
        <div id="messages-end" />
      </div>
      <div className="border-t border-border p-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              rows={1}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)] resize-none pr-12"
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-1">
              <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent"><Paperclip className="size-4" /></button>
              <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent"><Smile className="size-4" /></button>
              <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent"><Mic className="size-4" /></button>
            </div>
          </div>
          <button onClick={sendMessage} disabled={!newMessage.trim()} className="grid size-10 place-items-center rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] text-white disabled:opacity-50 shrink-0">
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );

  function sendMessage() {
    if (!newMessage.trim()) return;
    // In real app: send via WebSocket/API
    setNewMessage("");
  }
}

function MessageBubble({ message, isOwn, onEdit }: { message: typeof mockProjects[0].messages[0]; isOwn: boolean; onEdit: (id: string) => void }) {
  if (message.system) {
    return (
      <div className="flex justify-center">
        <span className="px-3 py-1.5 text-xs text-muted-foreground bg-muted rounded-full">{message.text}</span>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}>
      <span className={`shrink-0 grid size-8 place-items-center rounded-full ${isOwn ? "bg-gradient-to-br from-[var(--violet)] to-[var(--electric)]" : "bg-muted"} text-white font-medium text-xs`}>
        {message.avatar}
      </span>
      <div className={`flex-1 max-w-[70%] ${isOwn ? "text-right" : ""}`}>
        <div className={`inline-flex flex-col ${isOwn ? "items-end" : "items-start"} gap-1`}>
          <div className="flex items-center gap-2">
            {!isOwn && <span className="text-xs font-medium text-muted-foreground">{message.name}</span>}
            <span className="text-[10px] text-muted-foreground">{message.time}</span>
          </div>
          <div className={`rounded-2xl p-3 ${isOwn ? "bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-white" : "bg-muted text-foreground"}`}>
            <p className="text-sm">{message.text}</p>
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {message.attachments.map((a) => (
                  <span key={a} className={`rounded-full px-2 py-1 text-[10px] ${isOwn ? "bg-white/20 text-white" : "bg-background text-muted-foreground"}`}>
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilesTab({ project }: { project: typeof mockProjects[0] }) {
  const fileIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    pdf: FileText,
    docx: FileText,
    fig: FileText,
    video: FileText,
  };

  return (
    <div className="surface-card overflow-hidden">
      <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display font-semibold">Project Files</h2>
        <button className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">
          <Paperclip className="size-4 mr-2" /> Upload File
        </button>
      </div>
      <div className="divide-y divide-border/50">
        {project.files.map((f) => (
          <div key={f.id} className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors">
            <div className="grid size-12 place-items-center rounded-xl bg-[var(--violet)]/10">
              <fileIcons[f.type] || FileText className="size-5 text-[var(--violet)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{f.name}</p>
              <p className="text-xs text-muted-foreground">{f.uploadedBy} · {new Date(f.date).toLocaleDateString()} · {f.size} · {f.milestone}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"><Download className="size-4" /></button>
              <button className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"><MoreVertical className="size-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TasksTab({ project }: { project: typeof mockProjects[0] }) {
  const statusColors = {
    todo: "bg-muted text-muted-foreground",
    "in-progress": "bg-[var(--violet)]/10 text-[var(--violet)]",
    done: "bg-emerald-500/10 text-emerald-500",
  } as const;

  const grouped = useMemo(() => {
    const groups: Record<string, typeof project.tasks> = {};
    project.tasks.forEach(t => {
      if (!groups[t.milestone]) groups[t.milestone] = [];
      groups[t.milestone].push(t);
    });
    return groups;
  }, [project.tasks]);

  return (
    <div className="surface-card p-4">
      {Object.entries(grouped).map(([milestone, tasks]) => (
        <div key={milestone} className="mb-6 last:mb-0">
          <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
            <Flag className="size-4 text-[var(--violet)]" />
            {milestone} ({tasks.filter(t => t.status === "done").length}/{tasks.length})
          </h3>
          <div className="space-y-2">
            {tasks.map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-accent/50 transition-colors">
                <input
                  type="checkbox"
                  checked={t.status === "done"}
                  onChange={() => {}}
                  className="size-4 accent-[var(--violet)]"
                />
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${t.status === "done" ? "line-through text-muted-foreground" : ""}`}>{t.title}</p>
                  <p className="text-xs text-muted-foreground">Assigned to {t.assignee} · Due {new Date(t.dueDate).toLocaleDateString()}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusColors[t.status]}`}>
                  {t.status.replace("-", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineTab({ project }: { project: typeof mockProjects[0] }) {
  const icons = {
    start: Briefcase,
    file: FileText,
    milestone: Flag,
    delivery: FileText,
    progress: Activity,
  };

  return (
    <div className="surface-card p-4">
      <ol className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
        {project.timeline.map((event, i) => (
          <li key={event.date} className="relative pl-14 pb-8 last:pb-0">
            <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-border z-10">
              <icons[event.type] className="size-4 text-[var(--violet)]" />
            </div>
            <div className="surface-card p-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-display font-semibold">{event.title}</h3>
                <span className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PaymentsTab({ project }: { project: typeof mockProjects[0] }) {
  return (
    <div className="space-y-4">
      <div className="surface-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Payment Summary</h2>
          <div className="text-right">
            <p className="font-display text-2xl font-bold text-emerald-500">${project.spent.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Paid of ${project.budget.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${(project.spent / project.budget) * 100}%` }} />
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <th className="p-4">Milestone</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Transaction</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {project.payments.map((p) => (
              <tr key={p.id}>
                <td className="p-4 font-medium">{p.milestone}</td>
                <td className="p-4 font-semibold">${p.amount.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                    p.status === "paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                  }`}>
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">{p.date ? new Date(p.date).toLocaleDateString() : "—"}</td>
                <td className="p-4 text-muted-foreground font-mono text-xs">{p.transactionId || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MilestoneModal({ milestone, project, onClose }: { milestone: typeof project.milestones[0] | null; project: typeof mockProjects[0]; onClose: () => void }) {
  const isEditing = !!milestone;
  const [form, setForm] = useState({
    title: milestone?.title || "",
    amount: milestone?.amount || "",
    dueDate: milestone?.dueDate || "",
    description: milestone?.description || "",
  });

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="surface-card w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold">{isEditing ? "Edit Milestone" : "Add Milestone"}</h2>
          <button onClick={onClose} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent"><X className="size-4" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)]" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Amount ($)</label>
              <input type="number" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)]" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input type="date" value={form.dueDate} onChange={(e) => setForm({...form, dueDate: e.target.value})} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)]" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)]" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-full border border-border px-5 py-2.5 text-sm">Cancel</button>
            <button type="submit" className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-5 py-2.5 text-sm font-semibold text-white">{isEditing ? "Save" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}