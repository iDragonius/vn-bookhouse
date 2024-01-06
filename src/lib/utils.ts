import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProductProps } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `https://admin.vnbookhouse.az${src}?w=${width}&q=${quality || 75}`;
};
