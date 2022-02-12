// Getting a random selection from the computer
const computerArray = ['Potion', 'Spell', 'Sword'];
function getComputerSelection() {
  return computerArray[~~(Math.random() * computerArray.length)];
}

let announce = [];

// Drawing a round winner
function playRound(playerSelection, computerSelection) {
  // Defining the return array for each case
  announce[0] = "Oops! That's a draw";
  announce[1] = `You win! ${playerSelection} beats ${computerSelection}!`;
  announce[2] = `You lose! ${computerSelection} beats ${playerSelection}`;
  // Defining the winning condition
  if (playerSelection === computerSelection) {
    return announce[0];
  } else if (
    // If the player wins...
    (playerSelection === 'Potion' && computerSelection === 'Sword') ||
    (playerSelection === 'Spell' && computerSelection === 'Potion') ||
    (playerSelection === 'Sword' && computerSelection === 'Spell')
  ) {
    return announce[1];
  } else {
    // Or if they lose...
    return announce[2];
  }
}

// Initiating the score
let playerScore = 0;
let computerScore = 0;

function playGame(playerSelection, computerSelection) {
  // Drawing the result of the round
  let result = playRound(playerSelection, computerSelection);

  // Updating the score
  if (result === announce[1]) {
    playerScore++;
  } else if (result === announce[2]) {
    computerScore++;
  }

  // Asking to display the result of the round (after a bit of suspense...)
  setTimeout(displayRound, 1000, result, playerScore, computerScore);
  return computerSelection;
}

const buttons = document.querySelectorAll('input');

// Get the player selection on click
for (const button of buttons) {
  button.addEventListener('click', receiveSelection);
}

let ended = false;

function receiveSelection() {
  // Catching the player selection
  let playerSelection = this.id;
  // Getting the random computer selection
  let computerSelection = getComputerSelection();

  // Launch the round and the animation
  playGame(playerSelection, computerSelection);
  animateButton(playerSelection, computerSelection);

  // Prevent the player from clicking right away
  for (const button of buttons) {
    button.removeEventListener('click', receiveSelection);
  }

  setTimeout(function () {
    if (playerScore >= 5 || computerScore >= 5) {
      // Display the result at 5 points, and tell the game has ended
      displayResult();
      ended = true;
      // Change the animation to show the player they can't continue
      buttons.forEach((button) =>
        button.addEventListener('click', animateEndButton),
      );
    } else {
      // If it's not ended, let the user click again (after one second)
      for (const button of buttons) {
        button.addEventListener('click', receiveSelection);
      }
    }
  }, 1000);
}

let resultArray = [];

// Get the id of elements to display on HTML
const newRound = document.querySelector('#newResult');
const oldRounds = document.querySelector('#oldResult');
const playerScoreLog = document.querySelector('#playerScore');
const computerScoreLog = document.querySelector('#computerScore');

// Displaying the result of the round
function displayRound(result, playerScore, computerScore) {
  // Add the new round to the beginning of the Array then to the div
  resultArray.unshift(result);
  newRound.textContent = resultArray[0];

  // Display the right color for win / lose / tie game
  if (resultArray[0] === announce[0]) {
    newRound.setAttribute('style', 'color: white');
  } else if (resultArray[0] === announce[1]) {
    newRound.setAttribute('style', 'color: green');
  } else {
    newRound.setAttribute('style', 'color: red');
  }

  // Delete the oldest rounds from the Array
  if (resultArray.length > 5) {
    resultArray.pop();
  }

  // Keep the round history in a separate div
  oldRounds.textContent = resultArray.slice(1).join('\n');

  // Display the current score at each round
  playerScoreLog.textContent = playerScore;
  computerScoreLog.textContent = computerScore;
}

function animateButton(playerSelection, computerSelection) {
  for (const button of buttons) {
    // Animate the computer selection
    if (button.id === computerSelection) {
      // If player and computer choose the same object
      if (playerSelection === computerSelection) {
        button.setAttribute('class', 'animate-button-same');
        // Animate toward the player selection
      } else if (
        button.id === 'Potion' ||
        (button.id === 'Spell' && playerSelection === 'Sword')
      ) {
        button.setAttribute('class', 'animate-computer-button-right');
      } else {
        button.setAttribute('class', 'animate-computer-button-left');
      }
    }
    // Animate the player selection
    if (button.id === playerSelection) {
      // If the game has not ended and the selection is not similar
      if (ended === false) {
        if (playerSelection !== computerSelection) {
          // Perform the regular animation
          button.setAttribute('class', 'animate-user-button');
        }
      }
    }
    // Remove the animation class after it's done to prepare the next one
    setTimeout(function () {
      button.removeAttribute('class');
    }, 1000);
  }
}

// If it has ended, let the player know with a different animation
function animateEndButton() {
  this.setAttribute('class', 'animate-button-end');
  let button = this;
  setTimeout(function () {
    button.removeAttribute('class');
  }, 1000);
}

// Display the final score at the end of the game
function displayResult() {
  // Get the div id and create paragraphs for logs
  const finalScore = document.querySelector('#finalScore');
  const scoreLog = document.createElement('p');

  // Remove the rounds logs
  newRound.remove();
  oldRounds.remove();
  const titles = document.querySelectorAll('h2');
  for (const title of titles) {
    title.remove();
  }
  // Remove the instructions
  const instructions = document.querySelector('#instructions');
  instructions.remove();

  // Set the content according to the stats of the game
  if (playerScore > computerScore) {
    scoreLog.textContent = 'You won the game! Congrats!';
  } else {
    scoreLog.textContent = 'You lost the game... Maybe next time!';
  }

  // Create a button to play again (reload the page)
  const again = document.createElement('button');
  again.textContent = 'PLAY AGAIN ?';
  again.addEventListener('click', () => location.reload());

  // Append the newly created elements to the div
  finalScore.appendChild(scoreLog);
  finalScore.appendChild(again);
}
