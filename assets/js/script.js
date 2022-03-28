const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;

function startGame(){
 lockBoard = false;
 beginTimer()

}

function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    flipCounter();

    return;
  }

  // second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
  flipCounter();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();

 
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

   
  firstCard.classList.add('removeCard');
  secondCard.classList.add('removeCard');
   

}


function unflipCards() {
  lockBoard = true;
  setTimeout(function () {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      lockBoard = false;
    }, 1500);
}


(function shuffle () {
  cards.forEach( card => { 
     let randomPos = Math.floor(Math.random() * 16);
     card.style.order = randomPos;
     });

}) ()

function flipCounter(){
  let flipCounter = parseInt(document.getElementById('flips').innerText);
  document.getElementById('flips').innerText = ++flipCounter;

}
/*
function beginTimer(){
  let beginTimer = parseInt(document.getElementById('timer').innerText);

  if(beginTimer === 0){ stopGame()

  
  setInterval(function(){ document.getElementById('timer').innerText = --beginTimer;
},1000);
}*/



function stopGame (){

}

document.getElementById('play').addEventListener('click', startGame)
cards.forEach(card => card.addEventListener('click', flipCard));
