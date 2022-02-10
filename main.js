// Getting a random selection from the computer
const computerArray = ['Rock', 'Paper', 'Scissors'];
function getComputerSelection() {
  return computerArray[~~(Math.random() * computerArray.length)];
}

let playerWin;

// Drawing a round winner
function playRound(playerSelection, computerSelection) {
  if (
    playerSelection === 'Rock' ||
    playerSelection === 'Paper' ||
    playerSelection === 'Scissors'
  ) {
    if (playerSelection === computerSelection) {
      playerWin = 0;
      return "Oops! That's a draw";
    } else if (
      (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
      (playerSelection === 'Paper' && computerSelection === 'Rock') ||
      (playerSelection === 'Scissors' && computerSelection === 'Paper')
    ) {
      playerWin = 1;
      return `You win! ${playerSelection} beats ${computerSelection}!`;
    } else {
      playerWin = 2;
      return `You lose! ${computerSelection} beats ${playerSelection}`;
    }
  } else {
    playerWin = 0;
    return 'You must have typed the wrong word';
  }
}

// Initiating the score
let playerScore = 0;
let computerScore = 0;

let playGame = () => {
  // Getting the computer selection
  let computerSelection = getComputerSelection();
  // console.log('computer plays : ' + computerSelection);

  // Getting the user selection
  let playerInput = prompt('What do you wanna choose ?');
  let playerSelection = getPlayerSelection(playerInput);

  // Displaying the result of the round to the console
  console.log(playRound(playerSelection, computerSelection));

  // Updating the score
  if (playerWin === 1) {
    playerScore++;
  } else if (playerWin === 2) {
    computerScore++;
  }
  // Displaying the score in the console
  console.log(`You : ${playerScore} / Computer : ${computerScore}`);

  // Alert the player if they don't enter input
  function getPlayerSelection(playerInput) {
    if (playerInput === null) {
      console.log('You need to choose!');
    } else {
      playerInput = getCase(playerInput);
    }
    return playerInput;
  }
};

function displayResult() {
  console.log(
    `Final score : You got ${playerScore} point(s), and the machine got ${computerScore} point(s).`,
  );
  if (playerScore === computerScore) {
    console.log("That's a draw... Maybe one more time ?");
  } else if (playerScore > computerScore) {
    console.log('You won the game! Congrats!');
  } else {
    console.log('You lost the game... Try again!');
  }
}

// Ending the game at five wins
function loadGame() {
  do {
    playGame();
  } while (playerScore < 5 && computerScore < 5);
  displayResult();
}
loadGame();
//playGame();
//displayResult();

// Getting the user input case-insensitive
function getCase(input) {
  input = input.toLowerCase();
  input = input.charAt(0).toUpperCase() + input.slice(1);
  return input;
}
