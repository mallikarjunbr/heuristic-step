import { Parser } from "./parser";

type Combined<A extends any[]> = {
  readonly [I in keyof A]: Parser<A[I]>;
};

export const and = <T extends any[]>(...parsers: Combined<[...T]>): Parser<T> => (str: string) => {
  let remaining = str;
  const results: T = [] as any;
  for (const parser of parsers) {
    const result = parser(remaining);
    if (result[0] == undefined) {
      return [undefined, str];
    }
    results.push(result[0]);
    remaining = result[1];
  }
  return [results, remaining];
}
