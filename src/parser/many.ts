import { Parser } from "./parser";

export const many = <T>(parser: Parser<T>): Parser<T[]> => (str: string) => {
  const results: T[] = [];
  let remaining = str;
  let result = parser(remaining);
  while (result[0] != undefined) {
    results.push(result[0]);
    remaining = result[1];
    result = parser(remaining);
  }
  return [results, remaining];
}
