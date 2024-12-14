const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = Array(9).fill('');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            cells.forEach(cell => cell.classList.add('taken'));
            return true;
        }
    }
    if (!board.includes('')) {
        statusText.textContent = 'It\'s a draw!';
        return true;
    }
    return false;
}

function restartGame() {
    board.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!board[index]) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add('taken');
            if (!checkWin()) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                statusText.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    });
});

restartButton.addEventListener('click', restartGame);
