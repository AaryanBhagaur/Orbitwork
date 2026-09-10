import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { categories } from "@/lib/data";

const steps = [
  { key: "title", label: "Title", icon: 1 },
  { key: "category", label: "Category", icon: 2 },
  { key: "description", label: "Description", icon: 3 },
  { key: "skills", label: "Skills", icon: 4 },
  { key: "budget", label: "Budget", icon: 5 },
  { key: "deadline", label: "Deadline", icon: 6 },
  { key: "experience", label: "Experience", icon: 7 },
  { key: "attachments", label: "Attachments", icon: 8 },
  { key: "review", label: "Review", icon: 9 },
] as const;

type StepKey = (typeof steps)[number]["key"];

const initialData = {
  title: "",
  category: "",
  description: "",
  skills: [] as string[],
  budgetType: "fixed" as "fixed" | "hourly",
  budgetMin: "",
  budgetMax: "",
  hourlyRate: "",
  deadline: "",
  experience: "Any" as "Beginner" | "Intermediate" | "Expert" | "Any",
  attachments: [] as File[],
};

export const Route = createFileRoute("/post-project")({
  head: () => ({
    meta: [
      { title: "Post a Project — Hire freelancers | Orbitwork" },
      {
        name: "description",
        content: "Post your project in minutes. Define scope, budget, and timeline to attract the right freelancers.",
      },
      { property: "og:title", content: "Post a Project on Orbitwork" },
    ],
  }),
  component: PostProject,
});

