function startPenjat() {
    console.log("1. Inicia partida \n2. Estadistiques\n3. Surt");
    let option = prompt("Selecciona una opció");    

    //casos del menú d'opcions
    switch (option) {
        case "1":
            start();
            break;
        case "2":
            stats();
            break;
        case "3":
            exit();
            break;
        default:
            console.error("Error: Torna a provar");
            startPenjat();
            break;
    }
}

//variables principals
let wordGuess = [];
let letters = "";
let attempts = 6;
let word = "";

//inici del joc
function start() {
    console.log("Escriu la paraula amb la que jugaràs per començar")
    word = prompt("Escriu la paraula amb la que jugaràs per començar");
    if (word == null || word.length < 1) {
        start();
        return;
    } 
    word = word.toLowerCase();
    saveData("gamesPlayed");
    for (let i = 0; i < word.length; i++) {
        wordGuess[i] = "_";
    }
    attempts = 6;
    letters = "";

    printWord(wordGuess);
    play();
}

//funció per jugar
function play() {
    while (true) {
        let guess = prompt("Escriu una lletra")
        if (attempts == 0) { return; }
        guess = guess.toLowerCase();
        if (guess.length != 1) {
            console.error("Incorrecte: escriu només una lletra");
            continue;
        } else if (!guess.match(/[a-z]/i)) {
            console.error("Incorrecte: només es poden escriure lletres");
            continue;
        } else if (letters.includes(guess)) {
            console.error("Incorrecte: aquesta lletra ja s'ha utilitzat");
            continue;
        }

        if (word.includes(guess)) {
            console.log("Correcte");
            for (let i = 0; i < word.length; i++) {
                if (word[i] == guess) {
                    wordGuess[i] = guess;
                }
            }
            if (checkWin(wordGuess)) {
                printWord(wordGuess);
                console.log("Has guanyat");
                saveData("gamesWon");
                return;
            }
        } else {
            console.log("Incorrecte!");
            attempts--;
        }
        letters += ` ${guess} `;
        printWord();
        printLettersAttempts();
        if (attempts == 0) {
            console.log("Has perdut");
            saveData("gamesLost");
            return;
        }
    }
}


function exit() {
    console.log("Gràcies per jugar");
    return;
}


function saveData(stat) {
    let statValue = localStorage.getItem(stat);
    if (statValue == null || isNaN(statValue)) {
        statValue = 0;
    }
    statValue = parseInt(statValue) + 1;
    localStorage.setItem(stat, statValue);
}

function clearData() {
    localStorage.clear();
}


function printWord() {
    let word = "";
    for (let i = 0; i < wordGuess.length; i++) {
        word += " "+wordGuess[i];
    }
    console.log(word);
}



function printLettersAttempts() {
    console.log(`Lletres utilitzades: ${letters}`);
    console.log(`Intents restants: ${attempts}`);
}

function stats() {
    let gamesPlayed = localStorage.getItem("gamesPlayed");
    let gamesWon = localStorage.getItem("gamesWon");
    let gamesLost = localStorage.getItem("gamesLost");

    console.log(`Games played: ${gamesPlayed}`);
    console.log(`Games won: ${gamesWon} (${((gamesWon/gamesPlayed)*100).toFixed(2)}%)`);
    console.log(`Games lost: ${gamesLost} (${((gamesLost/gamesPlayed)*100).toFixed(2)}%)`);
}




function checkWin() {
    if (!wordGuess.includes("_")) {
        return true;
    }
    return false;
}


