/*
 * Create a list that holds all of your cards
 */

const playag =document.querySelector('.resat');
const message =document.querySelector('#mese');
const mees =document.querySelector('#mese');
const contanier  =document.querySelector('.modl').style ;
const gamepage  =document.querySelector('.container').style ;
let timerr = null ;
let time  = 0 ;
let matchedcard = [] ;
let pa = document.querySelector('.timer');
let clicked = 0 ;
let count = document.querySelector('.moves');
let openCards = [] ;


contanier.display='none';

// to shufffle cards
function begin() {
  count.textContent = 0 ;// to remove the 3 from moves

  let cards = document.querySelectorAll('.deck .card');
  const cardset = [...cards];
  document.querySelector('.deck').innerHTML = '';
  let fr = document.createDocumentFragment();
  for (i of shufffle(cardset)) {
    fr.appendChild(i);
    i.classList.remove('open','show','match');
  }
  document.querySelector('.deck').appendChild(fr);

  setcards(cardset);
}




function shufffle(array) {
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
begin(); // to begin the function  so the card can be shuffled

// to click on card
function setcards(cr) {
  timing();

// add an event for the cards
  for (let i of cr) {
    i.addEventListener('click', function (evt) {

      if (!i.classList.contains('open') && !i.classList.contains('show') && !i.classList.contains('match') ) {
        openCards.push(i);
        i.classList.add('open', 'show');
            // check if it two cards have been open start the time count the moves
        if (openCards.length === 2) {
          clicked++;
          count.textContent = clicked;
          reducestr(clicked)
          //check if the card are matched
          if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {

            openCards[0].classList.add('open');
            openCards[0].classList.add('show');
            openCards[0].classList.add('match');
            openCards[1].classList.add('open');
            openCards[1].classList.add('show');
            openCards[1].classList.add('match');
            matchedcard.push(openCards[0]);
            endgame();

          }
            // for unmacthed card remove open and close
          setTimeout(function () {
            openCards.forEach(function (card) {
              card.classList.remove('open', 'show');
              openCards = [];

            })}, 500);
        }


      }
    });

      }

  }

//to stop the time if game finshed
function timestop(){
  clearInterval(timerr);
  timerr = null ;
}

// to start the timer
function timing(){

  timerr = setInterval(function () {
    pa.textContent = time;
    time++;



  }, 1000);
}

// to reduace the stars after a number of moves
function reducestr(move){
  let   strr = document.querySelectorAll('.fa-star');
  let str = [...strr];

  for(i of str ){
  }
  if (move ===10) {

    i.remove(i[3]);
  }
  else if (move ===15 ){

    i.remove(i[3]);

  }else if (move===20 ){    i.remove(i[3]);
  }

}

// end the game
function endgame(){
  const message =document.querySelector('#mese');
  const mees =document.querySelector('#mese');
  const contanier  =document.querySelector('.modl').style ;
  const gamepage  =document.querySelector('.container').style ;

  playag.addEventListener('click', function () {
    location.reload();
  });
  if (matchedcard.length===8){
     timestop()

    mees.innerHTML= `you won the game in  ${time}  time  and with ${clicked}`;
    gamepage.display = 'none';
    contanier.display='flex';
  }

  }
// restart button refresh the page
const restart=document.querySelector('#restart');
restart.addEventListener('click', function () {
  location.reload();
});
