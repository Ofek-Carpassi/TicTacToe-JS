# TicTacToe-JS

This is a customizable Tic Tac Toe game that can be played in the browser. The game board's size can be adjusted by the user at the start of each game, with a minimum size of 3x2 or 2x3 and a maximum size of 8x8.

## How to Play

1. When the game starts, you will be prompted to enter the number of rows and columns for the game board.
2. The game board will be displayed, and the first turn will be 'X'.
3. Click on a square to make a move. The 'X' and 'O' will adjust their size according to the size of the squares.
4. The game continues until one player has a line of their symbol (horizontal, vertical, or diagonal) or the board is full. If the board is full and there is no winner, the game is a draw.

## Code Overview

### JavaScript

The game logic is implemented in JavaScript. The game state is stored in the `board` array, and the current turn is stored in the `turn` variable. The `gameover` variable indicates whether the game is over.

The `startGame` function initializes a new game. It prompts the user for the board size, creates the game board, and sets up the click event listeners for the squares.

The `checkGameStatus` function checks the game status after each move. It checks the rows, columns, and diagonals for a line of the same symbol, and it also checks if the board is full.

### CSS

The game board and squares are styled using CSS. The `#board` element is a grid container, and the `#board > div` elements are the squares. The maximum width and height of the game board are set to 90% of the viewport's width and height, respectively.

## How to Run

Open the `index.html` file in your browser to start the game.