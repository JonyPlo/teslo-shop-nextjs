import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// El nombre 'cn' significa ClassNames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
