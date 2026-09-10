import { Stars } from "./stars";

const floaters = [
  { name: "Sarah", role: "UI/UX Designer", rate: 35, rating: 5, pos: "left-0 top-8", delay: "0s" },
  { name: "Alex", role: "Full Stack Dev", rate: 48, rating: 5, pos: "right-0 top-28", delay: "1.4s" },
  { name: "Mina", role: "Motion Designer", rate: 30, rating: 5, pos: "left-6 bottom-10", delay: "2.6s" },
];

export function HeroOrb() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* glow */}
      <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--violet),transparent_60%)] opacity-40 blur-3xl" />

      {/* orbit rings */}
      <div className="absolute inset-10 animate-spin-slow rounded-full border border-border/70" style={{ transform: "rotateX(72deg)" }} />
      <div
        className="absolute inset-4 animate-spin-slow rounded-full border border-[var(--electric)]/25"
        style={{ transform: "rotateX(72deg) rotateZ(45deg)", animationDuration: "56s" }}
      />

      {/* globe */}
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_32%_26%,oklch(0.55_0.2_290),oklch(0.22_0.06_270)_58%,oklch(0.14_0.02_268))] shadow-[inset_-18px_-24px_60px_rgba(0,0,0,0.6),0_40px_80px_-40px_var(--violet)]">
        <div className="absolute inset-0 overflow-hidden rounded-full opacity-60">
          <div className="animate-spin-slow absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="absolute inset-0 rounded-full border border-[var(--electric)]/30"
                style={{ transform: `rotateY(${i * 30}deg) scaleX(${Math.cos((i * 30 * Math.PI) / 180)})` }}
              />
            ))}
          </div>
          {[22, 44, 66].map((t) => (
            <span
              key={t}
              className="absolute left-0 right-0 rounded-full border-t border-[var(--electric)]/20"
              style={{ top: `${t}%` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.35),transparent_45%)]" />
      </div>

      {/* floating freelancer cards */}
      {floaters.map((f) => (
        <div
          key={f.name}
          className={`animate-float absolute ${f.pos} glass w-[190px] rounded-2xl p-3 shadow-xl`}
          style={{ animationDelay: f.delay }}
        >
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-xs font-bold text-white">
              {f.name[0]}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{f.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">{f.role}</p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <Stars rating={f.rating} size={11} />
            <span className="text-xs font-semibold">${f.rate}/hr</span>
          </div>
        </div>
      ))}

      {/* small chips */}
      <div className="animate-float absolute right-6 bottom-16 glass rounded-2xl px-3.5 py-2 text-xs font-medium" style={{ animationDelay: "0.8s" }}>
        <span className="text-gradient font-semibold">128</span> projects live now
      </div>
      <div className="animate-float absolute left-1/2 top-0 -translate-x-1/2 glass rounded-full px-3.5 py-1.5 text-xs" style={{ animationDelay: "2s" }}>
        4.8 ★ average rating
      </div>
    </div>
  );
}
