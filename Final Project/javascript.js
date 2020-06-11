class AudioController {
constructor() {
this.bgMusic = new Audio('Assets/Audio/creepy.mp3');
this.flipSound = new Audio('Assets/Audio/flip.wav');
this.matchSound = new Audio('Assets/Audio/match.wav');
this.victorySound = new Audio('../sounds/Clapping-sound.mp3');
this.gameOverSound = new Audio('Assets/Audio/gameOver.wav');
this.bgMusic.volume = 0.5;
this.bgMusic.loop = true;
}

flip() {
this.flipSound.play();
}
match() {
this.matchSound.play();
}
Victory() {

this.victorySound.play();
}
gameOver() {
this.stopMusic();
this.gameOverSound.play();
}
}


class flipflash {
constructor(totalTime, cards) {
this.cardsArray = cards;
this.totalTime = totalTime;
this.timeRemaining = totalTime;
this.timer = document.querySelector('#time-remaining')
this.ticker = document.querySelector('#flips');
this.audioController = new AudioController();
}

startGame() {
this.totalClicks = 0;
this.timeRemaining = this.totalTime;
this.cardToCheck = null;
this.matchedCards = [];
this.busy = true;
setTimeout(() => {

this.shuffleCards(this.cardsArray);
this.countdown = this.startCountdown();
this.busy = false;
}, 500)
this.hideCards();
this.timer.innerText = this.timeRemaining;
this.ticker.innerText = this.totalClicks;
}
startCountdown() {
return setInterval(() => {
this.timeRemaining--;
this.timer.innerText = this.timeRemaining;
if(this.timeRemaining === 0)
this.gameOver();
}, 1000);
}
gameOver() {
clearInterval(this.countdown);

document.querySelector('#game-over-text').classList.add('visible');
}
victory() {
clearInterval(this.countdown);
this.audioController.Victory();
document.querySelector('#victory-text').classList.add('visible');

$('.counter').each(function() {
var $this = $(this),
countTo = $this.attr('data-count');

$({ countNum: $this.text()}).animate({
countNum: countTo
},

{

duration: 8000,
easing:'linear',
step: function() {
$this.text(Math.floor(this.countNum));
},
complete: function() {
$this.text(this.countNum);
//alert('finished');
}

}); 



});


}
hideCards() {
this.cardsArray.forEach(card => {
card.classList.remove('visible');
card.classList.remove('matched');
});
}
flipCard(card) {
if(this.canFlipCard(card)) {

this.totalClicks++;
this.ticker.innerText = this.totalClicks;
card.classList.add('visible');

if(this.cardToCheck) {
this.checkForCardMatch(card);
} else {
this.cardToCheck = card;
}
}
}
checkForCardMatch(card) {
if(this.getCardType(card) === this.getCardType(this.cardToCheck))
this.cardMatch(card, this.cardToCheck);

else 
this.cardMismatch(card, this.cardToCheck);

this.cardToCheck = null;
}

cardMatch(card1, card2) {
this.matchedCards.push(card1);
this.matchedCards.push(card2);
card1.classList.add('matched');
card2.classList.add('matched');
if(this.matchedCards.length === this.cardsArray.length)
this.victory();

}


cardMismatch(card1, card2) {
this.busy = true;
setTimeout(() => {
card1.classList.remove('visible');
card2.classList.remove('visible');
this.busy = false;
}, 1000);
}
shuffleCards(cardsArray) { // Fisher-Yates Shuffle Algorithm.
for (let i = cardsArray.length - 1; i > 0; i--) {
let randIndex = Math.floor(Math.random() * (i + 1));
cardsArray[randIndex].style.order = i;
cardsArray[i].style.order = randIndex;
}
}
getCardType(card) {
return card.querySelectorAll('.card-value')[0].src;
}
canFlipCard(card) {
return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
}
};

$(document).ready(function(){
let overlays= document.querySelectorAll('.overlay-text');
let cards= document.querySelectorAll('.card');
let game = new flipflash(100, cards);

overlays.forEach(overlay => {
overlay.addEventListener('click', () => {
overlay.classList.remove('visible');
game.startGame();
});
});

cards.forEach(card => {
card.addEventListener('click', () => {
game.flipCard(card);
});
});
});