'use strict';
const scoreFirstEl = document.querySelector('#score--0');
const scoreSecondEl = document.querySelector('#score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const player1El = document.querySelector('.player--0');
const player1E2 = document.querySelector('.player--1');

let scores,activePlayer,playing,currerntScore;

const init = function(){
	scores = [0, 0]
	activePlayer = 0;
	playing = true;
	currerntScore = 0;
	scoreFirstEl.textContent = 0;
	scoreSecondEl.textContent = 0;
	diceEl.classList.add('hidden');

	document.querySelector(`.player--0`).classList.remove('player--winner');
	document.querySelector(`.player--1`).classList.remove('player--winner');
	document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}
init();

const switchPlayer = function () {
	document.querySelector(`#current--${activePlayer}`).textContent = currerntScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player1El.classList.toggle('player--active')
	player1E2.classList.toggle('player--active')
}


btnRoll.addEventListener("click", function (e) {
	if (playing) {
		const dice = Math.trunc(Math.random() * 6) + 1;
		diceEl.classList.remove('hidden');
		diceEl.src = `dice-${dice}.png`;
		if (dice !== 1) {
			currerntScore += dice;
			document.querySelector(`#current--${activePlayer}`).textContent = currerntScore;
		} else {
			switchPlayer()
		}
	}
});

btnHold.addEventListener("click", function (e) {
	if (playing) {
		scores[activePlayer] += currerntScore;
		document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
		if (scores[activePlayer] >= 10) {
			playing = false;
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
			diceEl.classList.add('hidden');
		} else {
			switchPlayer()
		}
	}
});

btnNew.addEventListener("click", init);
