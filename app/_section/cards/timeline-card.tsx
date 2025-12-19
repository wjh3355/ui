import ScrollFade from "@/registry/8starlabs-ui/blocks/scroll-fade";
import Timeline, {
  TimelineItem,
  TimelineItemDate,
  TimelineItemDescription,
  TimelineItemTitle
} from "@/registry/8starlabs-ui/blocks/timeline";
import { Card } from "@/registry/8starlabs-ui/ui/card";
import Link from "next/link";

type Props = {};

const timelineData = [
  {
    title: "Project Kickoff",
    description: "Initial meeting with stakeholders.",
    date: new Date("2023-01-01"),
    variant: "default" as const
  },
  {
    title: "Research Phase",
    description: "Conducted user interviews to refine the feature set.",
    date: new Date("2023-01-15"),
    variant: "secondary" as const
  },
  {
    title: "Prototype Approval",
    description:
      "Client signed off on the high-fidelity designs and interactive prototype.",
    date: new Date("2023-02-01"),
    variant: "default" as const
  },
  {
    title: "Unexpected API Delays",
    description: "Third-party integration taking longer than expected.",
    date: new Date("2023-02-10"),
    variant: "outline" as const
  },
  {
    title: "Critical Database Failure",
    description:
      "Data corruption occurred during migration. Rollback procedures initiated immediately.",
    date: new Date("2023-02-14"),
    variant: "destructive" as const
  },
  {
    title: "Beta Launch",
    description: "System stabilized and released to the first batch of users.",
    date: new Date("2023-03-01"),
    variant: "default" as const
  }
];

const TimelineCard = (props: Props) => {
  return (
    <Link href="/docs/components/timeline">
      <Card className="size-full px-6 group relative overflow-hidden hover:bg-muted/20 transition-colors">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold">Timeline</h3>
            <p className="text-muted-foreground text-sm">
              A component to display chronological events.
              <br />
              Shift + Scroll to navigate horizontally (on desktop).
            </p>
          </div>

          <ScrollFade axis="horizontal">
            <Timeline orientation="horizontal">
              {timelineData.map((item, idx) => (
                <TimelineItem key={idx} variant={item.variant}>
                  <TimelineItemDate>
                    {item.date.toDateString()}
                  </TimelineItemDate>
                  <TimelineItemTitle>{item.title}</TimelineItemTitle>
                  <TimelineItemDescription>
                    {item.description}
                  </TimelineItemDescription>
                </TimelineItem>
              ))}
            </Timeline>
          </ScrollFade>
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

export default TimelineCard;
