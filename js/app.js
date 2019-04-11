//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
/* ---------------------------------- */
/* define counters and time variables */
/* ---------------------------------- */

let openCards = []
let movesCount = 0;
let starsCount = 3;
let winCounter = 0;
let interval;
/* define modal selectors */
const modal = document.getElementById("popup1");

/* ------------------------------- */
/* Main Functions                  */
/* ------------------------------- */

/* Start Run from here IFE */
(function () {
  var cards = document.getElementsByClassName('card')
  StartGame(cards);
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', handler)
  }
})()

/* start loading the game shuffle the cards and unshow them */
function StartGame(cards) {
  // shuffle deck
  timer();
  const cardsArray = shuffle([...cards]);
  // remove all existing classes from each card
  document.querySelector('.deck').innerHTML = '';
  // append the new array to the deck
  for (var i = 0; i < cardsArray.length; i++) {
    [].forEach.call(cardsArray, function (item) {
      document.querySelector('.deck').appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
}

/* handle the card after click */
function handler(card) {
  // when card get clicked..
  if (card.target.className == 'card' && openCards.length < 2) {
    addOpenClass(card.target);
    if (openCards.length == 2) {
      movesCount++;
      stars();
      movesCahnge();
      if (!areMatched()) {
        setTimeout(() => {
          removeFromOpenCards()
        }, 500);

      } else {
        winCounter++;
        if (winCounter === 8) {
          showWin();
        }
      }
    }
  }
}

/* open the card and show pic */
function addOpenClass(card, position) {
  card.className = "card open show";
  openCards.push(card.firstElementChild.className)
}

/* check matching the card return true if match */
function areMatched() {
  if (openCards[0] == openCards[1]) {
    openCards.forEach(function (item) {
      var elemnts = document.getElementsByClassName(item);
      for (var j = 0; j < elemnts.length; j++) {
        elemnts[j].parentElement.className = "card match";
      }
    });
    openCards = [];
    return true;
  }
  return false;
}

/* reclose and hide not matched cards */
function removeFromOpenCards() {
  openCards.forEach(function (item) {
    var elemnts = document.getElementsByClassName(item);
    for (var j = 0; j < elemnts.length; j++) {
      elemnts[j].parentElement.className = "card";
    }
  });
  openCards = [];
}

/* --------------------- */
// Additional Functions
/* --------------------- */

/* start timer in the panal */
function timer() {
  let timer = document.querySelector('.timer');
  let sec = 0;
  let min = 0;
  interval = setInterval(() => {
    sec = sec + 1;
    if (sec > 59) {
      sec = 0;
      min = min + 1;
    }
    timer.innerHTML = `Timer ${min}: ${sec}`
  }, 1000);
}

/*  count the stats and reduce stars by condition */
function stars() {
  const star = document.querySelector('.stars').querySelectorAll('.fa');
  if (movesCount == 10) {
    starsCount = 2;
    star[starsCount].className = "fa";
  }
  if (movesCount == 20) {
    starsCount = 1;
    star[starsCount].className = "fa";
  }
}
/* moce the moces Counter to the panal */
function movesCahnge() {
  let moves = document.querySelector('.moves');
  moves.innerHTML = movesCount;
}

/* resetart the game by clicking the reset or button play again in the model */
const reset = document.querySelector('.restart');
reset.addEventListener('click', restart);
function restart() {
  modal.classList.remove("show");
  location.reload();      /* restart Click event listener */
};

/* ------------------------------- */
/* modal code to show after wining */
/* ------------------------------- */

/* show moda when matchCounter = 8 */
function showWin() {
  console.log('you win');
  const closeicon = document.querySelector(".close");
  /* stop the timer */
  clearInterval(interval);
  /* take the timer value */
  finalTime = document.querySelector('.timer').innerHTML;
  debugger;
  // show  modal
  modal.classList.add("show");

  //showing move, rating, time on modal
  document.getElementById("finalMove").innerHTML += movesCount;
  document.getElementById("starRating").innerHTML += starsCount;
  document.getElementById("totalTime").innerHTML += finalTime;

  //closeicon on modal
  closeicon.addEventListener('click', restart );
};
