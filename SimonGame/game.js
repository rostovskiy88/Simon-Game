var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;

//доделать: сделать так, чтобы последовательность играла сначала в кажом новом уровне

// game start on key press
$(document).keypress(function () {
    if (!started) {
        setTimeout(function () {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }, 500);
    }
});


// plays button on click and chekcs pattern 
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

// compare clicks and pattern 
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

        /* 
        Мое решение - вызов функции gameOver,  
        в  ней описано все что надо делать, когда проиграл,
        т.е. в else {} пишется только:
            console.log("wrong");
           gameOver(); --> функция закоменчена ниже        
        */
    }

};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};


/*
// triggers when you click wrong button and  starts  new game
function gameOver() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    started = false;
};
*/


// adds new level and increase level in heading
var level = 0;

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}