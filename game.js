const btn = document.getElementById("btn");
const gameId = document.getElementById("game-id");
const clock = document.querySelector(".timer");
const images = document.querySelectorAll(".img-background");
const win = document.querySelector(".win");
const game = document.querySelector(".game");

let index = 0;
let interval;
let historyArr = [];
let matchPicture = [];

let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
timer = false;

function startGame() {
    if (btn.innerHTML === "Start") {
        index = 0;
        win.style.visibility = 'hidden';
        btn.innerHTML = "Reset Game";
        gameId.innerHTML = `${(Math.floor(Math.random() * 8900) + 1000)}`
        timer = true;
        images.forEach((image) => {
            image.firstElementChild.style.opacity = "1"
        })
        randomize();
        display();
        gameStart();
    } else {
        gameStop("black");
    }
}
function randomize() {
    const gameContainer = document.querySelector('.game'); // Get the game container
    const cards = Array.from(gameContainer.children); // Get all the divs with class 'img-background'
    // Shuffle the cards array
    shuffle(cards);

    // Remove all cards from the game container
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }

    // Append the shuffled cards back to the game container
    cards.forEach(card => gameContainer.appendChild(card));
    console.log("Game has started in random order!");
}
function shuffle(array) {
    // Shuffle function (Fisher-Yates algorithm)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}
function display() {
    setTimeout(() => {
        images.forEach((image) => {
            image.firstElementChild.style.opacity = "0"
        })
    }, 10000)
}
function gameStart() {
    let time = 0;
    let min = 0;
    interval = setInterval(() => {
        time++
        if (time < 10 && min < 10) {
            clock.innerHTML = `0${min}:0${time}`
        } else if (time < 10 && min >= 10) {
            clock.innerHTML = `${min}:0${time}`
        } else if (time >= 10 && time < 60 && min >= 10) {
            clock.innerHTML = `${min}:${time}`
        } else if (time >= 10 && time < 60 && min < 10) {
            clock.innerHTML = `0${min}:${time}`
        } else if (time >= 60 && min < 10) {
            min++;
            time = 0;
            clock.innerHTML = `0${min}:00`
        } else if (time >= 60 && min >= 10) {
            min++;
            time = 0;
            clock.innerHTML = `${min}:00`
        }
        if (clock.innerHTML === '05:00') {
            clearInterval(interval);
            setTimeout(() => {
                gameStop("red");
            }, 1000)
        }
    }, 1000)
}
function gameStop(color) {
    const historyContainer = document.querySelector('.history');
    historyArr.push(`\n${gameId.innerHTML} ${clock.innerHTML}\n`);
    images.forEach((image) => {
        image.style.visibility = 'visible'
        image.firstElementChild.style.opacity = '1'
        image.style.pointerEvents = 'none';
    })
    win.style.visibility = 'hidden';
    // historyContainer.innerHTML = '<h1>History</h1>'; 
    const details = document.createElement("p");
    details.innerText = historyArr[historyArr.length - 1];
    historyContainer.appendChild(details);
    console.log(color)
    if (color === 'black') {
        details.style.color = 'black'
    } else if (color === 'red') {
        details.style.color = 'red'
    } else if (color === 'green') {
        details.style.color = 'green'
    }
    clearInterval(interval);
    btn.innerHTML = "Start";
    gameId.innerHTML = '----';
    clock.innerHTML = '00:00';
    timer = false;
}
function flip() {
    if (timer) {
        images.forEach((image) => {
            image.addEventListener("click", () => {
                if (image.firstElementChild.style.opacity === '1') {
                    return;
                } else {
                    image.firstElementChild.style.opacity = "1"
                    image.firstElementChild.style.disabled = 'true';
                    matchPicture.push(image.firstElementChild)
                    compare();
                    if (matchPicture.length > 2) {
                        images.forEach((image) => {
                            image.firstElementChild.style.opacity = "0"
                            image.style.pointerEvents = 'all'
                        })
                        matchPicture = [];
                    }
                }
            })
        })

    }
    if (index === 15) {
        console.log("all hidden")
        youWin();
    }
}
function youWin() {
    console.log("You Win")
    game.style.visibility = "hidden";
    win.style.visibility = 'visible';
    clearInterval(interval);
    setTimeout(() => {
        gameStop("green");
    }, 8000)
}
function compare() {
    if (matchPicture.length === 2 && matchPicture[0].src === matchPicture[1].src) {
        console.log("match")
        index++;
        setTimeout(() => {
            matchPicture[0].parentElement.style.visibility = 'hidden';
            matchPicture[1].parentElement.style.visibility = 'hidden';
            flip();
        }, 250)
    }
}

