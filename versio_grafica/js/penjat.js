let wordGuess = [];
let letters = "";
let attempts = 6;
let word = "";

function start() {
    word = prompt("Escriu la paraula a endevinar");
    if (word == null || word.length < 1) { return; } 
    word = word.toLowerCase();
    wordGuess = [];
    attempts = 6;
    letters = "";

    for (let i = 0; i < word.length; i++) {
        wordGuess[i] = "_";
    }
    
    printWord();
    printImg();
    printLettersAttempts();
    generateLetters();    
    saveData("gamesPlayed");
}

function play(guess) {
    if (attempts == 0) { return; }
    guess = guess.toLowerCase();
    if (word.includes(guess)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] == guess) {
                wordGuess[i] = guess;
            }
        }
    } else {
        attempts--;
    }
    letters += ` ${guess}`;
    printWord();
    printImg();
    printLettersAttempts();
    disableButton(guess);
    if (checkWin(wordGuess)) { 
        winAlert(); 
        return;
    }
    if (attempts == 0) { 
        loseAlert();
        return;
    }
}


function generateLetters() {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let divButtons = document.getElementById("abecedari");
    divButtons.innerHTML = "";

    for (let i = 0; i < letters.length; i++) {
        divButtons.innerHTML += `<button id='${letters[i].toLowerCase()}' class="button letters" onclick="play('${letters[i]}')">${letters[i]}</button>`;
    }
}


function printImg() {
    switch (attempts) {
        case 6:
            document.getElementById("imatgePenjat").src = "img/penjat_0.png";
            break;
        case 5:
            document.getElementById("imatgePenjat").src = "img/penjat_1.png";
            break;
        case 4:
            document.getElementById("imatgePenjat").src = "img/penjat_2.png";
            break;
        case 3:
            document.getElementById("imatgePenjat").src = "img/penjat_3.png";
            break;
        case 2:
            document.getElementById("imatgePenjat").src = "img/penjat_4.png";
            break;
        case 1:
            document.getElementById("imatgePenjat").src = "img/penjat_5.png";
            break;
        case 0:
            document.getElementById("imatgePenjat").src = "img/penjat_6.png";
            break;
        default:
            break;
    }        
}



function printWord() {
    let word = "";
    for (let i = 0; i < wordGuess.length; i++) {
        word += " "+wordGuess[i];
    }
    let divWordGuess = document.getElementById("jocPenjat");
        divWordGuess.innerHTML = `<h1>${word}</h1>`;
}
function disableButton(button_id) {
    let button = document.getElementById(button_id);
    button.disabled = true;
}
function printLettersAttempts() {
    let divLetters = document.getElementById("lletresUtilitzades");
    divLetters.innerHTML = `<h1>Lletres utilitzades: ${letters}</h1><br>`;
    divLetters.innerHTML += `<h1>Intents restants: ${attempts}</h1>`;
}





function winAlert() {
    saveData("gamesWon");
    alert("Has guanyat");
}
function checkWin() {
    if (!wordGuess.includes("_")) {
        return true;
    }
    return false;
}


function loseAlert() {
    saveData("gamesLost");
    alert(`Has perdut \nLa paraula era '${word}'`);
}
function saveData(stat) {
    let statValue = localStorage.getItem(stat);
    if (statValue == null || isNaN(statValue)) {
        statValue = 0;
    }
    statValue = parseInt(statValue) + 1;
    localStorage.setItem(stat, statValue);
}



function stats() {
    let gamesPlayed = localStorage.getItem("gamesPlayed");
    let gamesWon = localStorage.getItem("gamesWon");
    let gamesLost = localStorage.getItem("gamesLost");

    let stats = window.open("", "_blank");
    stats.document.write(`<p>Partides jugades: ${gamesPlayed}<br>`);
    stats.document.write(`Victories: ${gamesWon} (${((gamesWon/gamesPlayed)*100).toFixed(2)}%)<br>`);
    stats.document.write(`Derrotes: ${gamesLost} (${((gamesLost/gamesPlayed)*100).toFixed(2)}%)</p><br>`);
    stats.document.write(`<button onclick="localStorage.clear()">Reset</button>`);
}