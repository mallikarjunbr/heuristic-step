import { filter, map, mergeWith, of, switchMap } from "rxjs";
import { ParseFailure, ParseSuccess } from "./parser";
import { Command, run, parse } from "./st3p";
import { Sources } from "./sources";
import { Sinks } from "./sinks";

export const app = ({ stdin: { line$ } }: Sources): Sinks => {
  const parsed$ = line$.pipe(map(parse));
  const command$ = parsed$.pipe(
    filter((x) => x.type === "success"),
    map((x) => (x as ParseSuccess<Command>).parsed)
  );
  const execute$ = command$.pipe(switchMap((command) => of(run(command))));
  return {
    stderr: parsed$.pipe(
      filter((x) => x.type === "failure"),
      map((x) => (x as ParseFailure).reason),
      mergeWith(execute$.pipe(switchMap((x) => x.stderr)))
    ),
    stdout: execute$.pipe(switchMap((x) => x.stdout)),
    exit: execute$.pipe(switchMap((x) => x.exit)),
  };
};
