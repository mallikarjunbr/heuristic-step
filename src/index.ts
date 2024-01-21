import { app } from "./app";
import { exit } from "./framework/exit";
import { run } from "./framework/run";
import { stderr } from "./framework/stderr";
import { stdin } from "./framework/stdin";
import { stdout } from "./framework/stdout";

run(app, {
  stdin,
  stdout,
  stderr,
  exit,
});
