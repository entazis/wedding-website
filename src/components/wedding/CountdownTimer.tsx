import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const weddingDate = new Date('2026-05-01T15:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      {[
        { value: timeLeft.days, label: 'Nap' },
        { value: timeLeft.hours, label: 'Óra' },
        { value: timeLeft.minutes, label: 'Perc' },
        { value: timeLeft.seconds, label: 'Másodperc' },
      ].map((item, index) => (
        <div key={item.label} className="text-center">
          <div className="wedding-card bg-white/90 backdrop-blur-md border-2 border-white/30 min-w-[70px] md:min-w-[90px] shadow-lg">
            <div className="text-display-md text-primary animate-pulse-slow">
              {item.value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm font-body font-medium text-foreground/80 uppercase tracking-wider">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;