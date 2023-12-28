import { Parser, success } from "./parser";

export const map =
  <T, R>(f: (arg: T) => R) =>
  (parser: Parser<T>): Parser<R> =>
  (str: string) => {
    const parsed = parser(str);
    switch(parsed.type) {
      case "success":
        return success(f(parsed.parsed), parsed.remaining);
      case "failure":
        return parsed;
    };
  };
