let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".newGame");
let turnX = true;
let msgBox = document.querySelector(".msg-box");
let buttonsClicks = 0;
let winnerFound = false;
let form = document.querySelector("#nameForm");
let nameX = "X";
let nameO = "O";

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const nameInputX = document.getElementById("name1");
  const nameInputO = document.getElementById("name2");

  nameX = nameInputX.value;
  nameO = nameInputO.value;
});

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//disabling the buttons in case of winner or draw
const disableButtons = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

//enabling the buttons in new game
const enableButtons = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    buttonsClicks = 0;
    winnerFound = false;
    turnX = true;
    box.classList.remove("circle-selected");
    box.classList.remove("cross-selected");
  });
};

//adding event listeners to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerHTML = "<i class='fa-solid fa-xmark'></i>";
      box.classList.add("cross-selected");
      turnX = false;
    } else {
      box.innerHTML = "<i class='fa-regular fa-circle'></i>";
      box.classList.add("circle-selected");
      turnX = true;
    }
    box.disabled = true;
    buttonsClicks++;
    checkWinner();
    checkDraw();
  });
});

//checking for winner on each click
const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pos1 = boxes[pattern[0]].innerHTML;
    let pos2 = boxes[pattern[1]].innerHTML;
    let pos3 = boxes[pattern[2]].innerHTML;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        //wiinner found
        winnerFound = true;
        if (turnX) {
          msgBox.innerText = `Winner is ${nameO}`;
        } else {
          msgBox.innerText = `Winner is ${nameX}`;
        }
        //disable all buttons to stop the game
        disableButtons();
      }
    }
  }
};

//checking for draw
const checkDraw = () => {
  if (buttonsClicks === 9 && winnerFound === false) {
    msgBox.innerText = "Game Draw. Start Again";
    disableButtons();
  }
};

//buttons for resetting the game
resetBtn.addEventListener("click", () => {
  enableButtons();
  msgBox.innerText = "";
});

newGameBtn.addEventListener("click", () => {
  enableButtons();
  msgBox.innerText = "";
});
