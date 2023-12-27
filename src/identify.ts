import { write } from "./write";
import { name, author, version, repository } from "../package.json";

export const identify = () => {
  write(`name ${name}`);
  write(`author ${author}`);
  write(`version ${version}`);
  write(`url ${repository.url}`);
  write('identify ok');
}
