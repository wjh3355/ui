import FlipClock from "@/registry/8starlabs-ui/blocks/flip-clock";

export default function FlipClockCountdownDemo() {
  return (
    <div className="flex flex-col gap-8">
      <FlipClock
        countdown={true}
        targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
        size={"md"}
      />
      <FlipClock
        countdown={true}
        showDays="always"
        targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
        size={"md"}
      />
      <div />
      <FlipClock
        variant="secondary"
        countdown={true}
        targetDate={new Date(Date.now() + 10000 * 60 * 60 * 24)}
        size={"md"}
      />
      <FlipClock
        variant="secondary"
        countdown={true}
        showDays="never"
        targetDate={new Date(Date.now() + 10000 * 60 * 60 * 24)}
        size={"md"}
      />
      <div />
      <FlipClock
        variant="muted"
        countdown={true}
        targetDate={new Date(Date.now() + 500000 * 60 * 60 * 24)}
        size={"md"}
      />
    </div>
  );
}
