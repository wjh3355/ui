import {
  HHMMSSClock,
  CountdownClock
} from "@/registry/8starlabs-ui/blocks/flip-clock";

export default function page() {
  return (
    <div>
      1234567890
      <CountdownClock targetDate={new Date("2027-12-31T23:59:59")} />
    </div>
  );
}
