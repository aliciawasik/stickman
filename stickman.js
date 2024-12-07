// GAME LOGIC!

// Game Variables
const words = ["javascript", "coding", "hangman", "developer", "html"];
const word = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(word.length).fill("_");
let attempts = 6;

// HTML Elements
const wordElement = document.getElementById("word");
const keyboardElement = document.getElementById("keyboard");
const messageElement = document.getElementById("message");

// Display word placeholders
function updateWordDisplay() {
    wordElement.textContent = guessedWord.join(" ");
}

// Generate keyboard
function createKeyboard() {
    for (let i = 97; i <= 122; i++) {
        const button = document.createElement("button");
        button.textContent = String.fromCharCode(i); // Generates letters a-z
        button.addEventListener("click", () => handleGuess(button.textContent, button));
    }
}

// Handle guesses
function handleGuess(letter, button) {
    button.disabled = true; // Disables the button after clicking
    if (word.includes(letter)) {
        // Correct guess
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) guessedWord[i] = letter;
        }
        updateWordDisplay();
        id (!guessedWord.includes("_")) {
            messageElement.textContent = "🎉 You Win! The word was: " + word;
            disableKeyboard();
        }
    } else {
        // Incorrect guess
        attempts--;
        messageElement.textContent = '❌ Incorrect! ${attempts} attemps left.';
        if (attempts === 0) {
            messageElement.textContent = "💀 Game Over! The word was: " + word;
        }
    }
}

// Disable the keyboard (end the game)
function disableKeyboard() {
    const buttons = keyboardElement.querySelectorAll("button"); 
    buttons.forEach((button) => (button.disabled = true));
}

// Initialize the game
updateWordDisplay();
createKeyboard();