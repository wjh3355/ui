import FlipClock from "@/registry/8starlabs-ui/blocks/flip-clock";

export default function FlipClockCountdownDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* 1 day ahead */}
      <FlipClock
        countdown={true}
        targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
        size={"md"}
      />

      {/* 10 days ahead */}
      <FlipClock
        variant="secondary"
        countdown={true}
        targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)}
        size={"md"}
      />

      {/* 500 days ahead */}
      <FlipClock
        variant="muted"
        countdown={true}
        targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 500)}
        size={"md"}
      />
    </div>
  );
}
