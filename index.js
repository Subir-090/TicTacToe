let listOfCells = document.querySelectorAll('td');
let contentsOfCells = [];
let countOfCellsFilled = 0;

const unfilledCellColor = '#FFC0CB';
const player1Color = '#90EE90';
const player2Color = '#0000FF';

const drawMessage = 'The Match is Drawn!!';
const winMessage = `Player {i} has Won!!`;

const winColor = '#FFA500';

const resetBtn = document.querySelector('#reset');
const result = document.querySelector('#displayResult');

const winningWays = [[0,1,2],[0,3,6],[0,4,8],[3,4,5],[6,7,8],
                    [2,5,8],[1,4,7],[2,4,7]];

let currentPlayer = 0;

function reset() {
    gameStatus = false;

    for(let i = 0;i < listOfCells.length;i++) {
        listOfCells[i].innerText = '';
        listOfCells[i].style.backgroundColor = unfilledCellColor;
        contentsOfCells[i] = -1;
    }

    currentPlayer = 0;
    countOfCellsFilled = 0;

    result.innerText = '';

}

function initialSetUp() {

    reset();

    const borderPattern = '2px solid black';
    const boundaries = [[0,1,3],[0,1,3],[0,1,2,3],
                        [0,3],[0,3],[0,3,2],                        
                        [0,3],[0,3],[0,3,2]];
    for(let i = 0;i < listOfCells.length;i++) {
        listOfCells[i].setAttribute('ind',`${i}`);

        for (let j = 0;j < boundaries[i].length;j++) {
            let direction = boundaries[i][j];
            if(direction == 0) {
                listOfCells[i].style.borderLeft = borderPattern;
            } else if(direction == 1) {
                listOfCells[i].style.borderTop = borderPattern;
            } else if(direction == 2) {
                listOfCells[i].style.borderRight = borderPattern;
            } else {
                listOfCells[i].style.borderBottom = borderPattern;
            }
        }

        contentsOfCells.push(-1);
        
        listOfCells[i].addEventListener('click',handleClick);

    }

    resetBtn.addEventListener('click',reset);

}

function handleClick(event) {

    if(gameStatus) {
        alert('This Game is finished!. So we are '+
            'starting a new one for you!');
        return;
    }

    let element = event.target;

    const ind = element.getAttribute('ind');
    if(contentsOfCells[ind] != -1) {
        alert('This Cell is already filled!!');
        return;
    }

    changeCellColor(element);
    element.innerText = currentPlayer;
    contentsOfCells[ind] = currentPlayer;
    countOfCellsFilled++;

    const status = hasCurrentPlayerWon();

    if(countOfCellsFilled == 9 && status == false) {
        result.innerText = drawMessage;
        gameStatus = true;
        giveTimeToUser();
    }

    if(status == true) {
        gameStatus = true;
        giveTimeToUser();
        return;
    }

    changePlayer();
}

function changeCellColor(element) {
    if(currentPlayer == 0) {
        element.style.backgroundColor = player1Color;
    } else {
        element.style.backgroundColor = player2Color;
        element.style.color = 'white';
    }
}

function giveTimeToUser() {
    setTimeout(reset,3000);
}

function hasCurrentPlayerWon() {
    for(let i = 0;i < winningWays.length;i++) {
        const ind1 = winningWays[i][0],ind2 = winningWays[i][1],ind3 = winningWays[i][2];
        if(contentsOfCells[ind1] == contentsOfCells[ind2]
            && contentsOfCells[ind2] == contentsOfCells[ind3]
            && contentsOfCells[ind1] != -1) {
            result.innerText = winMessage.replace('{i}',currentPlayer);
            
            changeColor(winningWays[i],winColor);

            return true;
        }
    }
    return false;
}

function changeColor(winingCells,color) {
    for(let i = 0;i < winingCells.length;i++) {
        listOfCells[winingCells[i]].style.backgroundColor = color;
    }
}

function changePlayer() {
    currentPlayer = Number(!currentPlayer);
}

initialSetUp();






