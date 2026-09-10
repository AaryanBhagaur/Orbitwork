import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";

const cols = [
  {
    title: "Platform",
    items: [
      { label: "Find Talent", to: "/freelancers" },
      { label: "Find Work", to: "/projects" },
      { label: "Leaderboard", to: "/leaderboard" },
      { label: "Post a Project", to: "/post-project" },
      { label: "Categories", to: "/categories" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/how-it-works" },
      { label: "Careers", to: "/how-it-works" },
      { label: "Contact", to: "/how-it-works" },
      { label: "Blog", to: "/how-it-works" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Help Center", to: "/how-it-works" },
      { label: "Guides", to: "/how-it-works" },
      { label: "Community", to: "/how-it-works" },
      { label: "Success Stories", to: "/how-it-works" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Terms", to: "/how-it-works" },
      { label: "Privacy", to: "/how-it-works" },
      { label: "Safety", to: "/how-it-works" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)]">
                <span className="size-2.5 rounded-full bg-background" />
              </span>
              <span className="font-display text-lg font-bold">Orbitwork</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A reputation-first marketplace where independent professionals and ambitious teams
              find each other on merit.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-border bg-background p-1.5"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] text-white">
                <ArrowRight className="size-4" />
              </button>
            </form>
            <div className="mt-6 flex gap-2">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <span
                  key={i}
                  className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground"
                >
                  <Icon className="size-4" />
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {c.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {c.items.map((i) => (
                    <li key={i.label}>
                      <Link to={i.to} className="text-sm text-foreground/80 hover:text-foreground">
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Orbitwork. A demonstration marketplace.</p>
          <p>Profiles, projects and reviews shown here are illustrative samples.</p>
        </div>
      </div>
    </footer>
  );
}
