let maxScore = 5;
let playerScore = 0;
let computerScore = 0;
let hasGameStarted = false;

const choices = document.querySelectorAll('.icon');
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        if (!isGameOver()) {
            playRound(choice.id);
        } 
    });
});

// changeDisplayIcon();

function playRound(playerSelection) {
    hasGameStarted = true;
    let result = getRoundResult(playerSelection);

    if (result == "win") {
        playerScore++;
    } else if (result == "lose") {
        computerScore++;
    }

    document.getElementById('player-score').innerHTML = `Player Score: ${playerScore}`;
    document.getElementById('computer-score').innerHTML = `Computer Score: ${computerScore}`;


    if (isGameOver()) {
        endTheGame();
    }
}

function getRoundResult(playerSelection) {
    let computerSelection = computerPlay()

    let playerIcon = document.getElementById('player-icon').src=`images/${playerSelection}.png`;
    let computerIcon = document.getElementById('computer-icon').src=`images/${computerSelection}.png`;

    let resultTable = {
        rock: {
            rock: 'draw',
            paper: 'lose',
            scissors: 'win'
        },
        paper: {
            rock: 'win',
            paper: 'draw',
            scissors: 'lose'
        },
        scissors: {
            rock: 'lose',
            paper: 'win',
            scissors: 'draw'
        }
    }
    
    let result = resultTable[playerSelection][computerSelection];
    if (result === 'win') {
        document.getElementById('round-summary').innerHTML = 'You win!';
    } else if (result === 'lose') {
        document.getElementById('round-summary').innerHTML = 'You lose!';
    } else {
        document.getElementById('round-summary').innerHTML = 'It\'s a draw!';
    }

    return result
}

function computerPlay() {
    let choices = ['rock', 'paper', 'scissors'];
    let computerSelection = choices[Math.floor(Math.random() * choices.length)];
    return computerSelection;
}

// function changeDisplayIcon() {
//     let icons = Array.from(document.querySelectorAll('.icon'));
//     let playerIndex = 0;
//     let computerIndex = 1;
//     let interval = setInterval(() => {
//         if (hasGameStarted) {
//             clearInterval(interval);
//         }
//         let playerSrc = `images/${icons[playerIndex++ % 3].id}.png`;
//         document.getElementById('player-icon').src = playerSrc;
//         let computerSrc = `images/${icons[computerIndex++ % 3].id}.png`;
//         document.getElementById('computer-icon').src = computerSrc;
//     }, 500);
// }

function isGameOver() {
    return Math.max(playerScore, computerScore) >= maxScore;
}

function endTheGame() {
    if (playerScore > computerScore) {
        document.getElementById('round-summary').innerHTML = 'Player won the game!';
    } else if (playerScore < computerScore) {
        document.getElementById('round-summary').innerHTML = 'Computer wins!<br>Try again next time!';
    }
}
