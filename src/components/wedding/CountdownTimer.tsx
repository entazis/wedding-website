import { useEffect, useState } from 'react';

const WEDDING_DATE = new Date('2026-05-01T00:00:00');

/** Whole days elapsed since the wedding (never negative). */
const daysSinceWedding = (): number => {
  const diff = Date.now() - WEDDING_DATE.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
};

/**
 * Post-wedding "days married" counter. Counts up from the wedding day.
 * The value is computed synchronously on first render so there is no flash of
 * a placeholder before the first tick.
 */
const CountdownTimer = () => {
  const [days, setDays] = useState<number>(daysSinceWedding);

  // The day count only changes at midnight, so a gentle hourly refresh keeps
  // a long-open tab correct without any visible churn.
  useEffect(() => {
    const timer = setInterval(() => setDays(daysSinceWedding()), 60 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="wedding-card bg-white/90 backdrop-blur-md border-2 border-white/30 shadow-lg p-6 md:p-8 inline-block">
        <div className="text-display-lg text-primary animate-pulse-slow leading-none">
          {days}
        </div>
        <div className="mt-2 text-sm md:text-base font-body font-medium uppercase tracking-wider text-foreground/80">
          napja házasok vagyunk 💕
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
