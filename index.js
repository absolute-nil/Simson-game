$(".info-btn").on("click", function() {
  $("div.information").slideToggle();
});

var buttonColors = ["red", "blue", "green", "yellow", "voilet", "orange"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var n = 4;
$(document).keypress(function() {
  if (!started) {
    $(".start").slideToggle();
    nextSequence();
    started = true;
  }
});

$(".start").click(function() {
  if (!started) {
    $(".start").slideToggle();
    $(".levelUp").hide();
    $(".levelDown").hide();
    setTimeout(function() {
      nextSequence();
    }, 1000);
    started = true;
  }
});
$(".levelUp").click(function() {
  if (!started) {
    $(".start").hide();
    $(".levelUp").hide();
    $(".levelDown").hide();
    setTimeout(function() {
      n = n + 2;
      $(".voilet").slideToggle();
      $(".orange").slideToggle();
      nextSequence();
    }, 1000);
    started = true;
  }
});
$(".levelDown").click(function() {
  if (!started) {
    $(".start").hide();
    $(".levelUp").hide();
    $(".levelDown").hide();
    setTimeout(function() {
      n = n - 2;
      $(".voilet").slideToggle();
      $(".orange").slideToggle();
      nextSequence();
    }, 1000);
    started = true;
  }
});

$(".custbtn").click(function() {
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
  var randomNummber = Math.floor(Math.random() * n);
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
  if (n > 4) {
    $("h1").text("Game-Over! Press Any Key To Restart Or Press Start");
    $(".start").toggle();
    $(".levelDown").toggle();
    startOver();
  } else {
    if (level >= 2 && n == 4) {
      $("h1").text("congratulations! You unlocked the next level");
      $(".start").slideToggle();
      $(".levelUp").slideToggle();
      startOver();
    } else {
      $("h1").text("Game-Over! Press Any Key To Restart Or Press Start");
      $(".start").slideToggle();
      startOver();
    }
  }
}

function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false;
}
