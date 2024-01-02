import { token, map } from "../parser";
import { name, author, version, repository } from "../../package.json";
import { pipe } from "fp-ts/lib/function";

export type Identify = ["identify"];
const Identify: Identify = ["identify"];

export const parse = pipe(
  token("identify"),
  map(() => Identify)
);

const write = (str: string) => console.log('identify', str);

export const identify = async (_: Identify) => {
  write(`name ${name}`);
  write(`author ${author}`);
  write(`version ${version}`);
  write(`url ${repository.url}`);
  write("ok");
};
