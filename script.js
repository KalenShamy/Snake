/* Created by Kalen Shamy */

var apple = [0,0];
var snake = [[3,4],[2,4],[1,4]];
var direction = "Right";

var moves = 0;

var nextMove = "";
var gameRun = true;

var ateApple = false;

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
  moves += 1;
  var temp = [snake[0][0], snake[0][1]];
  if (direction == "Up") snake[0][1] -= 1;
  else if (direction == "Left") snake[0][0] -= 1;
  else if (direction == "Right") snake[0][0] += 1;
  else if (direction == "Down") snake[0][1] += 1;

  if (!snakeOnBoard()) {
    gameRun = false;
    document.getElementById("gameOver").style.visibility = "visible";
    document.getElementById("snakeLength").innerText = "Length: " + snake.length;
    document.getElementById("skill").innerText = "Skill: " + Math.round((snake.length/moves)*1000*((snake.length-3)/97)*100)/100 + "%";
  } else {
    if (ateApple) {
      var length = snake.length
      for (var i = 1; i <= length; i++) {
        if (i == snake.length) snake[i] = temp;
        else {
          var temp2 = snake[i];
          snake[i] = temp;
          temp = temp2;
        }
        ateApple = false;
      }
    } else {
      for (var i = 1; i < snake.length; i++) {
        var temp2 = snake[i];
        snake[i] = temp;
        temp = temp2;
      }
    }
    drawSnake();
    if (appleInSnake()) {
      newApple();
      ateApple = true;
    }
    if (nextMove != "") {
      direction = nextMove;
      nextMove = "";
    }
  }
}

window.onresize = (event) => {
  updateSize();
};

function keypress(event) {
  if (event.defaultPrevented || (gameRun == false && event.key != "r" && event.key != "R")) {
    return; // Do nothing if the event was already processed
  }
  switch (event.key) {
    case "ArrowUp":
    case "w":
    case "W":
      if (direction == "Right" || direction == "Left") {
        if (nextMove == "") {
          direction = "Up";
          nextMove = "Up";
        } else {
          nextMove = "Up";
        }
      }
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      if (direction == "Up" || direction == "Down") {
        if (nextMove == "") {
          direction = "Left";
          nextMove = "Left";
        } else {
          nextMove = "Left";
        }
      }
      break;
    case "ArrowRight":
    case "d":
    case "D":
      if (direction == "Up" || direction == "Down") {
        if (nextMove == "") {
          direction = "Right";
          nextMove = "Right";
        } else {
          nextMove = "Right";
        }
      }
      break;
    case "ArrowDown":
    case "s":
    case "S":
      if (direction == "Right" || direction == "Left") {
        if (nextMove == "") {
          direction = "Down";
          nextMove = "Down";
        } else {
          nextMove = "Down";
        }
      }
      break;
    case "r":
    case "R":
      window.location = "https://kalenshamy.github.io/Snake/";
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}

function controlsVisible() {
  document.getElementById("controlsButton").style.display = "none";
  for (var i = 0; i < document.getElementsByTagName("span").length; i++) {
    document.getElementsByTagName("span")[i].style.display = "flex";
    document.getElementsByTagName("span")[i].style.justifyContent = "center";
  }
}

window.addEventListener("keydown", keypress, true);

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
    await sleep(300);
    step();
  }
}
