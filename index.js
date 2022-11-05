let order = []; //keep track of the lights. How they will flash
let playerOrder = []; // keep track of player buttons pressed
let flash; //Variable. # of flashes in the game.
let turn; // keep track of turn
let good; //keep track of player score
let compTurn // keep track of playec comp turns
let intervalId;
let strict = false; // keep track of strict checkbox
let noise = true // if we are playing noise
let on = false; // keep track of power of game
let win; // keep track of player wins or not

const turnCounter = document.querySelector('#turn') // pass CSS id of turn. Manipulate
const topLeft = document.querySelector('#topleft');
const topRight = document.querySelector('#topright');
const bottomLeft = document.querySelector('#bottomleft');
const bottomRight = document.querySelector('#bottomright');
const strictButton = document.querySelector('#strict');
const onButton = document.querySelector('#on');
const startButton = document.querySelector('#start');

function clearColor() {
    topLeft.style.backgroundColor = 'darkgreen'
    topRight.style.backgroundColor = 'darkred'
    bottomLeft.style.backgroundColor = 'goldenrod'
    bottomRight.style.backgroundColor = 'darkblue'
}

function   flashColor() {
    topLeft.style.backgroundColor = 'lightgreen'
    topRight.style.backgroundColor = 'tomato'
    bottomLeft.style.backgroundColor = 'yellow'
    bottomRight.style.backgroundColor = 'lightskyblue'
}

strictButton.addEventListener('change',(event) => {
    if(strictButton.checked == true) {
        strict = true;
    }
    else {
        strict = false;
    }
})

onButton.addEventListener('change', (event) =>
{
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = '-'
    }
    else {
        on = false;
        turnCounter.innerHTML = ''
        clearColor();
        clearInterval(intervalId)   //stop simon from flashing the colors
    }
})

startButton.addEventListener('click', (event) => {
    if(on || win ) {
        play();
    }
})

function play() {
    win = false
    order = []
    playerOrder = []
    flash = 0
    intervalId = 0
    turn = 1
    turnCounter.innerHTML = 1
    good = true

    for(let i =0; i <20; i++) {
        order.push(Math.floor(Math.random() * 4) +1);
    }
    compTurn = true;

    intervalId = setInterval(gameTurn, 800) // run the function 'gameturn' every 800 miliseconds
}

function gameTurn() {
    on = false;     //Set to false to prevent user from interupting computer

    if(flash == turn ) {
        clearInterval(intervalId)
        compTurn = false
        clearColor()
        on = true
    }

    if(compTurn) {
        clearColor()
        setTimeout(() => {      //set timeout will initiate color after a number of miliseconds 
            if (order[flash] == 1) one()
            if (order[flash] == 2) two()
            if (order[flash] == 3) three()
            if (order[flash] == 4) four()
            flash++;
        }, 200)    
    }
}

    function one() {
        let audio = document.getElementById('clip1');
        if(noise) {
            audio.play()
        }
        noise = true
        topLeft.style.backgroundColor = 'Lightgreen'
    }
    function two() {
        let audio = document.getElementById('clip2');
        if(noise) {
            audio.play()
        }
        noise = true
        topRight.style.backgroundColor = 'tomato'
    }
    function three() {
        let audio = document.getElementById('clip3');
        if(noise) {
            audio.play()
        }
        noise = true
        bottomLeft.style.backgroundColor = 'yellow'
    }
    function four() {
        let audio = document.getElementById('clip4');
        if(noise) {
            audio.play()
        }
        noise = true
        bottomRight.style.backgroundColor = 'Lightskyblue'
    }
    
    topLeft.addEventListener('click', (event) => {
        if(on) {
            playerOrder.push(1);
            check();
            one();
        
        if(!win) {
            setTimeout( () => {
                clearColor();
            },300)
        }
    }
    })

    topRight.addEventListener('click', (event) => {
        if(on) {
            playerOrder.push(2);
            check();
            two();
        
        if(!win) {
            setTimeout( () => {
                clearColor();
            },300)
        }
    }
    })

    bottomLeft.addEventListener('click', (event) => {
        if(on) {
            playerOrder.push(3);
            check();
            three();
        
        if(!win) {
            setTimeout( () => {
                clearColor();
            },300)
        }
    }
    })

    bottomRight.addEventListener('click', (event) => {
        if(on) {
            playerOrder.push(4);
            check();
            four();
        
        if(!win) {
            setTimeout( () => {
                clearColor();
            },300)
        }
    }
    })

    function check() {
        if(playerOrder[playerOrder.length-1] !== order[playerOrder.length-1]) {
            good = false
        }
        if(playerOrder.length == 20 && good) {
            winGame();
        }
        if(good == false) {
            flashColor();
            turnCounter.innerHTML = 'No!'
            setTimeout(() => {
                turnCounter.innerHTML = turn
                clearColor()

                if(strict) {
                    play();
                }
                else {
                    compTurn = true;
                    flash = 0;
                    playerOrder= [];
                    good = true
                    intervalId = setInterval(gameTurn, 800)
                }
            }, 800)
            
            noise = false
        }
        if(turn == playerOrder.length && good && !win) {
            turn++
            playerOrder = [];
            compTurn = true
            flash = 0
            turnCounter.innerHTML = turn
            intervalId = setInterval(gameTurn, 800)
        }
    }

    function winGame() {
        flashColor();
        turnCounter.innerHTML = "WIN!"
        on = false
        win = true

    }

    
