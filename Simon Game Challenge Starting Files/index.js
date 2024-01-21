var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []
var userClickedPattern = []

var level = 0
var started = false;

$(document).on("keydown", function(){
    if (!started){
        started = true; 
        nextSequence();
    }
})


$(".btn").on("click", function(){

    var userChoseColour = $(this).attr("id");
    userClickedPattern.push(userChoseColour); 

    animatePress(userChoseColour);
    playSound(userChoseColour);

    checkAnswers(userClickedPattern.length-1);
})

function nextSequence(){
    level += 1;
    userClickedPattern = []

    $("h1").html("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(color){
    var audio = new Audio('./sounds/'+color+'.mp3');
    audio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game-Over! Press any key to start over");
    resetGame();
}

function resetGame(){
    gamePattern = []
    level = 0
    started = false;
}

function checkAnswers(level){
    if(gamePattern[level] == userClickedPattern[level]){
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}