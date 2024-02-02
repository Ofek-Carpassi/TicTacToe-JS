// Variables to store the game state
let board; // The game board
let turn = 'X'; // The current turn
let gameover = false; // Whether the game is over
let rows; // The number of rows in the game board
let cols; // The number of columns in the game board

// Function to start a new game
function startGame() {
    // Reset gameover and turn
    gameover = false;
    turn = 'X';

    // Loop until the user provides a valid board size
    while (true) {
        // Prompt the user for the number of rows and columns
        rows = parseInt(prompt("Enter number of rows:"));
        cols = parseInt(prompt("Enter number of columns:"));

        // Validate the input
        if (((rows >= 2 && cols >= 3) || (rows >= 3 && cols >= 2)) && rows <= 8 && cols <= 8) {
            break;
        } else {
            alert("Invalid board size. The minimum board size is 3x2 or 2x3 and the maximum is 8x8.");
        }
    }

    // Initialize the game board with null values
    board = Array(rows * cols).fill(null);

    // Create the cells of the game board
    const divs = Array.from({ length: rows * cols }, (_, i) => {
        const div = document.createElement('div');
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
}

// Add a click event listener to the reset button
document.getElementById('reset').addEventListener('click', startGame);

// Function to check the game status
function checkGameStatus() {
    // Check rows
    for (let i = 0; i < rows; i++) {
        const row = board.slice(i * cols, (i + 1) * cols);
        if (row.every((cell) => cell === 'X') || row.every((cell) => cell === 'O')) {
            gameover = true;
            message.textContent = `${row[0]} wins!`;
            return;
        }
    }

    // Check columns
    for (let i = 0; i < cols; i++) {
        const col = [];
        for (let j = 0; j < rows; j++) {
            col.push(board[i + j * cols]);
        }
        if (col.every((cell) => cell === 'X') || col.every((cell) => cell === 'O')) {
            gameover = true;
            message.textContent = `${col[0]} wins!`;
            return;
        }
    }

    // Check diagonals
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < Math.min(rows, cols); i++) {
        diag1.push(board[i * (cols + 1)]);
        diag2.push(board[(i + 1) * (cols - 1)]);
    }
    if (diag1.every((cell) => cell === 'X') || diag1.every((cell) => cell === 'O')) {
        gameover = true;
        message.textContent = `${diag1[0]} wins!`;
        return;
    }
    if (diag2.every((cell) => cell === 'X') || diag2.every((cell) => cell === 'O')) {
        gameover = true;
        message.textContent = `${diag2[0]} wins!`;
        return;
    }

    // Check if the game is a draw
    if (board.every((cell) => cell !== null)) {
        gameover = true;
        message.textContent = 'Draw!';
        return;
    }
}

// Start the game when the page loads
window.onload = startGame;