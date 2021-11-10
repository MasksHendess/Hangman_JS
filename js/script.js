
function init() {
    activateStartButton();
}
window.onload = init;

// Globals -----------------------------------------------------------------------------------------------------------------------
const wordList = ["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANTÖRA", "JULTOMTE", "SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA", "KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD"];
// 29 random Words btw
let theWord = "";
let displayedWord = [];
let wrongGuesses = 0;
let guessedLetters = [];
let startTime;
let positionofPreviousWord = 1000; // Wont get same word twice!


// Game Start and End ---------------------------------------------------------------------------------------------------------------------

function startGame() {

    // Assign & display new random Word
    let randomNumber = getRandomInt();
    theWord = wordList[randomNumber]; // Random word is assigned
    displayedWord = Array(theWord.length).fill(" "); // not how its supposed 2 be !?!?!?!?
    console.log("The word is: " + theWord);

    document.getElementById("hangman").src = "img/h0.png";


    // reset variables and texts from previous game
    wrongGuesses = 0;
    guessedLetters = [];
    document.getElementById("message").innerHTML = "";
    document.getElementById("guessedLetters").innerHTML = guessedLetters;

    showLetterBoxes(theWord);


    // Enable Letter Buttons Disable Start Button
    activateLetterButtons()

    // Timer Start Point
    let timer = new Date();
    startTime = timer.getTime();

    //Good to go!
}

function endGame(state) {

    let message = document.getElementById("message");

    // Determine if user won or lost
    if (state == "win") {
        message.innerHTML = "Grattis du har vunnit!";
    }
    else if (state == "lose") {
        message.innerHTML = "Du är hängd! \n Ordet var:" + theWord;
    }

    let runTime = (new Date().getTime() - startTime) / 1000; // Determine playtime through Math
    message.innerHTML += "<br>Det tog " + runTime + " sekunder.";

    //User can start New Game
    activateStartButton();
}

// Guesses -------------------------------------------------------------------------------------------------------------------------

function pressButton(letter) {
    let letterIsRightGuess = new Boolean(false);

    for (let i = 0; i < theWord.length; i++) // iterate trogh theWord checking if it contains letter
    {
        if (letter === theWord[i]) {
            rightGuess(letter, i);
            letterIsRightGuess = true;
        }
    }

    if (letterIsRightGuess != true) // This block executes when theWord doesnt contain the guessed letter.
    {
        wrongGuess(letter);
    }

    disableButton(letter); //  user shouldnt be able to guess the same thing twice regardless if the guess was right or wrong.
}

function rightGuess(letter, i) {

    displayedWord[i] = letter;
    showLetterBoxes(theWord);

    let winCondtition = new Boolean(true);

    if (displayedWord.includes(" ")) { // Empty spaces represent ungesed letters
        winCondtition = false;
    }

    if (winCondtition == true) {
        endGame("win");
    }
}

function wrongGuess(letter) {
    wrongGuesses++;
    console.log("Wrong guess! you have " + wrongGuesses + " wrong guesses.");

    // Display hangman Image based on how many wrong guesses user has
    switch (Number(wrongGuesses)) {
        case 1:
            document.getElementById("hangman").src = "img/h1.png";
            break;
        case 2:
            document.getElementById("hangman").src = "img/h2.png";
            break;
        case 3:
            document.getElementById("hangman").src = "img/h3.png";
            break;
        case 4:
            document.getElementById("hangman").src = "img/h4.png";
            break;
        case 5:
            document.getElementById("hangman").src = "img/h5.png";
            break;
        case 6:
            document.getElementById("hangman").src = "img/h6.png";
            endGame("lose");
            break;
    }

    // Write wrong guesses
    guessedLetters.push(letter);
    let guessed = document.getElementById("guessedLetters");
    let text = "Felaktiga bokstäver: ";
    for (let i = 0; i < guessedLetters.length; i++) {
        text += guessedLetters[i];
    }
    guessed.innerHTML = text;
}

// Button enable / Disable functions ----------------------------------------------------------------------------------------------

function disableButton(letter) {
    let letterButtons = document.querySelectorAll("#letterButton");
    for (let i = 0; i < letterButtons.length; i++) {
        if (letterButtons[i].value == letter) {
            letterButtons[i].disabled = true;
        }
    }

    let button = document.getElementById(letter);
}


function activateStartButton() {
    //Enable Start Button
    startGameButton = document.getElementById("startGameBtn");
    startGameButton.disabled = false;

    //Disable Letter Buttons
    let letterButtons = document.querySelectorAll("#letterButton");
    for (let i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = true;
    }
}

function activateLetterButtons() {
    // Enable Buttons
    let letterButtons = document.querySelectorAll("#letterButton");
    for (let i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = false;
    }
    // Disable Start Button
    startGameButton = document.getElementById("startGameBtn");
    startGameButton.disabled = true;
}

// Misc functions ------------------------------------------------------------------------------------------------------------------

function getRandomInt() {
    let randomInt = Math.floor(Math.random() * 28) // RNG int 0 - 28 ( array storlek )
    if (randomInt == positionofPreviousWord) {
        randomInt = getRandomInt(); // RECURSION Untill a new int is generated 
    }

    positionofPreviousWord = randomInt;
    return randomInt;
}

function showLetterBoxes(theWord) {
    let text = "";
    for (let i = 0; i < theWord.length; i++) {
        text += "<span>&nbsp; " + displayedWord[i] + "</span>" // white spaces foreach letter in theWord
    }
    document.getElementById("letterBoxes").innerHTML = text;
}

