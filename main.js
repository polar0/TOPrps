// Getting a random selection from the computer
const computerArray = ['Rock', 'Paper', 'Scissors'];
function computerPlay() {
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
      playerWin = null;
      return "Oops! That's a draw";
    } else if (
      (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
      (playerSelection === 'Paper' && computerSelection === 'Rock') ||
      (playerSelection === 'Scissors' && computerSelection === 'Paper')
    ) {
      playerWin = 1;
      return `You win! ${playerSelection} beats ${computerSelection}!`;
    } else {
      playerWin = 0;
      return `You lose! ${computerSelection} beats ${playerSelection}`;
    }
  } else {
    return 'You must have typed the wrong word';
  }
}

// Initiating the score
let playerScore = 0;
let computerScore = 0;

// Creating 5 rounds to play
for (let i = 0; i < 5; i++) {
  let game = () => {
    // Getting the computer selection
    let computerSelection = computerPlay();
    console.log('computer plays : ' + computerSelection);

    // Getting the user selection case-insensitive
    let playerInput = prompt('What do you wanna choose ?').toLowerCase();
    let playerSelection =
      playerInput.charAt(0).toUpperCase() + playerInput.slice(1);

    // Updating the score
    /*  if (playerWin === 'win') {
      console.log('yes');
    } else if (playerWin === 'lose') {
      console.log('no');
    } */
    console.log(playerWin);

    // Displaying the result of the round to the console
    console.log(playRound(playerSelection, computerSelection));
  };
  game();
}
