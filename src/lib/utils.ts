import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Snippet } from "svelte"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type WithElementRef<T> = T & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  children?: Snippet
}
