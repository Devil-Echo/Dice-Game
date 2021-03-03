'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

//Initialization

let currentScore, playing, scores;

const intialize = function () {
  scores = [0, 0];
  currentScore = 0;
  diceEl.classList.add('hidden');
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  playing = true;
};

intialize();

//Toggling active players using fucntion
const switchPlayer = function () {
  // player0El.classList.toggle('player--active');
  // player1El.classList.toggle('player--active');
  currentScore = 0;
  if (player0El.classList.contains('player--active')) {
    currentScore0El.textContent = 0;
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  } else {
    currentScore1El.textContent = 0;
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
  }
};

//Function triggered when  a player wins the game
const winPlyr = function () {
  diceEl.classList.add('hidden');
  playing = false;
};

//Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `resources/dice-${dice}.png`;

    //Check for rolled 1: if true, switch to next player
    if (dice === 1) {
      switchPlayer();
    } else {
      // Add dice to current player
      currentScore += dice;
      player0El.classList.contains('player--active')
        ? (currentScore0El.textContent = currentScore)
        : (currentScore1El.textContent = currentScore);
    }
  }
});

//Function triggered when hold button is pressed

btnHold.addEventListener('click', function () {
  if (playing) {
    player0El.classList.contains('player--active')
      ? (score0El.textContent = scores[0] =
          Number(score0El.textContent) + Number(currentScore))
      : (score1El.textContent = scores[1] =
          Number(score1El.textContent) + Number(currentScore));

    switchPlayer();

    if (scores[0] >= 100) {
      player0El.classList.add('player--winner');
      winPlyr();
    } else if (scores[1] >= 100) {
      player1El.classList.add('player--winner');
      winPlyr();
    }
  }
});

//Function triggered when New-game is pressed

btnNew.addEventListener('click', intialize);
