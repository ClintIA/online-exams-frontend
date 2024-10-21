import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeFileName(name: string) {
  try {
    return name.replace(/[^a-zA-Z0-9]/g, '_')
  } catch (err) {
    console.error('Error normalizing file name:', err)
    return name
  }
}
