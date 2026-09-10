import { Star } from "lucide-react";

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i <= Math.round(rating)
              ? "fill-[var(--gold)] text-[var(--gold)]"
              : "text-muted-foreground/40"
          }
        />
      ))}
    </span>
  );
}
