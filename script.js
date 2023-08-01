'use strict';
//selecting elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
// setting initial values
let currentScore;
let activePlayer;
let score;
let playing;
const initial = function () {
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
initial();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

rollBtn.addEventListener('click', function () {
  if (playing) {
    // generating random dice roll
    const randomDiceRoll = Math.trunc(Math.random() * 6) + 1;

    //displaying dice roll
    dice.classList.remove('hidden');
    dice.src = `dice-${randomDiceRoll}.png`;

    if (randomDiceRoll !== 1) {
      currentScore += randomDiceRoll;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 20) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switching player
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', initial);
