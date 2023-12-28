import { Parser, or } from "../parser";
import * as H from "./handshake";
import * as I from "./identify";
import * as M from "./move";
import * as Q from "./quit";

export type Command = H.Handshake | I.Identify | M.Move | Q.Quit;

export const parse: Parser<Command> = or(H.parse, I.parse, M.parse, Q.parse);

export const run = async (command: Command) => {
  switch (command[0]) {
    case "handshake":
      return H.handshake(command);
    case "identify":
      return I.identify(command);
    case "move":
      return M.move(command);
    case "quit":
      return Q.quit(command);
    default:
      return console.error(new Error("unknown command"));
  }
}