function PostProject() {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<Partial<Record<StepKey, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentStep = steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const validateStep = (key: StepKey, value: typeof data): string | null => {
    switch (key) {
      case "title":
        return value.title.trim().length < 10 ? "Title must be at least 10 characters" : null;
      case "category":
        return value.category ? null : "Please select a category";
      case "description":
        return value.description.trim().length < 50 ? "Description must be at least 50 characters" : null;
      case "skills":
        return value.skills.length === 0 ? "Add at least one skill" : null;
      case "budget":
        if (value.budgetType === "fixed") {
          return value.budgetMin && value.budgetMax ? null : "Enter your budget range";
        }
        return value.hourlyRate ? null : "Enter an hourly rate";
      case "deadline":
        return value.deadline ? null : "Select a deadline";
      case "experience":
        return null;
      case "attachments":
        return null;
      case "review":
        return null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    const error = validateStep(currentStep.key, data);
    if (error) {
      setErrors((e) => ({ ...e, [currentStep.key]: error }));
      return;
    }
    setErrors((e) => ({ ...e, [currentStep.key]: undefined }));
    if (stepIndex < steps.length - 1) setStepIndex((i) => i + 1);
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateStep(currentStep.key, data);
    if (error) {
      setErrors((e) => ({ ...e, [currentStep.key]: error }));
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const updateField = <K extends keyof typeof data>(key: K, value: typeof data[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const addSkill = (skill: string) => {
    if (skill && !data.skills.includes(skill)) updateField("skills", [...data.skills, skill]);
  };

  const removeSkill = (skill: string) => {
    updateField("skills", data.skills.filter((s) => s !== skill));
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <div className="surface-card p-12">
          <div className="mx-auto size-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle className="size-8 text-emerald-500" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold">Project posted successfully</h1>
          <p className="mt-3 text-muted-foreground">
            Your project is now live. Freelancers matching your requirements will start sending
            proposals shortly.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/dashboard" className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-6 py-3 text-sm font-semibold text-white">
              Go to Dashboard
            </Link>
            <Link to="/post-project" className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-accent">
              Post Another
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.key} className="flex flex-col items-center flex-1">
              <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-full font-display font-bold text-sm transition-all ${
                  i < stepIndex
                    ? "bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-white"
                    : i === stepIndex
                    ? "bg-[var(--violet)] text-white ring-4 ring-[var(--violet)]/20"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < stepIndex ? <CheckCircle className="size-5" /> : s.icon}
              </div>
              <span className="mt-2 text-[10px] font-medium text-center text-muted-foreground max-w-[70px]">
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-[50%] h-1 w-full origin-left transition-all ${
                    i < stepIndex
                      ? "bg-gradient-to-r from-[var(--violet)] to-[var(--electric)]"
                      : "bg-border"
                  }`}
                  style={{ transform: `scaleX(${i < stepIndex ? 1 : 0})` }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="surface-card p-7 sm:p-9">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-muted-foreground">Step {stepIndex + 1} of {steps.length}</p>
            <h1 className="mt-1 font-display text-2xl font-bold">{currentStep.label}</h1>
          </div>
        </div>

        {currentStep.key === "title" && (
          <StepContent>
            <label className="block text-sm font-medium mb-3">Project Title</label>
            <input
              value={data.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="e.g., Build a modern restaurant website with reservations"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)]"
            />
            {errors.title && <p className="mt-2 text-sm text-destructive">{errors.title}</p>}
            <p className="mt-2 text-xs text-muted-foreground">Be specific — freelancers search by keywords in your title.</p>
          </StepContent>
        )}

        {currentStep.key === "category" && (
          <StepContent>
            <label className="block text-sm font-medium mb-3">Select a Category</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => updateField("category", c.name)}
                  className={`surface-card relative p-4 text-left transition-all ${
                    data.category === c.name
                      ? "border-[var(--violet)] ring-1 ring-[var(--violet)]/20"
                      : "border-border hover:border-[var(--violet)]/50"
                  }`}
                >
                  <h3 className="font-display font-semibold">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                  <p className="mt-2 text-xs text-[var(--electric)]">{c.count.toLocaleString()} freelancers · from ${c.from}/hr</p>
                </button>
              ))}
            </div>
            {errors.category && <p className="mt-2 text-sm text-destructive">{errors.category}</p>}
          </StepContent>
        )}

        {currentStep.key === "description" && (
          <StepContent>
            <label className="block text-sm font-medium mb-3">Project Description</label>
            <textarea
              value={data.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={8}
              placeholder="Describe your project in detail: goals, deliverables, tech stack, timeline expectations, and any specific requirements..."
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)] resize-none"
            />
            {errors.description && <p className="mt-2 text-sm text-destructive">{errors.description}</p>}
            <p className="mt-2 text-xs text-muted-foreground">The more detail you provide, the better proposals you'll receive.</p>
          </StepContent>
        )}

        {currentStep.key === "skills" && (
          <StepContent>
            <label className="block text-sm font-medium mb-3">Required Skills</label>
            <div className="flex gap-2 mb-4">
              <input
                ref={skillInputRef[1] as any}
                type="text"
                placeholder="Type a skill and press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    addSkill(e.currentTarget.value.trim());
                    e.currentTarget.value = "";
                  }
                }}
                className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)]"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--violet)]/10 px-3 py-1 text-sm text-[var(--violet)]">
                  {s}
                  <button type="button" onClick={() => removeSkill(s)} className="hover:text-destructive">
                    <XCircle className="size-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Node.js", "Python", "Figma", "UI/UX", "Tailwind CSS", "PostgreSQL", "AWS"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addSkill(s)}
                  disabled={data.skills.includes(s)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    data.skills.includes(s)
                      ? "border-[var(--violet)] bg-[var(--violet)]/10 text-[var(--violet)] cursor-default"
                      : "border-border text-muted-foreground hover:border-[var(--violet)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {errors.skills && <p className="mt-2 text-sm text-destructive">{errors.skills}</p>}
          </StepContent>
        )}

        {currentStep.key === "budget" && (
          <StepContent>
            <label className="block text-sm font-medium mb-3">Budget Type</label>
            <div className="grid gap-3 sm:grid-cols-2 mb-6">
              {[
                { value: "fixed", label: "Fixed Price", desc: "Set a total project budget" },
                { value: "hourly", label: "Hourly", desc: "Pay per hour with a weekly cap" },
              ].map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => updateField("budgetType", b.value as "fixed" | "hourly")}
                  className={`surface-card p-4 text-left transition-all ${
                    data.budgetType === b.value
                      ? "border-[var(--violet)] ring-1 ring-[var(--violet)]/20"
                      : "border-border hover:border-[var(--violet)]/50"
                  }`}
                >
                  <h3 className="font-display font-semibold">{b.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
                </button>
              ))}
            </div>

            {data.budgetType === "fixed" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Minimum Budget ($)</label>
                  <input
                    type="number"
                    value={data.budgetMin}
                    onChange={(e) => updateField("budgetMin", e.target.value)}
                    placeholder="500"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Maximum Budget ($)</label>
                  <input
                    type="number"
                    value={data.budgetMax}
                    onChange={(e) => updateField("budgetMax", e.target.value)}
                    placeholder="1500"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)]"
                  />
                </div>
              </div>
            )}

            {data.budgetType === "hourly" && (
              <div>
                <label className="block text-sm font-medium mb-2">Hourly Rate Range ($)</label>
                <input
                  type="text"
                  value={data.hourlyRate}
                  onChange={(e) => updateField("hourlyRate", e.target.value)}
                  placeholder="30–60"
                  className="w-full max-w-xs rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)]"
                />
                <p className="mt-2 text-xs text-muted-foreground">e.g., 30–60 per hour</p>
              </div>
            )}

            {errors.budget && <p className="mt-2 text-sm text-destructive">{errors.budget}</p>}
          </StepContent>
        )}

        {currentStep.key === "deadline" && (
          <StepContent>
            <label className="block text-sm font-medium mb-3">Project Deadline</label>
            <input
              type="date"
              value={data.deadline}
              onChange={(e) => updateField("deadline", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full max-w-xs rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)]"
            />
            {errors.deadline && <p className="mt-2 text-sm text-destructive">{errors.deadline}</p>}
            <p className="mt-2 text-xs text-muted-foreground">Freelancers will see this when deciding whether to apply.</p>
          </StepContent>
        )}

        {currentStep.key === "experience" && (
          <StepContent>
            <label className="block text-sm font-medium mb-3">Experience Level</label>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: "Any", label: "Any Level", desc: "Open to all experience levels" },
                { value: "Beginner", label: "Beginner", desc: "0–2 years, learning on the job" },
                { value: "Intermediate", label: "Intermediate", desc: "2–5 years, ships independently" },
                { value: "Expert", label: "Expert", desc: "5+ years, leads complex projects" },
              ].map((e) => (
                <button
                  key={e.value}
                  type="button"
                  onClick={() => updateField("experience", e.value as typeof data.experience)}
                  className={`surface-card p-4 text-left transition-all ${
                    data.experience === e.value
                      ? "border-[var(--violet)] ring-1 ring-[var(--violet)]/20"
                      : "border-border hover:border-[var(--violet)]/50"
                  }`}
                >
                  <h3 className="font-display font-semibold">{e.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
                </button>
              ))}
            </div>
          </StepContent>
        )}

        {currentStep.key === "attachments" && (
          <StepContent>
            <label className="block text-sm font-medium mb-3">Attachments (Optional)</label>
            <div
              className="border-2 border-dashed border-border rounded-2xl p-8 text-center transition-colors hover:border-[var(--violet)]/50"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files);
                updateField("attachments", [...data.attachments, ...files]);
              }}
            >
              <Loader2 className="mx-auto size-8 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">Drag & drop files here, or click to browse</p>
              <p className="mt-1 text-xs text-muted-foreground">PDF, DOC, TXT, PNG, JPG up to 10MB each</p>
              <input
                type="file"
                multiple
                onChange={(e) => e.target.files && updateField("attachments", [...data.attachments, ...Array.from(e.target.files)])}
                className="sr-only"
                id="attachments"
              />
              <label htmlFor="attachments" className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--violet)] cursor-pointer">
                Browse files
              </label>
            </div>
            {data.attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {data.attachments.map((f, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-background p-3 text-sm">
                    <span className="truncate max-w-[200px]">{f.name}</span>
                    <span className="text-muted-foreground">{(f.size / 1024).toFixed(1)} KB</span>
                  </div>
                ))}
              </div>
            )}
          </StepContent>
        )}

        {currentStep.key === "review" && (
          <StepContent>
            <div className="space-y-6">
              <ReviewRow label="Title" value={data.title} />
              <ReviewRow label="Category" value={data.category} />
              <ReviewRow label="Budget" value={data.budgetType === "fixed" ? `$${data.budgetMin}–$${data.budgetMax}` : `$${data.hourlyRate}/hr`} />
              <ReviewRow label="Deadline" value={data.deadline ? new Date(data.deadline).toLocaleDateString() : "Not set"} />
              <ReviewRow label="Experience" value={data.experience} />
              <ReviewRow label="Skills" value={data.skills.join(", ") || "None"} />
              <ReviewRow label="Attachments" value={`${data.attachments.length} file(s)`} />
            </div>
          </StepContent>
        )}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={isFirst}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-50"
          >
            <ArrowLeft className="size-4 mr-2" /> Back
          </button>
          {isLast ? (
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" /> Publishing…
                </>
              ) : (
                <>
                  Publish Project
                  <ArrowRight className="size-4 ml-2" />
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-6 py-2.5 text-sm font-semibold text-white"
            >
              Continue
              <ArrowRight className="size-4 ml-2" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepContent({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-3 border-b border-border">
      <span className="text-sm text-muted-foreground shrink-0 w-[120px]">{label}</span>
      <span className="text-sm font-medium text-foreground break-words">{value}</span>
    </div>
  );
}