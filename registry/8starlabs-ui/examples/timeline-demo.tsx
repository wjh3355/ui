import Timeline, { TimelineItemProps, TimelineItem } from "../blocks/timeline";

const timelineData: TimelineItemProps[] = [
  {
    title: "Project Kickoff",
    description:
      "Initial meeting with stakeholders to define the roadmap and core requirements.",
    date: new Date("2023-01-01"),
    variant: "default" // Blue/Gray border (Standard)
  },
  {
    title: "Research Phase",
    description:
      "Conducted user interviews and competitive analysis to refine the feature set.",
    date: new Date("2023-01-15"),
    variant: "info" // Blue (Informational)
  },
  {
    title: "Prototype Approval",
    description:
      "Client signed off on the high-fidelity designs and interactive prototype.",
    date: new Date("2023-02-01"),
    variant: "success" // Green (Milestone reached)
  },
  {
    title: "Unexpected API Delays",
    description:
      "Third-party integration is taking longer than expected due to rate limiting issues.",
    date: new Date("2023-02-10"),
    variant: "warning" // Amber (Caution)
  },
  {
    title: "Critical Database Failure",
    description:
      "Data corruption occurred during migration. rollback procedures initiated immediately.",
    date: new Date("2023-02-14"),
    variant: "destructive" // Red (Problem)
  },
  {
    title: "Beta Launch",
    description:
      "System stabilized and released to the first batch of 500 internal users.",
    date: new Date("2023-03-01"),
    variant: "success" // Green (Completion)
  }
];

export default function TimelineDemo() {
  return (
    <Timeline orientation="horizontal">
      {timelineData.map((item, idx) => (
        <TimelineItem key={idx} {...item} />
      ))}
    </Timeline>
  );
}
