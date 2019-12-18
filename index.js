$(".info-btn").on("click", function() {
  $("div.information").toggle();
});

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level: " + level);
  var randomNummber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNummber];
  gamePattern.push(randomColor);
  playSound(randomColor);
  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name) {
  $("#" + name)
    .addClass("pressed")
    .delay(100)
    .queue(function() {
      $(this)
        .removeClass("pressed")
        .dequeue();
    });
}

function gameOver() {
  $("body")
    .addClass("game-over")
    .delay(200)
    .queue(function() {
      $("body")
        .removeClass("game-over")
        .dequeue();
    });
  $("h1").text("Game-Over! Press Any Key To Restart");
  startOver();
}

function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false;
}
