export type Parser<T> = (str: string) => [T | undefined, string];
