import { Parser, success } from "./parser";

export const many = <T>(parser: Parser<T>): Parser<T[]> => (str: string) => {
  const results: T[] = [];
  let remaining = str;
  let result = parser(remaining);
  while (result.type === "success") {
    results.push(result.parsed);
    remaining = result.remaining;
    result = parser(remaining);
  }
  return success(results, remaining);
}
