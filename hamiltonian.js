/* Created by Kalen Shamy */

var apple = [0,0];
var snake = [[2,0],[1,0],[0,0]];
var direction = "Right";

var moves = 0;

var hamiltonianCycle = [ // haha didnt wanna write a function to find it so i did it myself :)
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

var nextStep = false;
var gameRun = true;

var ateApple = false;

function randomNumber(min, max) {
    return Math.round(Math.random()*(max-min)+min)
}

function lean(percent) { // pity points to noobs & buzzoff to pros
  return 1/(1+Math.pow(Math.E, -5*(percent) + 2));
}

function skill(moves, length) { // needs improvement butttttt its fiiiiiiinnneeeeeee
  return Math.round(lean((2*length/moves*1000)/100)*100*((length-3)/97)*100)/100;
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

function squareInSnake(square) {
  var inSnake = false;
  for (var i = 0; i < snake.length; i++) {
    if (snake[i][0] == square[0] && snake[i][1] == square[1]) inSnake = true;
  }
  return inSnake;
}

function snakeOnBoard(ateApple) {
  var snakeInSnake = false;
  if (snake[0][0] < 0 || snake[0][0] > 9 || snake[0][1] < 0 || snake[0][1] > 9) return false;
  var snakeLength; // yay now snake doesnt die if sniffing its tail
  if (ateApple) snakeLength = snake.length; // ^^
  else snakeLength = snake.length-1; // ^^
  for (var i = 1; i < snakeLength; i++) {
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
    if (i == snake.length-1) document.getElementById(pos[0] + "_" + pos[1]).style.background = "rgb(0,75,0)";
    else if (i == 0) document.getElementById(pos[0] + "_" + pos[1]).style.background = "rgb(0,175,0)";
    else document.getElementById(pos[0] + "_" + pos[1]).style.background = "green";
  }
}

function step() {
  moves += 1;

  if (nextStep != false) {
    if (ateApple) {
      snake.reverse();
      snake[snake.length] = nextStep;
      snake.reverse();
      newApple();
    } else {
      snake.pop();
      snake.reverse();
      snake[snake.length] = nextStep;
      snake.reverse();
    }
    nextStep = false;
  } else {
    var isNextSquare = false;

    for (var i = 0; i < hamiltonianCycle.length; i++) {
      var square = hamiltonianCycle[i];
      var lastSquare;
      if (i == 0) lastSquare = hamiltonianCycle[hamiltonianCycle.length-1];
      else lastSquare = hamiltonianCycle[i-1];
      if (isNextSquare == true) {
        if (square[1] == 9 && square[0]%2==0 && square[0] > 1 && (apple[1] == 0 || (apple[0] != square[0]-1 && apple[0] != square[0])) && !squareInSnake([square[0]-1,9])) {
          isNextSquare = false;
          if (ateApple) {
            snake.reverse();
            snake[snake.length] = [square[0],9];
            snake.reverse();
            newApple();
          } else {
            snake.pop();
            snake.reverse();
            snake[snake.length] = [square[0],9];
            snake.reverse();
          }
          nextStep = [square[0]-1,9];
          break;
        } else if (square[0]%2==0 && square[0] > 0 && square[1] != 0 && apple[1] == lastSquare[1] && !squareInSnake([square[0]-1,square[1]]) && snake.length < 50) {
          isNextSquare = false;
          if (ateApple) {
            snake.reverse();
            snake[snake.length] = [lastSquare[0]-1,lastSquare[1]];
            snake.reverse();
            newApple();
          } else {
            snake.reverse();
            snake[snake.length] = [lastSquare[0]-1,lastSquare[1]];
            snake.reverse();
          }
        } else {
          isNextSquare = false;
          if (ateApple) {
            snake.reverse();
            snake[snake.length] = square;
            snake.reverse();
            newApple();
          } else {
            snake.pop();
            snake.reverse();
            snake[snake.length] = square;
            snake.reverse();
          }
          break;
        }
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
        } else {
          snake.pop();
          snake.reverse();
          snake[snake.length] = hamiltonianCycle[0];
          snake.reverse();
        }
      }
    }
  }

  drawSnake();

  if (snake.length == 100 || !snakeOnBoard(ateApple)) {
    gameRun = false;
    document.getElementById("gameOver").style.visibility = "visible";
    document.getElementById("snakeLength").innerText = "Length: " + snake.length;
    document.getElementById("skill").innerText = "Skill: " + skill(moves, snake.length) + "%";
  } else {
    ateApple = false;
    if (appleInSnake()) {
      ateApple = true;
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
