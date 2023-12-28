import { Parser } from "./parser";

export const token =
  <T extends string>(token: T): Parser<T> =>
  (str: string) => {
    if (str.startsWith(token)) return [token, str.slice(token.length)];
    return [undefined, str];
  };
