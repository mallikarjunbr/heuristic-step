import { isExternal } from "util/types";
import { Parser, failure, success } from "./parser";

export const integer: Parser<number> = (str: string) => {
  const parsed = parseInt(str, 10);
  return Number.isSafeInteger(parsed)
    ? success(parsed, str.slice(parsed.toString().length))
    : failure("Expected integer");
};
