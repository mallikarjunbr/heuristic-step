# random-step

A tic tac toe engine that follows [ST3P](./docs/st3p.md) and makes a random
valid move every time. The name is a pun with a reference to both st3p and
random walk.

## Running

Use docker to build an image and run it in interactive pseudo-TTY mode.

```sh
docker build . -t random-step
docker run -it --memory="512m" --cpus="1.0" random-step
```
