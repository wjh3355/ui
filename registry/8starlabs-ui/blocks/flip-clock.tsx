"use client";

import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode, useEffect, useState } from "react";

interface FlipUnitProps {
  digit: number | string;
  className?: string;
  digitSize: number;
  cardHeight: number;
  cardWidth: number;
}

export function FlipUnit({
  digit,
  className,
  digitSize,
  cardHeight,
  cardWidth
}: FlipUnitProps) {
  const [prevDigit, setPrevDigit] = useState(digit);
  const [flipping, setFlipping] = useState(false);

  const commonCardStyle = "absolute inset-x-0 overflow-hidden bg-secondary";

  const halfHeight = Math.floor(cardHeight / 2);

  useEffect(() => {
    if (digit !== prevDigit) {
      setFlipping(true);
      // Wait for the full animation (0.3s top + 0.3s bottom) before resetting
      const timer = setTimeout(() => {
        setFlipping(false);
        setPrevDigit(digit);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [digit, prevDigit]);

  return (
    <div
      style={{
        width: `${cardWidth}px`,
        height: `${halfHeight * 2}px`,
        fontSize: `${digitSize}px`,
        perspective: "1000px"
      }}
      className={cn(
        "relative text-primary font-mono font-medium antialiased",
        className
      )}
    >
      {/* 1. Background Top (The NEW digit waiting) */}
      <div
        className={cn(commonCardStyle, "rounded-t-lg", "top-0")}
        style={{ height: `${halfHeight}px` }}
      >
        <DigitSpan>{digit}</DigitSpan>
      </div>

      {/* 2. Background Bottom (The OLD digit staying) */}
      <div
        className={cn(commonCardStyle, "rounded-b-lg", "bottom-0")}
        style={{ height: `${halfHeight}px` }}
      >
        <DigitSpan style={{ top: -halfHeight }}>{prevDigit}</DigitSpan>
      </div>

      {/* 3. Top Flap (The OLD digit falling down) */}
      <div
        className={cn(
          commonCardStyle,
          "z-20 origin-bottom backface-hidden top-0 rounded-t-lg h-1/2",
          flipping && "animate-flip-top-continuous"
        )}
      >
        <DigitSpan>{prevDigit}</DigitSpan>
      </div>

      {/* 4. Bottom Flap (The NEW digit appearing) */}
      <div
        className={cn(
          commonCardStyle,
          "z-10 origin-top backface-hidden bottom-0 rounded-b-lg h-1/2",
          flipping && "animate-flip-bottom-continuous"
        )}
        style={{ transform: "rotateX(90deg)" }}
      >
        <DigitSpan style={{ top: -halfHeight }}>{digit}</DigitSpan>
      </div>

      {/* Center Divider Shadow */}
      <div className="absolute top-1/2 left-0 w-full h-[3px] -translate-y-1/2 bg-background/50 z-30" />

      {/* Injected Keyframes (The Shadcn "Cheat Code") */}
      <style jsx global>{`
        /* Use the same duration for both to keep them in sync */
        .animate-flip-top-continuous {
          animation: flip-top-anim 0.6s ease-in forwards;
        }
        .animate-flip-bottom-continuous {
          animation: flip-bottom-anim 0.6s ease-out forwards;
        }

        @keyframes flip-top-anim {
          0% {
            transform: rotateX(0deg);
            z-index: 30;
          }
          50%,
          100% {
            transform: rotateX(-90deg);
            z-index: 10;
          }
        }

        @keyframes flip-bottom-anim {
          0%,
          50% {
            transform: rotateX(90deg);
            z-index: 10;
          }
          100% {
            transform: rotateX(0deg);
            z-index: 30;
          }
        }
      `}</style>
    </div>
  );
}

interface DigitSpanProps {
  children: ReactNode;
  style?: CSSProperties;
}

function DigitSpan({ children, style }: DigitSpanProps) {
  return (
    <span
      className="absolute left-0 w-full flex items-center justify-center text-center"
      style={{
        transform: "translateY(-0.05em)",
        ...style
      }}
    >
      {children}
    </span>
  );
}

export function HHMMSSClock() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
      });
    };

    updateTime(); // Initial call
    const timer = setInterval(updateTime, 1000); // Update every second
    return () => clearInterval(timer);
  }, []);

  const hoursStr = String(time.hours).padStart(2, "0");
  const minutesStr = String(time.minutes).padStart(2, "0");
  const secondsStr = String(time.seconds).padStart(2, "0");

  return (
    <div className={`flex justify-center items-center h-50 space-x-2`}>
      <FlipUnit
        digit={hoursStr[0]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />
      <FlipUnit
        digit={hoursStr[1]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />
      <span className="text-primary text-4xl font-mono font-bold">:</span>
      <FlipUnit
        digit={minutesStr[0]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />
      <FlipUnit
        digit={minutesStr[1]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />
      <span className="text-primary text-4xl font-mono font-bold">:</span>
      <FlipUnit
        digit={secondsStr[0]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />
      <FlipUnit
        digit={secondsStr[1]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />
    </div>
  );
}

interface CountdownClockProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownClock({ targetDate }: CountdownClockProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const diff = Math.max(0, targetDate.getTime() - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const daysStr = String(timeLeft.days).padStart(3, "0");
  const hoursStr = String(timeLeft.hours).padStart(2, "0");
  const minutesStr = String(timeLeft.minutes).padStart(2, "0");
  const secondsStr = String(timeLeft.seconds).padStart(2, "0");

  return (
    <div className="flex justify-center items-center space-x-2">
      {/* Days */}
      <FlipUnit
        digit={daysStr[0]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />
      <FlipUnit
        digit={daysStr[1]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />
      <FlipUnit
        digit={daysStr[2]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />

      <span className="text-primary text-4xl font-mono font-bold">:</span>

      {/* Hours */}
      <FlipUnit
        digit={hoursStr[0]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />
      <FlipUnit
        digit={hoursStr[1]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />

      <span className="text-primary text-4xl font-mono font-bold">:</span>

      {/* Minutes */}
      <FlipUnit
        digit={minutesStr[0]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />
      <FlipUnit
        digit={minutesStr[1]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />

      <span className="text-primary text-4xl font-mono font-bold">:</span>

      {/* Seconds */}
      <FlipUnit
        digit={secondsStr[0]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />
      <FlipUnit
        digit={secondsStr[1]}
        digitSize={80}
        cardHeight={110}
        cardWidth={80}
      />
    </div>
  );
}
