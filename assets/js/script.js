const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;
let stopCount = false;


function startGame(){
 lockBoard = false;
 startCounter();
 
 document.getElementById('play').removeEventListener('click',startGame);

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
  allFlipped();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();

 
}


function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  
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
function allFlipped() {
  let flippedCards = document.querySelectorAll('.memory-card.flip');
  if (flippedCards.length === 16){
    lockBoard = true;
    stopCount = true;
    winner();
    
  }
}

function startCounter(){
 var counter = 100;
 document.getElementById('timer').textContent = counter;
     var countdown = setInterval(function(){
       console.log(counter);
       counter--
       document.getElementById('timer').innerHTML = counter;
       if(stopCount) {
        clearInterval(countdown);

       }

       if (counter === 0) {
        gameOver();
         clearInterval(countdown);
         
         
       }
     }, 1000);

}

function gameOver(){
  document.getElementById('game-over').classList.add('visible');
}


function winner(){
  document.getElementById('winner').classList.add('visible');
}

function startAgain() {
  location.reload() 

}

function sendScoreEmail() {
  const to_email = document.getElementById('email').value;
  var timerScore = document.getElementById('timer').innerText;
  var flipScore = document.getElementById('flips').innerText;
  var score =  timerScore - flipScore;

  var templateParams = {
    to_email:to_email,
    score:score
   
  };
  emailjs.send('service_cxn0bsp', 'template_f7gsd8s', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });


}

document.getElementById('play').addEventListener('click', startGame)
cards.forEach(card => card.addEventListener('click', flipCard));

document.getElementById('email-btn').addEventListener('click', sendScoreEmail)

document.getElementById('foreground-text-small1').addEventListener('click', startAgain)
document.getElementById('foreground-text-small2').addEventListener('click', startAgain)

