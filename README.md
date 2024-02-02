# random-step

A tic tac toe engine that follows
[ST3P](https://gist.github.com/artfuldev/47ef277cf4bbbfdf0eed4750b8821c8c) and
makes a random valid move every time. The name is a pun with a reference to both
st3p and random walk.

## Running

Use docker to build an image and run it in interactive pseudo-TTY mode.

```sh
docker build . -t random-step
docker run -it --memory=512m --cpus=1.0 --network=none random-step
```
