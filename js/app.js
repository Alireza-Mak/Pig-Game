/** @format */

var scores, currentScore, playerTurn, activeGame, nameArray;

// Initial Function
var init = () => {
  scores = [0, 0];
  currentScore = 0;
  playerTurn = 0;
  activeGame = false;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';
  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('active');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`#name-0`).textContent = 'player1';
  document.querySelector(`#name-1`).textContent = 'player2';
  document.querySelector(`.player-0-panel`).classList.add('active');
  document.querySelector('#samename_error').style.visibility = 'hidden';
};
init();

// Roll Btn Event Listener
document.querySelector('.btn-roll').addEventListener('click', () => {
  if (activeGame) {
    // 1) Create random Dices
    var dice1 = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);
    // 2) Display Dices
    document.querySelector('#dice-2').style.display = 'block';
    document.querySelector('#dice-1').style.display = 'block';
    // 3) Link Dices to Images
    document.querySelector('#dice-1').src = `./img/dice-${dice1}.png`;
    document.querySelector('#dice-2').src = `./img/dice-${dice2}.png`;
    // 4) Update scores
    if (dice1 === 6 && dice2 === 6) {
      scores[playerTurn] = 0;
      document.querySelector(`#score-${playerTurn}`).textContent = 0;
      changePlayer();
    } else if (dice1 === 1 && dice2 === 1) {
      changePlayer();
    } else {
      currentScore += dice1 + dice2;
      document.querySelector(`#current-${playerTurn}`).textContent =
        currentScore;
    }
  }
});

// Hold Btn Event Listener
document.querySelector('.btn-hold').addEventListener('click', () => {
  if (activeGame) {
    var finalScoreInput = document.querySelector('.final-score').value;
    if (!finalScoreInput) {
      finalScoreInput = 50;
    }
    scores[playerTurn] += currentScore;
    document.querySelector(`#score-${playerTurn}`).textContent =
      scores[playerTurn];
    if (scores[playerTurn] >= finalScoreInput) {
      document.querySelector(`#name-${playerTurn}`).textContent = 'Winner!';
      document.querySelector('#dice-1').style.display = 'none';
      document.querySelector('#dice-2').style.display = 'none';
      document
        .querySelector(`.player-${playerTurn}-panel`)
        .classList.remove('active');
      document
        .querySelector(`.player-${playerTurn}-panel`)
        .classList.add('winner');
      activeGame = false;
      document.querySelector('.popup__winnerPlayer__content').style.transform =
        'translate(-50%, -50%) scale(1)';
      document.querySelector('.popup__winnerPlayer').style.visibility =
        'visible';
      document.querySelector('.popup__winnerPlayer').style.opacity = 1;
      document.querySelector(
        '.popup__winnerPlayer__name'
      ).textContent = `${nameArray[playerTurn]} is winner!!`;
      document.getElementById('video').play();
      setTimeout(showTryAgainBtn, 3000);
    } else {
      changePlayer();
    }
  }
});

// New Game Btn Event Listener
document.querySelector('.btn-new').addEventListener('click', () => {
  activeGame = true;
  init();
  document.querySelector('.popup__newGame__content').style.transform =
    'translate(-50%, -50%) scale(1)';
  document.querySelector('.popup__newGame').style.visibility = 'visible';
  document.querySelector('.popup__newGame').style.opacity = 1;
});

document.querySelector('.btn-rules').addEventListener('click', () => {
  document.querySelector('.popup__content').style.transform =
    'translate(-50%, -50%) scale(1)';
  document.querySelector('.popup__rules').style.visibility = 'visible';
  document.querySelector('.popup__rules').style.opacity = 1;
});
var memory = () => {
  scores = [0, 0];
  currentScore = 0;
  playerTurn = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';
  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('active');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`#name-0`).textContent = nameArray[0];
  document.querySelector(`#name-1`).textContent = nameArray[1];
  document.querySelector(`.player-0-panel`).classList.add('active');
};

// Change player function
var changePlayer = () => {
  currentScore = 0;
  document.querySelector(`#current-${playerTurn}`).textContent = 0;
  playerTurn === 0 ? (playerTurn = 1) : (playerTurn = 0);
  document.querySelector(`.player-0-panel`).classList.toggle('active');
  document.querySelector(`.player-1-panel`).classList.toggle('active');
};

//*********************************
//************POPUP RULES**********
//*********************************
// Let play Btn POPUP RULES
document.querySelector('#letsPlay').addEventListener('click', closeRuleWindow);

// CLOSING POPUP RULES WINDOW
document
  .querySelector('.popup__rules__close')
  .addEventListener('click', closeRuleWindow);

document.addEventListener('keyup', function (event) {
  if (
    event.keyCode === 27 ||
    event.which === 27 ||
    event.keyCode === 13 ||
    event.which === 13
  ) {
    closeRuleWindow();
  }
});

