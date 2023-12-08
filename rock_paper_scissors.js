const HAND_MAP = {
  0: "Rock",
  1: "Paper",
  2: "Scissors",
  Rock: 0,
  Paper: 1,
  Scissors: 2,
};

function getComputerChoice() {
  let rand = Math.floor(Math.random() * 3); // 0, 1, or 2
  return HAND_MAP[rand];
}

function capitalize(string) {
  if (string.length == 0 || isNumeric(string)) {
    return "";
  }
  return string[0].toUpperCase() + string.slice(1);
}

function isNumeric(string) {
  let regex = /^\d+$/;
  return regex.test(string);
}

function game() {
  const ROUNDS = 5;
  let playerScore = 0;
  let computerScore = 0;
  for (i = 0; i < ROUNDS; i++) {
    let result = playRound(getPlayerHand());
    result === "win" ? (playerScore += 1) : (computerScore += 1);
  }
  let winner = playerScore > computerScore ? "player" : "computer";
  console.log(
    `The winner is the ${winner}! The score is: ${playerScore} vs ${computerScore}`
  );
}

function getPlayerHand() {
  while (true) {
    let playerSelection = prompt("Pick your hand! [Rock, Paper, Scissors]");
    let capitalizedSelection = capitalize(playerSelection);
    if (HAND_MAP[capitalizedSelection] != undefined) {
      return capitalizedSelection;
    }
    console.log(
      `${playerSelection} is an invalid hand! Please choose: rock, paper, or scissors.`
    );
  }
}

function playRound(playerSelection, computerSelection = getComputerChoice()) {
  let result = getResult(playerSelection, computerSelection);
  switch (result) {
    case "tie":
      console.log(`You tied! Keep going until one of you wins!`);
      return playRound(getPlayerHand());
      break;

    case "win":
      console.log(`You win! ${playerSelection} beats ${computerSelection}!`);
      return result;
      break;

    case "lose":
      console.log(`You lose! ${computerSelection} beats ${playerSelection}!`);
      return result;
      break;
  }
}

function getResult(playerHand, computerHand) {
  let playerHandIdx = HAND_MAP[playerHand];
  let computerHandIdx = HAND_MAP[computerHand];
  if (playerHandIdx === computerHandIdx) {
    return "tie";
  } else if ((computerHandIdx + 1) % 3 === playerHandIdx) {
    return "win";
  } else {
    return "lose";
  }
}
