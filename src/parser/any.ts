import { ParseResult } from "./parse-result";
import { Parser } from "./parser";

export const any: Parser<undefined> = (str: string) => {
  return ParseResult.Success(undefined, str);
};
