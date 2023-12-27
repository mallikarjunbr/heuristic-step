# ST3P

Simple Tic Tac Toe Protocol

## Overview

ST3P is a text-based protocol facilitating communication between Tic-Tac-Toe
engines and UI/coordinator processes.

The protocol operates over standard input and output, supporting standalone
native processes.

## Versioning

The protocol supports versioning to ensure compatibility and facilitate updates.

Initial handshake involves the UI/coordinator and the engine agreeing on the
protocol version. The versions are expected to be backwards compatible.

## Protocol

The protocol is line-based, with each line representing a single command. The
protocol is expected to be case-sensitive, with lowercase taking precedence
It's text-based for readability and is designed to be backwards-compatible.

If the engine or coordinator receives an unknown or unexpected command or token
it is expected to ignore it and continue parsing the rest of the string.

The engine should always be able to process input from `stdin`, even while
thinking.

In all following examples, `>` is from ui/coordinator to engine, and `<` is
from engine to ui/coordinator. All lines are terminated with a `\n` (LF).

### Handshake

Upon booting the engine, the UI/coordinator shares the protocol name and
version, to which the engine responds with an acknowledgement of the name and
version with an `ok`. Note that even if the version of the engine is much higher
it has to respond and operate at the same level as the UI / coordinator. As the
protocol is backwards compatible this should not be an issue.

```sh
> st3p version 1
< st3p version 1 ok
```

### Engine Identification

The UI/coordinator can optionally request engine details using the `identify`
command, to which the engine responds with its name, author, version, and any
relevant URL. These are sent in separate lines so after the keys the string is
taken as is. After sending all details for identification the engine sends
`identify ok`.

```sh
> identify
< name random-step
< author hello@artful.dev
< version 1.0.0
< url https://github.com/artfuldev/random-step
< identify ok
```

### Gameplay

The UI/coordinator sends a `move` command to the engine, with the current state
of the game in [T3EN](./t3en.md) format. This describes the board and the side
to move. The engine is expected to respond with the `best <move>`.

If the engine fails to respond (or within the constraints), or responds with an
invalid move, the game is lost.

There are a few optional options:

* `time ms:<x>` - The move should be played in `<x>` milliseconds. If the engine
does not respond with a `best <move>` within this time, the game is lost.
* `time-remaining ms:<x>` - The game should be played in `<x>` milliseconds by
the side to play. The engine can use a portion of the time as determined by it
for this move. Time-based wins apply.

#### Move Specification

The move is specified as a string of the form `<x><y>` where `x` is the column
name (from left to right) and `y` is the row number (1-indexed, from top to
bottom). This is akin to a spreadsheet. The row-numbers are natural numbers and
the column names go from `a` to `z` and then `aa` to `zz` and so on.

As an example the top-left cell of a standard 3x3 board is `a1` and the bottom-right cell is `c3`.

For a larger 27x27 board, the top-left cell is `a1` and the bottom-right cell is `aa27`.

```sh
> move 3_/3_/3_ x
< best b2
```

```sh
> move 3_/_X_/3_ o
< best c3
```

```sh
> move 3_/3_/3_ x time ms:1000
< best b2
```

```sh
> move 3_/3_/3_ x time-remaining ms:10000
< best b2
```

### Termination

The `quit` command is used by the UI/coordinator to terminate the engine
session. The engine should exit as soon as possible, cleaning up any resources
used.

```sh
> quit
```

## Acknowledgements

The protocol is inspired by the [UCI protocol](https://en.wikipedia.org/wiki/Universal_Chess_Interface).
