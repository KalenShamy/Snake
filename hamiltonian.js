/* Created by Kalen Shamy */

var apple = [0,0];
var snake = [[2,0],[1,0],[0,0]];
var direction = "Right";

var hamiltonianCycle = [
  [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],
  [9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9],
  [8,9],[8,8],[8,7],[8,6],[8,5],[8,4],[8,3],[8,2],[8,1],
  [7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8],[7,9],
  [6,9],[6,8],[6,7],[6,6],[6,5],[6,4],[6,3],[6,2],[6,1],
  [5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],
  [4,9],[4,8],[4,7],[4,6],[4,5],[4,4],[4,3],[4,2],[4,1],
  [3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],
  [2,9],[2,8],[2,7],[2,6],[2,5],[2,4],[2,3],[2,2],[2,1],
  [1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],
  [0,9],[0,8],[0,7],[0,6],[0,5],[0,4],[0,3],[0,2],[0,1],
];

var nextMove = "";
var gameRun = true;

var ateApple = false;
var score = 0;

function randomNumber(min, max) {
    return Math.round(Math.random()*(max-min)+min)
}

function updateChecker() {
  for (var i = 0; i < document.getElementsByClassName("square").length; i++) {
    if ((i + Math.floor(i/10))%2 == 0) document.getElementsByClassName("square")[i].style.background = "rgb(20,20,20)";
    else document.getElementsByClassName("square")[i].style.background = "rgb(15,15,15)";
  }
}

function appleInSnake() {
  var inSnake = false;
  for (var i = 0; i < snake.length; i++) {
    if (snake[i][0] == apple[0] && snake[i][1] == apple[1]) inSnake = true;
  }
  return inSnake;
}

function snakeOnBoard() {
  var snakeInSnake = false;
  if (snake[0][0] < 0 || snake[0][0] > 9 || snake[0][1] < 0 || snake[0][1] > 9) return false;
  for (var i = 1; i < snake.length; i++) {
    if (snake[i][0] == snake[0][0] && snake[i][1] == snake[0][1]) snakeInSnake = true;
  }
  return !snakeInSnake;
}

function updateSize() {
  width = outerWidth;
  height = outerHeight;
  if (innerWidth < width) width = innerWidth;
  if (innerHeight < height) height = innerHeight;
  if (width <= height) {
    document.getElementById("snake").style.width = width*0.75 + "px";
    document.getElementById("snake").style.height = width*0.75 + "px";
    document.getElementById("gameOver").style.width = width*0.75 + "px";
    document.getElementById("gameOver").style.height = width*0.75 + "px";
  } else {
    document.getElementById("snake").style.width = height*0.75 + "px";
    document.getElementById("snake").style.height = height*0.75 + "px";
    document.getElementById("gameOver").style.width = height*0.75 + "px";
    document.getElementById("gameOver").style.height = height*0.75 + "px";
  }

  for (var i = 0; i < document.getElementsByClassName("square").length; i++) {
    if (width <= height) {
      document.getElementsByClassName("square")[i].style.width = 0.095*(width*0.75) + "px";
      document.getElementsByClassName("square")[i].style.height = 0.095*(width*0.75) + "px";
      document.getElementsByClassName("square")[i].style.margin = "0 " + 0.0055*(width*0.75) + "px " + 0.0055*(width*0.75) + "px " + " 0";
    } else {
      document.getElementsByClassName("square")[i].style.width = 0.095*(height*0.75) + "px";
      document.getElementsByClassName("square")[i].style.height = 0.095*(height*0.75) + "px";
      document.getElementsByClassName("square")[i].style.margin = "0 " + 0.0055*(height*0.75) + "px " + 0.0055*(height*0.75) + "px " + " 0";
    }
  }
}

function newApple() {
  if (snake.length == 100) return;
  apple = [randomNumber(0,9), randomNumber(0,9)];
  while (appleInSnake()) {
    apple = [randomNumber(0,9), randomNumber(0,9)];
  }
  document.getElementById(apple[0] + "_" + apple[1]).style.background = "red";
}

function drawSnake() {
  updateChecker();
  document.getElementById(apple[0] + "_" + apple[1]).style.background = "red";
  for (var i = 0; i < snake.length; i++) {
    var pos = snake[i];
    document.getElementById(pos[0] + "_" + pos[1]).style.background = "green";
  }
}

function step() {
  var isNextSquare = false;
  for (var i = 0; i < hamiltonianCycle.length; i++) {
    var square = hamiltonianCycle[i];
    if (isNextSquare == true) {
      isNextSquare = false;
      if (ateApple) {
        snake.reverse();
        snake[snake.length] = square;
        snake.reverse();
        newApple();
        ateApple = false;
      } else {
        snake.pop();
        snake.reverse();
        snake[snake.length] = square;
        snake.reverse();
      }
      break;
    }
    if (square[0] == snake[0][0] && square[1] == snake[0][1]) {
      isNextSquare = true;
    }
    if (isNextSquare == true && i == 99) {
      if (ateApple) {
        snake.reverse();
        snake[snake.length] = hamiltonianCycle[0];
        snake.reverse();
        newApple();
        ateApple = false;
      } else {
        snake.pop();
        snake.reverse();
        snake[snake.length] = hamiltonianCycle[0];
        snake.reverse();
      }
    }
  }

  drawSnake();

  if (snake.length == 100) {
    gameRun = false;
    document.getElementById("gameOver").style.visibility = "visible";
    document.getElementById("snakeLength").innerText = "Length: " + snake.length;
    document.getElementById("score").innerText = "Score: " + score;
  } else {
    if (appleInSnake()) {
      ateApple = true;
      score += 1;
    }
    if (nextMove != "") {
      direction = nextMove;
      nextMove = "";
    }
  }
}

updateSize();
updateChecker();

newApple();
drawSnake();

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
async function play() {
  while (gameRun) {
    document.getElementById("playGame").style.display = "none";
    await sleep(10);
    step();
  }
}
