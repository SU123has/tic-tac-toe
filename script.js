let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".newGame");
let turnX = true;
let msgBox = document.querySelector(".msg-box");
let buttonsClicks = 0;
let winnerFound = false;
let form = document.querySelector("#nameForm");
let nameX = "X"; //default names
let nameO = "O";
let nameSubmitted = false; //to check if names of players have been entered or not

let pos1,
  pos2,
  pos3 = null; //initial winning positions, used to later highlight boxes

//to clear message Box
const clearMsgBox = () => {
  msgBox.innerText = "";
};

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const nameInputX = document.getElementById("name1");
  const nameInputO = document.getElementById("name2");

  nameX = nameInputX.value;
  nameO = nameInputO.value;

  nameSubmitted = true;
  //clear message box if not clear
  clearMsgBox();

  if (buttonsClicks > 0) {
    msgBox.innerText = "Can't change names mid-game";
  }
});

//winning patterns
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

const colorBoxes = (pos1, pos2, pos3) => {
  boxes[pos1].classList.add("winning-box");
  boxes[pos2].classList.add("winning-box");
  boxes[pos3].classList.add("winning-box");
};

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
    box.classList.remove("winning-box"); //removes highlight of winning boxes
    pos1 = pos2 = pos3 = null; //reset winning boxes
  });
};

//adding event listeners to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX && nameSubmitted) {
      box.innerHTML = "<i class='fa-solid fa-xmark'></i>";
      box.classList.add("cross-selected");
      turnX = false;
      box.disabled = true;
      buttonsClicks++;
      checkWinner();
      checkDraw();
    } else if (!turnX && nameSubmitted) {
      box.innerHTML = "<i class='fa-regular fa-circle'></i>";
      box.classList.add("circle-selected");
      turnX = true;
      box.disabled = true;
      buttonsClicks++;
      checkWinner();
      checkDraw();
    } else {
      msgBox.innerText = "";
      msgBox.innerText = "Please enter names!";
    }
  });
});

//checking for winner on each click
const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pos1Val = boxes[pattern[0]].innerHTML;
    let pos2Val = boxes[pattern[1]].innerHTML;
    let pos3Val = boxes[pattern[2]].innerHTML;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        (pos1 = pattern[0]), (pos2 = pattern[1]), (pos3 = pattern[2]);
        //wiinner found
        winnerFound = true;
        if (turnX) {
          msgBox.innerText = `Congratulatins!!\n${nameO} wins`;
        } else {
          msgBox.innerText = `Congratulatins!!\n${nameX} wins`;
        }
        //disable all buttons to stop the game
        disableButtons();
        colorBoxes(pos1, pos2, pos3);
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
  clearMsgBox();
});

newGameBtn.addEventListener("click", () => {
  enableButtons();
  clearMsgBox();
  nameX = "X";
  nameO = "O";
  nameSubmitted = false;
  //remove names from input field
  document.getElementById("name1").value = "";
  document.getElementById("name2").value = "";
});
