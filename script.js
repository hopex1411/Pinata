var thePinata, pinataTimer;
var pinataClickCount = 0;
var gameActive, highscore, timeLeft;

$(document).ready(function() {
  
  //clear out play again button
  $('.play-again').hide();
  
  //get a pinata variable
  thePinata = $('.pinata').clone();
  
  //game elements
  timeLeft = 10;
  gameActive = false;
  highscore = 0;

  //handle a click / touch
  $('.pinata-wrapper').on('click', '.pinata.new', function() {
    if (gameActive === false) {
      gameActive = true;
      timeLeft = 10;
      pinataClickCount = 0;
      pinataTimer = setInterval(function(){ timer(); }, 1000);
    }      
    pinataExplode();
  });
  
  //handle playagain click 
  $('.play-again').on('click', function() {
    $('.play-again').hide();
    $('.pinata-wrapper').show();
    $('.pinata-shadow').show();
    $('.timer').html("Smash to Start!");
  });

});

function pinataExplode() {
  pinataClickCount ++;
  $('.counter').html(pinataClickCount);
  $('.container').css('background-color', randomColor());
  $('.pinata')
    .removeClass('new')
    .addClass('animate explode old')
    .attr( 'date', Date.now() )
    .bind('animationend', function() { $(this).remove(); });
  thePinata.css('fill', randomColor());
  $('.pinata-wrapper').append(thePinata.clone());
}

function stopTimer() {
    clearInterval(pinataTimer);
  }

//time logic
function timer() {
  if (timeLeft > 0) {
    timeLeft--;
    $('.timer').html(timeLeft + " seconds");
  } else if (timeLeft <= 0) {
    gameActive = false;
    stopTimer();
    $('.pinata-wrapper').hide();
    $('.pinata-shadow').hide();
    $('.play-again').show();
    $('.timer').html("Times Up!");
    if (pinataClickCount > highscore) {
      highscore = pinataClickCount;
      $('.highscore').html("HS: " + highscore);
    }
  } else {
    console.log("error in timer");
  }
}  

//build random color palette 
function randomColor() {
  var colors, theColor;
  colors = ["#ffb7d6", "#89f7ff", "#f4ff70", "#8a003b", "#1277c9",
            "#e8a937", "#459fdd", "#ff83ca", "#4c5449", "#86e8ff"];
  theColor = colors[Math.floor(Math.random() * colors.length)];
  return theColor;
}