import { token, map } from "../parser";
import { name, author, version, repository } from "../../package.json";
import { pipe } from "fp-ts/lib/function";

export type Identify = ["identify"];
const Identify: Identify = ["identify"];

export const parse = pipe(
  token("identify"),
  map(() => Identify)
);

export const identify = async (_: Identify) => {
  console.log(`name ${name}`);
  console.log(`author ${author}`);
  console.log(`version ${version}`);
  console.log(`url ${repository.url}`);
  console.log("identify ok");
};
