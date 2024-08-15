const board = document.getElementById('game-board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';  // Current player: 'X' or 'O'
let gameActive = true;    // Indicates if the game is active

// Function to check for a win
const checkWin = () => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent;
        }
    }
    return null;
};

// Function to handle cell click
const handleClick = (event) => {
    if (!gameActive) return;

    const cell = event.target;
    if (cell.textContent) return;

    cell.textContent = currentPlayer;
    const winner = checkWin();
    if (winner) {
        message.textContent = `${winner} wins!`;
        gameActive = false;
        return;
    }

    if ([...cells].every(cell => cell.textContent)) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Function to reset the game
const resetGame = () => {
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
};

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
