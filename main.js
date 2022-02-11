// Getting a random selection from the computer
const computerArray = ['Rock', 'Paper', 'Scissors'];
function getComputerSelection() {
  return computerArray[~~(Math.random() * computerArray.length)];
}

let playerWin;
let announce;

// Drawing a round winner
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    playerWin = 0;
    return (announce = "Oops! That's a draw");
  } else if (
    // If the player wins...
    (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
    (playerSelection === 'Paper' && computerSelection === 'Rock') ||
    (playerSelection === 'Scissors' && computerSelection === 'Paper')
  ) {
    playerWin = 1;
    return (announce = `You win! ${playerSelection} beats ${computerSelection}!`);
  } else {
    // Or if they lose...
    playerWin = 2;
    return (announce = `You lose! ${computerSelection} beats ${playerSelection}`);
  }
}

// Initiating the score
let playerScore = 0;
let computerScore = 0;

let playGame = (playerSelection) => {
  // Getting the computer selection
  let computerSelection = getComputerSelection();

  let result = playRound(playerSelection, computerSelection);

  console.log(playRound(playerSelection, computerSelection));

  // Updating the score
  if (playerWin === 1) {
    playerScore++;
  } else if (playerWin === 2) {
    computerScore++;
  }

  displayRound(result, playerScore, computerScore);
  return playerScore, computerScore;
};

// Displaying the result of the round
let resultArray = [];

function displayRound(result, playerScore, computerScore) {
  // Get the id of elements to display on HTML
  const container = document.querySelector('div');
  const newRound = document.querySelector('#newResult');
  const oldRounds = document.querySelector('#oldResult');
  const score = document.querySelector('#score');

  // Add the new round to the Array
  resultArray.unshift(result);
  // Append the last element (last round) to the DOM
  newRound.textContent = resultArray[0];
  container.appendChild(newRound);

  // Delete the oldest rounds from the Array
  if (resultArray.length > 5) {
    resultArray.pop();
  }

  // Keep the round history in a separate div
  oldRounds.textContent = resultArray.slice(1).join('\n');
  container.appendChild(oldRounds);

  // Display the current score at each round
  score.textContent = `You : ${playerScore} / Computer : ${computerScore}`;
  container.appendChild(score);
  console.log(`You : ${playerScore} / Computer : ${computerScore}`);
}

/* 
loadGame();

// Ending the game at five wins
function loadGame() {
  do {
    playGame();
  } while (playerScore < 5 && computerScore < 5);
  displayResult();
}
 */

const body = document.querySelector('body');
const buttons = document.querySelectorAll('button');

buttons.forEach((button) =>
  button.addEventListener('click', getPlayerSelection),
);

function getPlayerSelection() {
  console.log(this.id);
  let playerSelection = this.id;
  playGame(playerSelection);
  if (playerScore >= 5 || computerScore >= 5) {
    for (const button of buttons) {
      // button.remove();
      button.removeEventListener('click', getPlayerSelection);
    }
    displayResult();
  }
}

// Display the final score at the end of the game
function displayResult() {
  // Get the div id and create paragraphs for logs
  const finalScore = document.querySelector('#finalScore');
  const scoreLog = document.createElement('p');
  const scoreGreetings = document.createElement('p');
  scoreLog.setAttribute('id', 'scorePoints');
  scoreGreetings.setAttribute('id', 'scoreGreetings');

  // Set the content according to the stats of the game
  scoreLog.textContent = `Final score : You got ${playerScore} point(s), and the machine got ${computerScore} point(s).`;

  if (playerScore > computerScore) {
    scoreGreetings.textContent = 'You won the game! Congrats!';
  } else {
    scoreGreetings.textContent = 'You lost the game... Maybe next time!';
  }

  // Create a button to play again (reload the page)
  const again = document.createElement('button');
  again.textContent = 'Play again';
  again.addEventListener('click', () => location.reload());

  // Append the newly created elements to the div
  finalScore.appendChild(scoreLog);
  finalScore.appendChild(scoreGreetings);
  // Button to be added front page and blur everything
  finalScore.appendChild(again);
}
