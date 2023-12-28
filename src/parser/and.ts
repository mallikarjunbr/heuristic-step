import { Parser, failure, success } from "./parser";

type Combined<A extends any[]> = {
  readonly [I in keyof A]: Parser<A[I]>;
};

export const and = <T extends any[]>(...parsers: Combined<[...T]>): Parser<T> => (str: string) => {
  let remaining = str;
  const results: T = [] as any;
  for (const parser of parsers) {
    const result = parser(remaining);
    if (result.type === "failure") {
      return failure(result.reason);
    }
    results.push(result.parsed);
    remaining = result.remaining;
  }
  return success(results, remaining);
}
