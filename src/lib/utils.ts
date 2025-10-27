import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function formatDuration(start: Date | string, end: Date | string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  return `${hours}h`;
}

export function calculateSessionPrice(
  hourlyRate: number,
  start: Date | string,
  end: Date | string,
  rushRate?: number | null
): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  
  // Check if session is within 24 hours
  const now = new Date();
  const hoursUntilStart = (startDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  const isRush = hoursUntilStart < 24;
  
  const rate = isRush && rushRate ? rushRate : hourlyRate;
  return Math.round(rate * hours);
}

export function formatTaskType(taskType: string): string {
  const map: Record<string, string> = {
    MIX_TWEAK: "Mix Tweak",
    MASTER_QC: "Master QC",
    VOCAL_EDIT: "Vocal Edit",
    PROD_ASSIST: "Production Assist",
    ARRANGE_FEEDBACK: "Arrangement Feedback",
  };
  return map[taskType] || taskType;
}

export function formatBookingMode(mode: string): string {
  return mode === "INSTANT" ? "Instant Book" : "Request to Book";
}

export function formatSessionStatus(status: string): string {
  const map: Record<string, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    IN_PROGRESS: "In Progress",
    DELIVERED: "Delivered",
    COMPLETED: "Completed",
    CANCELED: "Canceled",
    DECLINED: "Declined",
  };
  return map[status] || status;
}
