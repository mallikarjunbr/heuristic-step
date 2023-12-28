export type ParseSuccess<T> = { type: "success", parsed: T, remaining: string };
export type ParseFailure = { type: "failure", reason: string };
export type ParseResult<T> = ParseSuccess<T> | ParseFailure;
export const success = <T>(parsed: T, remaining: string): ParseSuccess<T> => ({ type: "success", parsed, remaining });
export const failure = (reason: string): ParseFailure => ({ type: "failure", reason });
export type Parser<T> = (str: string) => ParseResult<T>;
