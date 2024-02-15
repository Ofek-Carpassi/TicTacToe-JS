// Tic Tac Toe Game Script

// Variables to store the game state
let board; // The game board
let turn = 'X'; // The current turn
let gameover = false; // Whether the game is over
let rows; // The number of rows in the game board
let cols; // The number of columns in the game board
let nameOne; // Name of the first player
let nameTwo; // Name of the second player

// Function to start a new game
function startGame() {
    // Reset gameover and turn
    gameover = false;
    turn = 'X';

    // Loop until the user provides valid player names and board size
    while (true) {
        // Prompt the user for the names of the players and the number of rows and columns
        nameOne = prompt("Enter name of player 1:");
        nameTwo = prompt("Enter name of player 2:");
        rows = parseInt(prompt("Enter number of rows:"));
        cols = parseInt(prompt("Enter number of columns:"));

        // Validate player names and board size
        if (isValidPlayerName(nameOne) && isValidPlayerName(nameTwo) && isValidBoardSize(rows, cols)) {
            break;
        } else {
            alert("Invalid input. Please enter valid player names and board size.");
        }
    }

    // Initialize the game board with null values
    // The array is not 2D, but we can use the index to map the cells to a 2D grid
    board = Array(rows * cols).fill(null);

    // Create the cells of the game board
    const divs = Array.from({ length: rows * cols }, (_, i) => {
        const div = document.createElement('div'); // Create a new div element for each cell
        // Add a click event listener to each cell
        div.addEventListener('click', () => {
            // Ignore the click if the game is over or the cell is not empty
            if (gameover || board[i]) return;
            // Update the game board and the cell text with the current turn
            board[i] = turn;
            div.textContent = turn;
            // Adjust the font size based on the size of the square
            div.style.fontSize = `${Math.min(div.offsetWidth, div.offsetHeight) * 0.6}px`;
            // Switch the turn
            turn = turn === 'X' ? 'O' : 'X';
            // Check the game status
            checkGameStatus();
        });
        return div;
    });

    // Get the game board element and clear it
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    // Set the grid layout of the game board
    boardElement.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;
    // Add the cells to the game board
    boardElement.append(...divs);

    // Get the game status message element and clear it
    message = document.getElementById('message');
    message.textContent = '';

    // Start the game by displaying the current player's name
    updateCurrentPlayerName();
}

// Function to check if a player name is valid
function isValidPlayerName(name) {
    return name && name.trim() !== ''; // Check if the name is not empty or whitespace
}

// Function to check if the board size is valid
function isValidBoardSize(rows, cols) {
    return ((rows >= 2 && cols >= 3) || (rows >= 3 && cols >= 2)) && rows <= 8 && cols <= 8;
}

// Function to update the current player's name
function updateCurrentPlayerName() {
    // Display the current player's name
    const currentPlayerName = turn === 'X' ? nameOne : nameTwo;
    document.getElementById('player').textContent = `Current Player: ${currentPlayerName}`;
}

// Add a click event listener to the reset button
document.getElementById('reset').addEventListener('click', startGame);

// Function to check the game status
function checkGameStatus() {
    // Check rows, columns, and diagonals for a win
    if (checkForWin()) return;

    // Check if the game is a draw
    // If the board is full and there is no winner, the game is a draw (there is no winner if we reach this point)
    if (board.every((cell) => cell !== null)) {
        gameover = true;
        message.textContent = 'Draw!';
        return;
    }

    // Update the current player's name after each move
    updateCurrentPlayerName();
}

// Function to check for a win in rows, columns, and diagonals
function checkForWin() {
    // Check rows
    for (let i = 0; i < rows; i++) {
        const row = board.slice(i * cols, (i + 1) * cols); // Get a row of the game board
        if (row.every((cell) => cell === 'X') || row.every((cell) => cell === 'O')) {
            declareWinner(row[0]);
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < cols; i++) {
        const col = [];
        for (let j = 0; j < rows; j++) {
            col.push(board[i + j * cols]);
        }
        if (col.every((cell) => cell === 'X') || col.every((cell) => cell === 'O')) {
            declareWinner(col[0]);
            return true;
        }
    }

    // Check diagonals
    if (rows === cols) {
        const diag1 = [];
        const diag2 = [];
        for (let i = 0; i < Math.min(rows, cols); i++) {
            diag1.push(board[i * (cols + 1)]);
            diag2.push(board[(i + 1) * (cols - 1)]);
        }
        if (diag1.every((cell) => cell === 'X') || diag1.every((cell) => cell === 'O')) {
            declareWinner(diag1[0]);
            return true;
        }
        if (diag2.every((cell) => cell === 'X') || diag2.every((cell) => cell === 'O')) {
            declareWinner(diag2[0]);
            return true;
        }
    }

    return false;
}

// Function to declare a winner
function declareWinner(winner) {
    gameover = true;
    const currentPlayerName = winner === 'X' ? nameOne : nameTwo;
    message.textContent = `${winner} wins! ${currentPlayerName} wins!`;
}

// Start the game when the page loads
window.onload = startGame;