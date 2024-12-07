// Step 1: Game variables
const words = ["laptop", "computer science", "developer", "programming", "coding"];
const word = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(word.length).fill("_");
let attempts = 0;
const maxAttempts = 10;

// Step 2: Select HTML elements
const wordElement = document.getElementById("word");
const keyboardElement = document.getElementById("keyboard");
const messageElement = document.getElementById("message");
const hangmanParts = document.querySelectorAll(".hangman-part");

// Step 3: Display the word placeholders
function updateWordDisplay() {
  wordElement.innerHTML = guessedWord.map(letter => `<span class="letter">${letter}</span>`).join("");
}

// Step 4: Generate the keyboard
function createKeyboard() {
  for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.textContent = String.fromCharCode(i); // Generate letters a-z
    button.addEventListener("click", () => handleGuess(button.textContent, button));
    keyboardElement.appendChild(button);
  }
}

// Step 5: Handle guesses
function handleGuess(letter, button) {
  button.disabled = true; // Disable the button after clicking
  if (word.includes(letter)) {
    // Correct guess
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) guessedWord[i] = letter;
    }
    updateWordDisplay();
    if (!guessedWord.includes("_")) {
      messageElement.textContent = "🎉 You win! The word was: " + word;
      disableKeyboard();
    }
  } else {
    // Incorrect guess
    attempts++;
    updateHangman();
    if (attempts === maxAttempts) {
      messageElement.textContent = "💀 Game over! The word was: " + word;
      disableKeyboard();
    }
  }
}

// Step 6: Update the Hangman visual
function updateHangman() {
  if (attempts <= maxAttempts) {
    hangmanParts[attempts - 1].style.display = "block";
  }
}

// Step 7: Disable the keyboard (end the game)
function disableKeyboard() {
  const buttons = keyboardElement.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
}

// Initialize the game
updateWordDisplay();
createKeyboard();
