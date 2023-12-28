import { pipe } from "fp-ts/lib/function";
import * as P from "../parser";

type Version = string;
export type Handshake = ["handshake", Version];
const Handshake = (version: Version): Handshake => ["handshake", version];

export const parse = pipe(
  P.and(
    P.token("st3p"),
    P.many(P.whitespace),
    P.token("version"),
    P.many(P.whitespace),
    P.token("1")
  ),
  P.map(([,,,,version]) => Handshake(version))
);

export const handshake = async ([, version]: Handshake): Promise<void> => {
  console.log(`st3p version ${version} ok`);
};
