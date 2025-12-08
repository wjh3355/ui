import {
  Children,
  cloneElement,
  CSSProperties,
  HTMLAttributes,
  ReactElement
} from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const timelineDotVariants = cva(
  "h-4 w-4 rounded-full border-2 bg-background z-10 box-border", // Base styles
  {
    variants: {
      variant: {
        default: "border-primary",
        success: "border-green-500 bg-green-500",
        warning: "border-amber-500 bg-amber-500",
        error: "border-red-500 bg-red-500",
        info: "border-blue-400 bg-blue-400"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const timelineItemVariants = cva(
  "flex flex-col border rounded-md p-4 bg-card text-card-foreground shadow-sm", // Base card styles
  {
    variants: {
      variant: {
        default: "border-border",
        success: "border-green-500 shadow-md",
        warning: "border-amber-500 shadow-md",
        error: "border-red-500 shadow-md",
        info: "border-blue-400 shadow-md"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const timelineLayoutVariants = cva("grid relative", {
  variants: {
    orientation: {
      horizontal: "grid-flow-col grid-rows-[min-content_auto_min-content]",
      vertical: "grid-cols-[1fr_auto_1fr] auto-rows-min"
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});

const timelineItemContainerVariants = cva("flex relative", {
  variants: {
    orientation: {
      horizontal: "w-full justify-center",
      vertical: "h-full items-center" // Vertical items need to center vertically
    },
    side: {
      // Logic for "Before Line" (on top / left) vs "After Line" (on bottom / right)
      before: "",
      after: ""
    }
  },
  compoundVariants: [
    // Horizontal + Top (Even)
    { orientation: "horizontal", side: "before", class: "items-end pb-4" },
    // Horizontal + Bottom (Odd)
    { orientation: "horizontal", side: "after", class: "items-start pt-4" },
    // Vertical + Left (Even)
    { orientation: "vertical", side: "before", class: "justify-end pr-4" },
    // Vertical + Right (Odd)
    { orientation: "vertical", side: "after", class: "justify-start pl-4" }
  ]
});

export interface TimelineItemProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineItemVariants> {
  date: Date;
  title: string;
  description?: string;
  index?: number;

  total?: number;
  cardWidth?: number;
  maxCardWidth?: number;

  alternating?: boolean;
  alignment?: "top/left" | "bottom/right";
  orientation?: "horizontal" | "vertical";
}

export interface TimelineProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineLayoutVariants> {
  alternating?: boolean;
  alignment?: "top/left" | "bottom/right";

  horizItemSpacing?: number;
  horizItemWidth?: number;

  vertItemSpacing?: number;
  vertItemMaxWidth?: number;

  orientation: "horizontal" | "vertical";
}

export function Timeline({
  children,
  className,
  horizItemWidth = 220,
  horizItemSpacing = 130,
  vertItemSpacing = 100,
  vertItemMaxWidth = 400,
  alternating = true,
  alignment = "top/left",
  orientation = "horizontal",
  ...props
}: TimelineProps) {
  const isVertical = orientation === "vertical";

  const spillover = Math.max(0, (horizItemWidth - horizItemSpacing) / 2);
  const safePadding = spillover + 16;

  return (
    <div className={cn("py-8", className)} {...props} id="timeline-container">
      <div
        id="timeline-grid"
        className={timelineLayoutVariants({ orientation })}
        style={
          isVertical
            ? {
                gridAutoRows: `${vertItemSpacing}px` // Vertical Gap
              }
            : {
                gridAutoColumns: `${horizItemSpacing}px`, // Horizontal Spacing
                paddingLeft: `${safePadding}px`, // Bumper padding
                paddingRight: `${safePadding}px`
              }
        }
        {...props}
      >
        {Children.map(children, (child, index) =>
          cloneElement(child as ReactElement<any>, {
            index,
            orientation,
            total: Children.count(children),
            cardWidth: horizItemWidth,
            maxCardWidth: vertItemMaxWidth,
            alternating,
            alignment
          })
        )}
      </div>
    </div>
  );
}

export function TimelineItem({
  className,
  variant,
  date,
  title,
  description,
  index = 0,
  total = 0,
  cardWidth,
  maxCardWidth,
  alternating,
  alignment,
  orientation,
  ...props
}: TimelineItemProps) {
  const isEven = index % 2 === 0;
  const isVertical = orientation === "vertical";

  // Determine "side" based on index
  const side = alternating
    ? isEven
      ? "before"
      : "after"
    : alignment === "top/left"
      ? "before"
      : "after";

  // Dynamic Grid Positioning
  const gridStyle: CSSProperties = isVertical
    ? {
        gridColumn: side === "before" ? 1 : 3,
        gridRow: index + 1
      }
    : {
        gridColumn: index + 1,
        gridRow: side === "before" ? 1 : 3
      };

  const cardStyle: CSSProperties = isVertical
    ? {
        maxWidth: `${maxCardWidth}px`
      }
    : {
        width: `${cardWidth}px`,
        minWidth: `${cardWidth}px`,
        maxWidth: `${cardWidth}px`
      };

  return (
    <>
      <div
        id={`timeline-item-${index}-container`}
        className={timelineItemContainerVariants({ orientation, side })}
        style={gridStyle}
      >
        <div
          id={`timeline-item-${index}`}
          style={cardStyle}
          className={cn(
            timelineItemVariants({ variant }),
            "shrink-0",
            className
          )}
          {...props}
        >
          <span className="text-xs text-muted-foreground">
            {dateFormatter.format(date)}
          </span>
          <h3 className="font-semibold leading-none mt-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>

      <div
        id={`timeline-item-${index}-middle`}
        className="relative flex items-center justify-center"
        style={
          isVertical
            ? { gridColumn: 2, gridRow: index + 1, height: "100%" }
            : { gridColumn: index + 1, gridRow: 2, width: "100%" }
        }
      >
        <div
          className={cn(
            "absolute bg-muted",
            index === 0 ? "rounded-l-full" : "",
            index === total - 1 ? "rounded-r-full" : "",
            isVertical ? "h-full w-1 top-0" : "w-full h-1 left-0"
          )}
          id={`timeline-item-${index}-line`}
        />

        <div
          className={cn(timelineDotVariants({ variant }))}
          id={`timeline-item-${index}-dot`}
        />
      </div>
    </>
  );
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

const timelineData: TimelineItemProps[] = [
  {
    title: "Project Kickoff",
    description:
      "Initial meeting with all stakeholders to define project scope.",
    date: new Date("2023-01-05"),
    variant: "info"
  },
  {
    title: "Requirements Gathering",
    description:
      "Collected requirements from the client, covering both functional and non-functional aspects. This took several sessions over multiple weeks and included detailed analysis.",
    date: new Date("2023-01-12"),
    variant: "success"
  },
  {
    title: "Design Phase",
    description: "Created wireframes, mockups, and system design diagrams.",
    date: new Date("2023-01-20")
  },
  {
    title:
      "Database Setup Extravaganza with Lots of Unnecessary Complexity for Testing Purposes Only",
    description:
      "Configured databases, tables, and initial seed data for testing. This included hundreds of tables, dozens of indexes, and a complicated schema that will never be used in production. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea nostrum officiis laborum debitis error hic omnis architecto, consectetur vitae atque, temporibus, alias minus a dolore voluptate sed quam ratione placeat!",
    date: new Date("2023-02-01"),
    variant: "error"
  }
];

export default function TimelineDemo() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Timeline
        orientation="vertical"
        alignment="top/left"
        alternating={true}
        vertItemSpacing={150}
      >
        {timelineData.map((item, idx) => (
          <TimelineItem key={idx} {...item} />
        ))}
      </Timeline>
    </div>
  );
}
