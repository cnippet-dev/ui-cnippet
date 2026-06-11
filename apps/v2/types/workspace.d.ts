declare module "@workspace/ui/lib/utils" {
  import type { ClassValue } from "clsx";
  export function cn(...inputs: ClassValue[]): string;
}

declare module "@workspace/ui/*" {
  const value: unknown;
  export = value;
}
