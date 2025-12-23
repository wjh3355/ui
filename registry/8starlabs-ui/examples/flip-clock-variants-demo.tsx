import FlipClock from "@/registry/8starlabs-ui/blocks/flip-clock";

export default function FlipClockVariantsDemo() {
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
