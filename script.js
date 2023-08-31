const grid = document.getElementById("wrapper"); // getting a main wrapper
const cell = document.getElementsByClassName("cell"); // getting all cells
const currentPlayer = document.getElementById("current-player"); // getting an empty block to customize an information about current player

let player = "x";
const winConditions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// creating all cells
for (let i = 1; i < 10; i++) {
  grid.innerHTML += "<div class='cell' pos = " + i + "></div>";
}

// add a clicks for each cell
for (let i = 0; i < cell.length; i++) {
  cell[i].addEventListener("click", cellClick, false);
}

// creating a function for cell-click
function cellClick() {
  // array with players data
  const data = [];

  // this is the condition wich checking is field an empty?
  if (!this.innerHTML) {
    this.innerHTML = player;
  } else {
    alert("cell is occupied");
    return;
  }

  // add a data inside of array "database"
  for (let i in cell) {
    if (cell[i].innerHTML == player) {
      data.push(parseInt(cell[i].getAttribute("pos")));
    }
  }

  // winner announcement
  if (isWin(data)) {
    restartGame("You won : " + "player " + player);
  } else {
    // case of draw logic
    let draw = true;
    for (let i in cell) {
      if (cell[i].innerHTML == "") draw = false;
    }
    if (draw) {
      alert("This is the draw");
    }
  }

  //following the sequence of moves in the game
  player = player == "x" ? "o" : "x";

  currentPlayer.innerHTML = player.toUpperCase();
}

//
function isWin(data) {
  for (let i in winConditions) {
    let win = true;
    for (let j in winConditions[i]) {
      const id = winConditions[i][j];
      const index = data.indexOf(id);

      if (index == -1) {
        win = false;
      }
    }

    if (win) return true;
  }
  return false;
}

// this function defines end of the game do fields epty and announce a winner
function restartGame(text) {
  alert(text);
  for (let i = 0; i < cell.length; i++) {
    cell[i].innerHTML = "";
  }
}
