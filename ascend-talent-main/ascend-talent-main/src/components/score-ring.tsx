import { useEffect, useRef, useState } from "react";

export function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const [p, setP] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) {
        setP(score);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [score]);

  return (
    <div ref={ref} className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`sg-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--violet)" />
            <stop offset="100%" stopColor="var(--electric)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth="7" className="stroke-border" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth="7"
          stroke={`url(#sg-${size})`}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * p) / 100}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-2xl font-bold">{score}</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">score</div>
      </div>
    </div>
  );
}
