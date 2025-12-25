import Link from "next/link";
import FlipClock from "@/registry/8starlabs-ui/blocks/flip-clock";
import { Card } from "@/registry/8starlabs-ui/ui/card";

const FlipClockCard = () => {
  return (
    <Link prefetch={false} href="/docs/components/flip-clock">
      <Card className="size-full px-6 group relative overflow-hidden hover:bg-muted/20 transition-colors">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg">Flip Clock</h3>
            <p className="text-sm text-muted-foreground">
              A retro flip clock component to display time with a vintage feel.
            </p>
          </div>

          <div className="flex flex-col gap-3 my-7">
            <FlipClock size={"md"} variant="secondary" />
          </div>
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M7 17L17 7"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 7h10v10"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Card>
    </Link>
  );
};

export default FlipClockCard;
