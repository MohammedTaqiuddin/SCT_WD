let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let mode = "human"; // 'human' or 'computer'

const statusDisplay = document.getElementById("status");
const boardElement = document.getElementById("board");

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// Initialize game board
function drawBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.textContent = cell;
    div.addEventListener("click", handleCellClick);
    boardElement.appendChild(div);
  });
}

// Handle a cell click
function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  drawBoard();

  if (checkWin(currentPlayer)) {
    statusDisplay.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  } else if (!board.includes("")) {
    statusDisplay.textContent = "It's a tie!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (mode === "computer" && currentPlayer === "O") {
    setTimeout(computerMove, 300);
  } else {
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Basic computer move (random empty cell)
function computerMove() {
  let emptyIndexes = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  if (emptyIndexes.length === 0) return;

  const move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  board[move] = "O";
  drawBoard();

  if (checkWin("O")) {
    statusDisplay.textContent = "Computer wins!";
    gameActive = false;
    return;
  } else if (!board.includes("")) {
    statusDisplay.textContent = "It's a tie!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
  return winningCombos.some(combo =>
    combo.every(index => board[index] === player)
  );
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  drawBoard();
}

function setMode(selectedMode) {
  mode = selectedMode;
  resetGame();
  statusDisplay.textContent = `Mode: ${mode === "computer" ? "Vs Computer" : "2 Players"}`;
}
