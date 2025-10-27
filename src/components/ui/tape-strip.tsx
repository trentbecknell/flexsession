"use client";

import { Clock, Zap } from "lucide-react";
import { formatTaskType, cn } from "@/lib/utils";
import { format } from "date-fns";

export type TapeStripVariant = "default" | "instant" | "request";

interface TapeStripProps {
  start: Date | string;
  end: Date | string;
  taskType: string;
  mode: "INSTANT" | "REQUEST";
  variant?: TapeStripVariant;
  onClick?: () => void;
  className?: string;
}

export function TapeStrip({
  start,
  end,
  taskType,
  mode,
  variant,
  onClick,
  className,
}: TapeStripProps) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  const timeString = `${format(startDate, "h:mma")} – ${format(endDate, "h:mma")}`;
  const dateString = format(startDate, "EEE, MMM d");
  
  const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const durationString = `${hours}h`;

  const isInstant = mode === "INSTANT";
  const variantClass = variant || (isInstant ? "instant" : "request");

  return (
    <button
      onClick={onClick}
      className={cn(
        "tape-strip relative w-full text-left transition-all duration-200",
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
        "group hover:shadow-md",
        variantClass === "instant" && "tape-strip-instant",
        variantClass === "request" && "tape-strip-request",
        onClick && "cursor-pointer",
        !onClick && "cursor-default",
        className
      )}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="flex items-center gap-2 text-ink/70">
          <Clock className="w-4 h-4" />
          <div className="font-medium text-sm">
            <div>{dateString}</div>
            <div className="text-xs opacity-75">{timeString}</div>
          </div>
        </div>
        
        <div className="h-8 w-px bg-tape" />
        
        <div className="flex-1">
          <div className="font-semibold text-sm text-ink">
            {formatTaskType(taskType)}
          </div>
          <div className="text-xs text-ink/60">{durationString}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isInstant && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-sm bg-accent/20 text-accent text-xs font-semibold">
            <Zap className="w-3 h-3" />
            Instant Book
          </div>
        )}
        {!isInstant && (
          <div className="px-2 py-1 rounded-sm bg-tape/30 text-ink/70 text-xs font-semibold">
            Request to Book
          </div>
        )}
      </div>
    </button>
  );
}

interface TapeStripListProps {
  slots: Array<{
    id: string;
    start: Date | string;
    end: Date | string;
    taskType: string;
    mode: "INSTANT" | "REQUEST";
  }>;
  onSlotClick?: (slotId: string) => void;
  className?: string;
}

export function TapeStripList({ slots, onSlotClick, className }: TapeStripListProps) {
  if (slots.length === 0) {
    return (
      <div className={cn("text-center py-8 text-muted-foreground", className)}>
        No availability slots at this time
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {slots.map((slot) => (
        <TapeStrip
          key={slot.id}
          start={slot.start}
          end={slot.end}
          taskType={slot.taskType}
          mode={slot.mode}
          onClick={onSlotClick ? () => onSlotClick(slot.id) : undefined}
        />
      ))}
    </div>
  );
}
