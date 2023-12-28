import { Parser } from "./parser";

export const map =
  <T, R>(f: (arg: T) => R) =>
  (parser: Parser<T>): Parser<R> =>
  (str: string) => {
    const parsed = parser(str);
    const [result, remaining] = parsed;
    return result != undefined
      ? [f(result), remaining]
      : [undefined, remaining];
  };
