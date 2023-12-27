# T3EN

Tic-Tac-Toe Extensible Notation

## Overview

T3EN is a notation system designed to represent the state of a Tic-Tac-Toe
board for various board configurations, including standard and non-standard
shapes.

It uses a combination of symbols to represent playable and non-playable cells,
player moves, and the structure of the board, along with the side whose turn it
is to play.

It is designed to balance readability, consistency, and efficiency.

## Notation Elements

* `_` (underscore): Represents a playable cell.
* `.` (dot): Represents a non-playable cell.
* `x`, `o`: Represent player moves (lowercase).
* `/` (slash): Used as a row delimiter.

## Encoding

T3EN employs variable-length encoding to efficiently encode consecutive cells
of the same type, which is common in tic-tac-toe. For example, `3_` represents
3 playable cells. The numeric prefix is only used when more than 1 cell of the
same type repeats, and only in the span of a single row.

## Notation

The board state is followed by a space and the lowercase letter representing
the player to move (x or o).

Bear in mind that T3EN is extensible therefore supports non-standard variants
of tic-tac-toe with non-standard board shapes (other than typical square grids
with all playable cells).

### Examples

`3_/3_/3_ x` - A standard 3x3 empty board with x to move. This is also the
starting position of a standard tic-tac-toe game.

`3_/_x_/3_ o` - After `x` plays in the center from the previous empty board,
with `o` ready to play.

`2_o/_x_/3_ x` - After `o` plays in the top right on the previous board played
by `x`, with `x` set to play.

`.3_./5_/.3_./5_/.3_. o` - An hourglass shaped board, with some unplayable
cells, and `o` to move.

## Acknowledgements

This notation is inspired by the [Forsyth-Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation),
with special considerations applied to enable scaling to larger board sizes and
simplified for tic-tac-toe.
