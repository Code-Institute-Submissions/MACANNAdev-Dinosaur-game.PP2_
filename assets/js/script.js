const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;


function startGame(){
 lockBoard = false;
 startCounter();

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
  interval = setInterval(function () {
    document.getElementById('timer').innerHTML = seconds;
    if (--seconds < 0) clearInterval(interval);
}, 1000);
}

 function beginTimer () {

   setInterval(() => {
       --time;
       document.getElementById('timer') = timeRemaining;

       if (timeRemaining === 0) {
         stopGame();


       } 1000;
     });}*/

function startCounter(){
 var counter = 100;
 document.getElementById('timer').textContent = counter;
     var countdown = setInterval(function(){
       console.log(counter);
       counter--
       document.getElementById('timer').innerHTML = counter;

       if (counter === 0) {
         
         clearInterval(countdown);
       }
     }, 1000);

}



document.getElementById('play').addEventListener('click', startGame)
cards.forEach(card => card.addEventListener('click', flipCard));
