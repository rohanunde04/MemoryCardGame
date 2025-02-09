const cardGrid = document.getElementById("cardGrid");
const movesCounter = document.getElementById("moves");
const timeCounter = document.getElementById("time");
const restartButton = document.getElementById("restart");

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer;
let time = 0;
let isGameStarted = false;

const symbols = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🥝", "🥥", "🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🥝", "🥥"];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    cardGrid.innerHTML = "";
    shuffledSymbols = shuffle(symbols);
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    time = 0;
    isGameStarted = false;
    clearInterval(timer);
    movesCounter.textContent = moves;
    timeCounter.textContent = "00:00";

    shuffledSymbols.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.addEventListener("click", flipCard);
        cardGrid.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (!isGameStarted) {
        isGameStarted = true;
        startTimer();
    }

    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.symbol;
        flippedCards.push(this);
    }

    if (flippedCards.length === 2) {
        moves++;
        movesCounter.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === symbols.length / 2) {
            clearInterval(timer);
            setTimeout(() => alert("Congratulations! You won!"), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        let minutes = Math.floor(time / 60).toString().padStart(2, "0");
        let seconds = (time % 60).toString().padStart(2, "0");
        timeCounter.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

restartButton.addEventListener("click", startGame);

document.addEventListener("DOMContentLoaded", startGame);
