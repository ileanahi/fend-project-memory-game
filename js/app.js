/*
 * TO-DO: Remove event listener from cards
 * Start a timer
 */


/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
];

// Create HTML for cards
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};

let openCards = [];
let moves = 0;
let movesCounter = document.querySelector('.moves');
let restart = document.querySelector('.restart');
let deckContainer = document.querySelector('.deck');
let stars = document.querySelector('.stars');
let matched = 0;
let time = 0;
let timer = document.querySelector('.timer');
let liveTimer = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function startGame() {
    // Shuffle cards and create deck
    let cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });
    deckContainer.innerHTML = cardHTML.join('');
    movesCounter.innerText = moves;

    matchCards(cards);

}

startGame();
timerFunc();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function modalWindow() {
    // Get the modal
    let modal = document.getElementById('modal');

    // Get modal content
    let modalContent = document.querySelector('.modal-content');

    // Display modal
    modal.style.display = "block";

    // Set content to be displayed
    modalContent.innerHTML = "<ul class='stars'>" + stars.innerHTML + "</ul>" + "<h2>Congratulations!</h2>" +
        `<p>You completed this game in ${moves} moves and ${time} seconds!</p>` + "<p>Play again!</p>";


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



function matchCards(card) {
    let deck = document.querySelectorAll(".card");
    deck.forEach(function(card) {
        card.addEventListener("click", function(evt) {

            // If cards don't have open, show, or match, display it and add it to the list of open cards
            if (!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match")) {
                openCards.push(card);
                card.classList.add("open", "show");

                // If the cards have the same data set, match them
                if (openCards.length === 2) {
                    if (openCards[0].dataset.card === openCards[1].dataset.card) {
                        openCards[0].classList.add("open", "show", "match");
                        openCards[1].classList.add("open", "show", "match");

                        openCards = [];
                        matched += 2;

                    } else {
                        // Turn them back over and empty the list
                        setTimeout(function() {
                            openCards.forEach(function(card) {
                                card.classList.remove("open", "show");
                            });
                            openCards = [];
                        }, 350);
                    }
                }

            }


            // Increase move count
            moves++;
            movesCounter.innerText = moves;

            // Change stars based on moves
            if (moves <= 45) {
                stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
            } else if (moves > 45 && moves <= 55) {
                stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
            } else {
                stars.innerHTML = '<li><i class="fa fa-star"></i></li>'
            }

            if (matched === 16) {
                clearTimer();
                modalWindow();
            }
        });
    });
}

function increaseTime() {
    //let timer = document.querySelector('.timer');
    time++;
    timer.innerText = time;

    /* let minutesCount = math.floor(time / 60);
    let secondsCount = time % 60;

    if (minutesCount < 10) {
        let minutesText = "0" + minutesCount;
    }

    if (secondsCount = 10) {
        let secondsText = "0" + secondsCount;
    }

    timer.innerText = minutesText + ":" + secondsText; */
}


function timerFunc() {
    liveTimer = setInterval(increaseTime, 1000);
}

function clearTimer() {
    clearInterval(liveTimer);
}

restart.addEventListener('click', function() {
    // Regenerate deck
    while (deckContainer.firstChild) {
        deckContainer.removeChild(deckContainer.firstChild);
    }
    // Reset Moves
    moves = 0;

    //Reset Matched
    matched = 0;

    // Reset Time
    time = 0;
    timer.innerText = time;
    clearTimer();

    // Reset Stars
    stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';

    startGame();
    timerFunc();
});