import { Parser } from "./parser";

type Combined<A extends any[]> = {
  readonly [I in keyof A]: Parser<A[I]>;
};

type Union<A extends any[]> = A[number];

export const or = <T extends any[]>(...parsers: Combined<[...T]>): Parser<Union<T>> => (str: string) => {
  for (const parser of parsers) {
    const result = parser(str);
    if (result[0]!= undefined) {
      return result;
    }
  }
  return [undefined, str];
}
