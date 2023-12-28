import { pipe } from "fp-ts/lib/function";
import { and, token, one_or_more, map, whitespace } from "../parser";

type Version = string;
export type Handshake = ["handshake", Version];
const Handshake = (version: Version): Handshake => ["handshake", version];

export const parse = pipe(
  and(
    token("st3p"),
    one_or_more(whitespace),
    token("version"),
    one_or_more(whitespace),
    token("1")
  ),
  map(([, , , , version]) => Handshake(version))
);

export const handshake = async ([, version]: Handshake) => {
  console.log(`st3p version ${version} ok`);
};
