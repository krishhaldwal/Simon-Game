
var buttonColours = ["red", "blue", "green", "yellow"] ;
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;
var lose = "wrong";

var high = 0;


$(document).keypress(function(){

  if(!start){
    $("#level-title").text("Level "+level);
    nextSequence();
    start=true;
  }

});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      high = level;
      playsound(lose);
      console.log("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over ! Press any key to restart");

      $("#hs").text("Highscore = " + high);

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startover();

    }

}

function startover(){
  level =0;
  start=false;
  gamePattern = [];
  //userClickedPattern = [];
}


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var num = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[num];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomChosenColour);

}


$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  //console.log(userClickedPattern);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playsound(name){
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();

}

function animatePress(currColour){
  $("#"+currColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currColour).removeClass("pressed");
  }, 100);
}
