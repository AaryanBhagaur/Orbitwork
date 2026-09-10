import { Link } from "@tanstack/react-router";
import { Menu, X, Briefcase, Users, Trophy, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { to: "/freelancers", label: "Find Talent" },
  { to: "/projects", label: "Find Work" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/categories", label: "Categories" },
  { to: "/how-it-works", label: "How It Works" },
] as const;

const bottomNavItems = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/freelancers", label: "Talent", icon: Users },
  { to: "/projects", label: "Work", icon: Briefcase },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pathname, setPathname] = useState(typeof window !== "undefined" ? window.location.pathname : "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onRouteChange = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onRouteChange);
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      onRouteChange();
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      onRouteChange();
    };

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onRouteChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  const isDashboard = pathname.startsWith("/dashboard") ||
                      pathname.startsWith("/freelancer-dashboard") ||
                      pathname.startsWith("/project/") ||
                      pathname.startsWith("/messages/");

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-[0_10px_40px_-24px_rgba(0,0,0,0.5)]" : "border-b border-transparent"
        } lg:hidden`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="relative grid size-7 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)]">
              <span className="size-2 rounded-full bg-background" />
            </span>
            <span className="font-display text-base font-bold tracking-tight">Orbitwork</span>
          </Link>
          <div className="flex-1" />
          <Link
            to="/freelancers"
            aria-label="Search"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Search className="size-4" />
          </Link>
          <ThemeToggle />
          <button
            className="grid size-9 place-items-center rounded-full border border-border"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </nav>

        {open && (
          <div className="glass border-t border-border px-4 pb-4">
            <div className="flex flex-col py-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 px-3 pt-2">
                <Link
                  to="/signin"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-border py-2 text-sm text-center text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  Sign In
                </Link>
                <Link
                  to="/post-project"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] py-2 text-sm font-semibold text-white text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Desktop Navbar */}
      <header className={`hidden lg:sticky lg:top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-[0_10px_40px_-24px_rgba(0,0,0,0.5)]" : "border-b border-transparent"}`}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="relative grid size-8 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)]">
              <span className="size-2.5 rounded-full bg-background" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">Orbitwork</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "text-foreground bg-accent/60" }}
                className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-1 md:flex">
              <Link
                to="/freelancers"
                aria-label="Search"
                className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Search className="size-4" />
              </Link>
              <Link
                to="/dashboard"
                aria-label="Messages"
                className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <MessageSquare className="size-4" />
              </Link>
              <Link
                to="/notifications"
                aria-label="Notifications"
                className="relative grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[var(--violet)]" />
              </Link>
              <ThemeToggle />
            </div>
            <Link
              to="/signin"
              className="hidden rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              Sign In
            </Link>
            <Link
              to="/post-project"
              className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_var(--violet)] transition-transform hover:scale-[1.03]"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border pb-safe">
        <div className="mx-auto max-w-screen-xl px-2">
          <div className="grid grid-cols-5 gap-1">
            {bottomNavItems.map((item) => {
              const isActive = pathname === item.to ||
                              (item.to === "/dashboard" && isDashboard) ||
                              (item.to === "/" && pathname === "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-gradient-to-t from-[var(--violet)]/10 to-transparent text-[var(--violet)]"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}