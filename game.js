let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0

$(document).keypress(function(){
    if (!started) {
        nextSquence();
        started = true;
    }
});

$(".btn").click(function(){
    let useChosenColour = $(this).attr("id");
    userClickedPattern.push(useChosenColour);
    playSound(useChosenColour);
    animatedPressed(useChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSquence() {
    level++
    $("#level-title").text("level " + level)
    let randomNumber = Math.round(Math.random()*3);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern = [];
};

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatedPressed(currentColour) {
    $("#"+currentColour).click(function(){
        let self = $(this);
        self.addClass("pressed")
        setTimeout(function(){
            self.removeClass("pressed");
        }, 100);
    });
};

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSquence();
            }, 1000);
        }
        
    }
    else{
        playSound("wrong")
        let self = $("body");
        self.addClass("game-over");
        setTimeout(() => {
            self.removeClass("game-over")
        }, 200); 
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver() {
    level = 0 
    gamePattern = []
    started = false
}