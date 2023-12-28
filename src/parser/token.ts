import { Parser, failure, success } from "./parser";

export const token =
  <T extends string>(token: T): Parser<T> =>
  (str: string) => {
    if (str.startsWith(token)) return success(token, str.slice(token.length));
    return failure(`Expected token ${token}`);
  };
