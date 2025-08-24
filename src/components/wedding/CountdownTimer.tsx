import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownState {
  timeLeft: TimeLeft;
  isExpired: boolean;
}

const CountdownTimer = () => {
  const [countdownState, setCountdownState] = useState<CountdownState>({
    timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    isExpired: false,
  });

  useEffect(() => {
    const weddingDate = new Date('2026-05-01T15:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setCountdownState({
          timeLeft: {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
          },
          isExpired: false,
        });
      } else {
        setCountdownState({
          timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
          isExpired: true,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (countdownState.isExpired) {
    return (
      <div className="text-center">
        <div className="wedding-card bg-white/90 backdrop-blur-md border-2 border-white/30 shadow-lg p-6 md:p-8">
          <div className="text-display-lg text-primary mb-2">
            💕
          </div>
          <div className="text-lg md:text-xl font-body font-semibold text-foreground mb-2">
            A nagy nap elérkezett!
          </div>
          <div className="text-sm md:text-base font-body text-foreground/80">
            Köszönjük, hogy velünk ünnepeltek! ✨
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      {[
        { value: countdownState.timeLeft.days, label: 'Nap' },
        { value: countdownState.timeLeft.hours, label: 'Óra' },
        { value: countdownState.timeLeft.minutes, label: 'Perc' },
        { value: countdownState.timeLeft.seconds, label: 'Másodperc' },
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