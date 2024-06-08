import { Account } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import date from "date-and-time";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// format the url to access any user account
export function account_url(account: Account): string {
  return `${account.username}-${account.id}`;
}

export function get_username_and_id(slug: string): {
  username: string | undefined;
  id: number | undefined;
} {
  const arr = slug.split("-");
  if (arr.length !== 2) {
    return {
      username: undefined,
      id: undefined,
    };
  }
  let id: number | undefined = Number.parseInt(arr[1]);
  if (Number.isNaN(id)) id = undefined;
  return {
    username: arr[0],
    id,
  };
}

export function formatDate(input_date: Date) {
  return date.format(input_date, "MMM DD, YYYY");
}
