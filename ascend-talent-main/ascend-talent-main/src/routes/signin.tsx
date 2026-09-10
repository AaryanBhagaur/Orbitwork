import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign In | Orbitwork" },
      { name: "description", content: "Sign in to your Orbitwork account" },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<"client" | "freelancer">("client");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    // In real app: redirect based on role
    window.location.href = role === "client" ? "/dashboard" : "/freelancer-dashboard";
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)]">
              <span className="size-3 rounded-full bg-background" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">Orbitwork</span>
          </Link>
        </div>

        <div className="surface-card p-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold">{isSignUp ? "Create your account" : "Welcome back"}</h1>
            <p className="mt-2 text-muted-foreground">
              {isSignUp ? "Join thousands of professionals on Orbitwork" : "Sign in to continue to your dashboard"}
            </p>
          </div>

          {/* Role Toggle (Sign Up only) */}
          {isSignUp && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">I want to:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRole("client")}
                  className={`rounded-xl border p-4 transition-all ${
                    role === "client"
                      ? "border-[var(--violet)] bg-[var(--violet)]/5 ring-1 ring-[var(--violet)]/20"
                      : "border-border hover:border-[var(--violet)]/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="grid size-8 place-items-center rounded-lg bg-[var(--violet)]/10">
                      <svg className="size-4 text-[var(--violet)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <path d="M3 16h18" />
                        <path d="M3 16v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8" />
                      </svg>
                    </div>
                    <span className="font-medium">Hire Talent</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Post projects, find freelancers</p>
                </button>
                <button
                  onClick={() => setRole("freelancer")}
                  className={`rounded-xl border p-4 transition-all ${
                    role === "freelancer"
                      ? "border-[var(--electric)] bg-[var(--electric)]/5 ring-1 ring-[var(--electric)]/20"
                      : "border-border hover:border-[var(--electric)]/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="grid size-8 place-items-center rounded-lg bg-[var(--electric)]/10">
                      <svg className="size-4 text-[var(--electric)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <span className="font-medium">Freelance</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Find work, build reputation</p>
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)]"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-border bg-background px-10 py-3 text-sm outline-none focus:border-[var(--violet)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-border bg-background px-10 py-3 text-sm outline-none focus:border-[var(--violet)] pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                <AlertCircle className="size-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] py-3 text-sm font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : null}
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={switchMode} className="text-[var(--electric)] font-medium hover:underline">
              {isSignUp ? "Sign In" : "Create Account"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-xs text-muted-foreground mb-4">Or continue with</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-border py-2.5 text-sm hover:bg-accent transition-colors flex items-center justify-center gap-2">
                <svg className="size-4" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                GitHub
              </button>
              <button className="rounded-xl border border-border py-2.5 text-sm hover:bg-accent transition-colors flex items-center justify-center gap-2">
                <svg className="size-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our <Link to="/terms" className="text-[var(--electric)] hover:underline">Terms</Link> and <Link to="/privacy" className="text-[var(--electric)] hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}