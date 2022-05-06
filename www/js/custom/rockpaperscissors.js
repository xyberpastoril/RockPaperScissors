// Initialize elements
var gameBtnBarElement,
    gameBtnElements,
    inGameImageElement,
    questionTextElement,
    computerResponseTextElement,
    computerResponseContainerElement,
    nextRoundBtnElement;

// Initialize game-related variables
var gameStatus = 0, 
    gameChoices = ['Rock', 'Paper', 'Scissors'];

var loader = setInterval(function () {
    if(document.readyState !== "complete") return;
    clearInterval(loader);
    alert('Document loaded successful!');

    gameBtnBarElement = document.getElementById('rockPaperScissors-button-bar1');
    console.log(gameBtnBarElement);
    gameBtnElements = document.querySelectorAll('.game-userpicks');
    
    inGameImageElement = document.getElementById('rockPaperScissors-image1');
    questionTextElement = document.getElementById('rockPaperScissors-markdown1');
    computerResponseTextElement = document.getElementById('gameMessage');
    computerResponseContainerElement = document.getElementById('rockPaperScissors-markdown3');
    
    nextRoundBtnElement = document.getElementById('rockPaperScissors-button10');

    gameBtnElements.forEach(function(btn){
        btn.addEventListener('click', function(event){
            let userPick = event.target.innerText;
            console.log(`User has picked "${userPick}".`);
            let computerPick = determineComputerPick();
            console.log(`Computer has picked "${computerPick}.`);
                        
            outcome = comparePicks(userPick, computerPick);
            showResultMessage(userPick, computerPick, outcome);

            toggleGameBtnBarElement();
        });
    });
    
    nextRoundBtnElement.addEventListener('click', function(event){
        console.log(event);
        toggleGameBtnBarElement();
    });
}, 300);

function determineComputerPick()
{
    const random = Math.floor(Math.random() * gameChoices.length);

    if(gameChoices[random] == 'Rock') {
        inGameImageElement.src = "img/rock.png";
    }
    else if(gameChoices[random] == 'Paper') {
        inGameImageElement.src = "img/paper.png";
    }
    else if(gameChoices[random] == 'Scissors') {
        inGameImageElement.src = "img/scissors.png";
    }

    return gameChoices[random];
}

function comparePicks(user, computer)
{
    let outcome;
    if(user == 'Rock' && computer == 'Rock') {
        outcome = 'tie';
    }
    else if(user == 'Rock' && computer == 'Paper') {
        outcome = 'loss';
    }
    else if(user == 'Rock' && computer == 'Scissors') {
        outcome = 'win';
    }
    else if(user == 'Paper' && computer == 'Rock') {
        outcome = 'win';
    }
    else if(user == 'Paper' && computer == 'Paper') {
        outcome = 'tie';
    }
    else if(user == 'Paper' && computer == 'Scissors') {
        outcome = 'loss';
    }
    else if(user == 'Scissors' && computer == 'Rock') {
        outcome = 'loss';
    }
    else if(user == 'Scissors' && computer == 'Paper') {
        outcome = 'win';
    }
    else if(user == 'Scissors' && computer == 'Scissors') {
        outcome = 'tie';
    }
    return outcome;
}

function showResultMessage(userPick, computerPick, outcome)
{
    let msg = `You chose <strong>${userPick}</strong>. I chose <strong>${computerPick}</strong>. `;
    if(outcome == 'win') msg += `<strong style="color:#17d84e">You got me!</strong>`;
    else if(outcome == 'tie') msg += `<br><strong style="color:#17a8d8">We've got the same thought.</strong>`;
    else if(outcome == 'loss') msg += `<strong style="color:#d81717">Nice try!</strong>`;

    console.log(msg);
    
    computerResponseTextElement.innerHTML = msg;
}

function toggleGameBtnBarElement()
{
    console.log("Toggle");
    // If user picks between rock/paper/scissors
    if(gameStatus == 0) {
        gameBtnBarElement.style = "display:none";
        questionTextElement.style = "display:none";
        nextRoundBtnElement.style = "display:flex";
        computerResponseContainerElement.style = "display:flex";
        gameStatus++;
    }
    // If user clicks next round
    else {
        gameBtnBarElement.style = "display:flex";
        questionTextElement.style = "display:flex";
        nextRoundBtnElement.style = "display:none";
        computerResponseContainerElement.style = "display:none";
        inGameImageElement.src = "img/rockpaperscissors.png";
        gameStatus--;
    }
}