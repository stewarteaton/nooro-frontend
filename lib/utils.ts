import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const taskColors = new Map([
  ["red", "#ef4444"],
  ["orange", "#f97316"],
  ["yellow", "#eab308"],
  ["green", "#22c55e"],
  ["blue", "#3b82f6"],
  ["indigo", "#6366f1"],
  ["purple", "#8b5cf6"],
  ["pink", "#ec4899"],
  ["gray", "#78716c"],
]);
