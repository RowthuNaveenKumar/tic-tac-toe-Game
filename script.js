const boxes = document.querySelectorAll(".game-button");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector(".msg");
const newGameBtn = document.querySelector(".new-Btn");
const resetBtn = document.querySelector(".reset-button");

let turnO = true; // true for player O, false for player X
let count = 0; // Track moves to detect draws

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

// Initialize the game
const initGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Handle box clicks
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.textContent = "O";
    } else {
      box.textContent = "X";
    }
    box.disabled = true;
    count++;
    turnO = !turnO; // Switch player
    
    const isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Disable all boxes (when game ends)
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Enable all boxes (for new game)
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.textContent = "";
  });
};

// Handle draw condition
const gameDraw = () => {
  msg.textContent = "Game ended in a tie!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Show winner
const showWinner = (winner) => {
  msg.textContent = `Congratulations, winner is ${winner}!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check for winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    const pos1 = boxes[pattern[0]].textContent;
    const pos2 = boxes[pattern[1]].textContent;
    const pos3 = boxes[pattern[2]].textContent;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return true;
      }
    }
  }
  return false;
};

// Event listeners
newGameBtn.addEventListener("click", initGame);
resetBtn.addEventListener("click", initGame);

// Initialize on load
initGame();