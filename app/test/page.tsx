import FlipClock from "@/registry/8starlabs-ui/blocks/flip-clock";

export default function page() {
  return (
    <div className="flex flex-col gap-16 p-8">
      <FlipClockSizeDemo />
      <FlipClockVariantsDemo />
      <FlipClockCountdownDemo />
    </div>
  );
}

function FlipClockSizeDemo() {
  return (
    <div className="flex flex-col gap-8">
      <FlipClock size={"sm"} />
      <FlipClock size={"md"} />
      <FlipClock size={"lg"} />
      <FlipClock size={"xl"} />
    </div>
  );
}

function FlipClockVariantsDemo() {
  return (
    <div className="flex flex-col gap-8">
      <FlipClock variant={"default"} />
      <FlipClock variant={"secondary"} />
      <FlipClock variant={"destructive"} />
      <FlipClock variant={"outline"} />
      <FlipClock variant={"muted"} />
    </div>
  );
}

function FlipClockCountdownDemo() {
  return (
    <div className="flex flex-col gap-8">
      <FlipClock
        countdown={true}
        targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
        size={"md"}
      />
      <FlipClock
        countdown={true}
        targetDate={new Date(Date.now() + 10000 * 60 * 60 * 24)}
        size={"md"}
      />
      <FlipClock
        countdown={true}
        targetDate={new Date(Date.now() + 500000 * 60 * 60 * 24)}
        size={"md"}
      />
    </div>
  );
}
