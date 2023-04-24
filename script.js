const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');

let currentPlayer = 'X';

board.addEventListener('click', (e) => {
  if (!e.target.matches('.cell')) return;

  const cell = e.target;

  if (cell.textContent) return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    setTimeout(() => {
      alert(`${currentPlayer} wins!`);
      resetBoard();
    }, 100);
    return;
  }

  if (checkDraw()) {
    setTimeout(() => {
      alert("It's a draw!");
      resetBoard();
    }, 100);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
});

function checkWin(player) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winConditions.some((condition) => {
    return condition.every((index) => {
      return cells[index].classList.contains(player);
    });
  });
}

function checkDraw() {
  return [...cells].every((cell) => {
    return cell.textContent !== '';
  });
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });

  currentPlayer = 'X';
}
