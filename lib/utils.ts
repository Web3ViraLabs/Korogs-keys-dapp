import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToHttpUrl(uri: string): string {
  if (uri.startsWith("ipfs://")) {
    const ipfsHash = uri.replace(/^ipfs:\/\/(ipfs\/)*/, "");
    return `https://ipfs.io/ipfs/${ipfsHash}`;
  }
  return uri;
}
