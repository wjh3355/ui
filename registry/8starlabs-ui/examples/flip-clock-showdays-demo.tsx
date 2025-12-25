import FlipClock from "@/registry/8starlabs-ui/blocks/flip-clock";

export default function FlipClockShowDaysDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Always show days, even if zero */}
      <FlipClock
        countdown={true}
        showDays="always"
        targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
        size={"md"}
      />
      {/* Show days only if non-zero */}
      <FlipClock
        countdown={true}
        showDays="auto"
        targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
        size={"md"}
      />
      {/* Never show days, even if 1 or more */}
      <FlipClock
        countdown={true}
        showDays="never"
        targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 500)}
        size={"md"}
      />
    </div>
  );
}
