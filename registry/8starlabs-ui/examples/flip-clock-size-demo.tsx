import FlipClock from "@/registry/8starlabs-ui/blocks/flip-clock";

export default function FlipClockSizeDemo() {
  return (
    <div className="flex flex-col gap-8">
      <FlipClock size={"sm"} />
      <FlipClock size={"md"} />
      <FlipClock size={"lg"} />
      <FlipClock size={"xl"} />
    </div>
  );
}