// CLOSING FUNCTION
function closeRuleWindow() {
  document.querySelector('.popup__content').style.transform =
    'translate(-50%, -50%) scale(0)';
  document.querySelector('.popup__rules').style.visibility = 'hidden';
  document.querySelector('.popup__rules').style.opacity = 0;
}

//*********************************
//*******POPUP WINNER PLAYER*******
//*********************************
// CLOSING POPUP WINNER PLAYER WINDOW
document
  .querySelector('#popup__winnerPlayer__close')
  .addEventListener('click', closeWinnerPlayerWindow);

document.addEventListener('keyup', function (event) {
  if (event.keyCode === 27 || event.which === 27) {
    closeWinnerPlayerWindow();
  }
});
// Try Again Btn Event Listener
document
  .querySelector('.popup__winnerPlayer__tryAgainBtn')
  .addEventListener('click', TryAgainBtn);

document.addEventListener('keyup', function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    TryAgainBtn();
  }
});

// TRY AGAIN BTN FUNCTION
function TryAgainBtn() {
  document.querySelector('.popup__winnerPlayer__content').style.transform =
    'translate(-50%, -50%) scale(0)';
  document.querySelector('.popup__winnerPlayer').style.visibility = 'hidden';
  document.querySelector('.popup__winnerPlayer').style.opacity = 0;
  memory();
  activeGame = true;
}

// CLOSING FUNCTION
function closeWinnerPlayerWindow() {
  document.querySelector('.popup__winnerPlayer__content').style.transform =
    'translate(-50%, -50%) scale(0)';
  document.querySelector('.popup__winnerPlayer').style.visibility = 'hidden';
  document.querySelector('.popup__winnerPlayer').style.opacity = 0;
}

//SHOW TRY AGAIN BTN
function showTryAgainBtn() {
  document.querySelector('.popup__winnerPlayer__tryAgain').style.visibility =
    'visible';
  document.querySelector('.popup__winnerPlayer__tryAgain').style.opacity = 1;
}

//*********************************
//*********POPUP NEW GAME**********
//*********************************
// START NEW GAME EVENT LISTENER
document.querySelector('#start').addEventListener('click', startNewGame);

document.addEventListener('keyup', function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    startNewGame();
  }
});
// START NEW GAME FUNCTION
function startNewGame() {
  activeGame = true;
  var player0 = document.querySelector('#player0').value;
  var player1 = document.querySelector('#player1').value;

  if (player0 && player1) {
    if (player0 == player1) {
      document.querySelector('#samename_error').style.visibility = 'visible';
    } else {
      nameArray = [player0, player1];
      document.querySelector('#name-0').textContent = player0;
      document.querySelector('#name-1').textContent = player1;
      document.querySelector('#player0').value = '';
      document.querySelector('#player1').value = '';
      document.querySelector('.popup__newGame__content').style.transform =
        'translate(-50%, -50%) scale(0)';
      document.querySelector('.popup__newGame').style.visibility = 'hidden';
      document.querySelector('.popup__newGame').style.opacity = 0;
    }
  } else if (player0 && !player1) {
    document.querySelector('#samename_error').style.visibility = 'hidden';
    document.querySelector('.error1').style.visibility = 'visible';
    document.querySelector('.error1').style.opacity = 1;
  } else if (!player0 && player1) {
    document.querySelector('.error0').style.visibility = 'visible';
    document.querySelector('.error0').style.opacity = 1;
  } else {
    document.querySelector('.error1').style.visibility = 'visible';
    document.querySelector('.error1').style.opacity = 1;
    document.querySelector('.error0').style.visibility = 'visible';
    document.querySelector('.error0').style.opacity = 1;
  }
}

// CLOSING POPUP NEW GAME WINDOW
document.addEventListener('keyup', function (event) {
  if (event.keyCode === 27 || event.which === 27) {
    closeNewGameWindow();
  }
});
document
  .querySelector('#popup__inputs__close')
  .addEventListener('click', closeNewGameWindow);

// CLOSING FUNCTION
function closeNewGameWindow() {
  document.querySelector('.popup__content').style.transform =
    'translate(-50%, -50%) scale(0)';
  document.querySelector('.popup__newGame').style.visibility = 'hidden';
  document.querySelector('.popup__newGame').style.opacity = 0;
  document.querySelector('#player0').value='';
  document.querySelector('#player1').value='';
}

// ERROR FUNCTION
var clearError = () => {
  document.querySelector('.error1').style.visibility = 'hidden';
  document.querySelector('.error1').style.opacity = 0;
  document.querySelector('.error0').style.visibility = 'hidden';
  document.querySelector('.error0').style.opacity = 0;
};

//*********************************
//*************GENERAL*************
//*********************************
// Get the current year for the copyright
$('#year').text(new Date().getFullYear());
