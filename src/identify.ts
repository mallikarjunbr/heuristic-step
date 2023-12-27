import { write } from "./write";
import { version } from "../package.json";

export const identify = () => {
  write('name random-step');
  write('author artfuldev<hello@artful.dev>');
  write(`version ${version}`);
  write('url https://github.com/artfuldev/random-step');
  write('identify ok');
}
