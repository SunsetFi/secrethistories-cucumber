import { BookOfHoursAPI, APINetworkError } from "bookofhours-api";

export const api = new BookOfHoursAPI("http://localhost:8081");

export function throwForStatus(err: Error, messages: Record<number, string>) {
  if (err instanceof APINetworkError) {
    const message = messages[err.statusCode];
    if (message) {
      throw new Error(
        `${message} (server returned ${err.statusCode} ${err.message})`
      );
    }
  } else {
    console.log(err, "is not api error");
  }
}
