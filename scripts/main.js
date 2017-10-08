(function() {
    "use strict";

    let board = [];
    let counter = 0;
    const playerX = "X";
    const playerO = "O";
    let isGameComplete = false;
    let hasSelectedNumOfPlayers = false;
    let numOfPlayers = 0;
    let hasReset = false;

    const mainClass = document.getElementsByClassName("main");
    const resetButton = document.getElementById("popup-button");
    const resetButtonTie = document.getElementById("popup-button-tie");
    const playerSelectClass = document.getElementsByClassName("player-select");
    const winnerPopup = document.getElementById("winner");
    const tiePopup = document.getElementById("tie");

    //listeners
    Array.from(playerSelectClass).forEach(function(element) {
        element.addEventListener("click", playerSelect);
    });

    resetButton.addEventListener("click", reset);
    resetButtonTie.addEventListener("click", reset);


    //////////////////////////////////////////////////////////////////////////
    startUp();

    function startUp() {
        initBoard();
    }

    function initBoard() {
        for (let i = 0; i <= 2; i++){
            board.push([0,0,0]);
        }
    }

    function playerSelect(){
        numOfPlayers = this.innerText;
        document.getElementById("players").style.display = "none";
        hasSelectedNumOfPlayers = true;

        Array.from(mainClass).forEach(function(element) {
            element.removeEventListener("click", startSinglePlayer);
            element.removeEventListener("click", startTwoPlayer);
        });

        Array.from(mainClass).forEach(function(element) {
            if (numOfPlayers === "1") {
                element.addEventListener("click", startSinglePlayer);
            } else {
                element.addEventListener("click", startTwoPlayer);
            }
        });
    }

    function startSinglePlayer() {
        if (canExecuteTurn(this)) {
            hasReset = false;
            counter++;

            if (counter % 2 !== 0) {
                this.innerText = playerO;
                executePlayersTurn(this.id, playerO);
                checkForWinner();

                counter++;
                if (hasReset) {return;}
                executeAI();
            }
        }
    }

    function executeAI() {
        if (board[1][1] === 0) {
            setTimeout(function(){document.getElementById("cell11").innerText = playerX;}, 400);
            board[1][1] = "X";
            checkForWinner();
        } else {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === 0) {
                        updateAiCell(i,j);
                        board[i][j] = playerX;
                        checkForWinner();
                        return;
                    }
                }
            }
        }
    }

    function updateAiCell(i, j) {
        const row = i;
        const col = j;
        const cell = `cell${row}${col}`;
        setTimeout(function(){document.getElementById(cell).innerText = playerX;}, 400);
    }

    function startTwoPlayer() {
        if (canExecuteTurn(this)) {
            counter++;

            if (counter % 2 === 0) {
                this.innerText = playerX;
                executePlayersTurn(this.id, playerX);
                checkForWinner();
            } else {
                this.innerText = playerO;
                executePlayersTurn(this.id, playerO);
                checkForWinner();
            }
        }
    }

    function canExecuteTurn(element) {
        return (element.innerText != playerX
                && element.innerText != playerO
                && !isGameComplete
                && hasSelectedNumOfPlayers) ;
    }

    function executePlayersTurn(id, player) {
        const row = id.slice(4, 5);
        const col = id.slice(5, 6);

        board[row][col] = player;
    }

    function checkForWinner() {
        checkForWinnerRows();
        checkForWinnerColumns();
        checkForWinnerDiag();
        isBoardFull();
    }

    function isBoardFull() {
        let boardCounter = 0;

        Array.from(mainClass).forEach(function(element) {
            if (element.innerText !== "") {
                boardCounter++;

                if (boardCounter >= 9) {
                    resetAfterTie();
                    hasReset = true;
                }
            }
        });
    }

    function checkForWinnerRows() {
        for (let i = 0; i < board.length; i++){
            let oCounter = 0;
            let xCounter = 0;
            for (let j = 0; j < board[i].length; j++){
                if (board[i][j] === playerO) {
                    oCounter++;
                    checkWin(oCounter, playerO);
                } else if (board[i][j] === playerX) {
                    xCounter++;
                    checkWin(xCounter, playerX);
                }
            }
        }
    }

    function checkForWinnerColumns() {
        for (let i = 0; i < board.length; i++){
            iterateThroughColumn(i);
        }
    }

    function iterateThroughColumn(column) {
        let oCounter = 0;
        let xCounter = 0;

        for (let i = 0; i < board.length; i++) {
            if (board[i][column] === playerO){
                oCounter++;
                checkWin(oCounter, playerO);
            }
            else if (board[i][column] === playerX){
                xCounter++;
                checkWin(xCounter, playerX);
            }
        }
    }

    function checkForWinnerDiag() {
        bottomToTopDiag();
        topToBottomDiag();
    }

    function bottomToTopDiag() {
        let counter = 0;
        let oCounter = 0;
        let xCounter = 0;

        for (let j = board.length - 1; j >= 0; j--) {
            if (board[j][counter] === playerX){
                xCounter++;
                checkWin(xCounter, playerX);
            } else if (board[j][counter] === playerO){
                oCounter++;
                checkWin(oCounter, playerO);
            }
            counter++;
        }
    }

    function topToBottomDiag() {
        let oCounter = 0;
        let xCounter = 0;

        for (let i = 0; i < board.length; i++) {
            if (board[i][i] === playerX) {
                xCounter++;
                checkWin(xCounter, playerX);
            } else if (board[i][i] === playerO) {
                oCounter++;
                checkWin(oCounter, playerO);
            }
        }
    }

    function checkWin(counter, player) {
        if (counter > 2) {
            displayWinnerBox(player);
        }
    }

    function displayWinnerBox(player) {
        const popup = document.getElementById("winner");
        isGameComplete = true;
        popup.style.display = "inline";
        popup.firstElementChild.innerText = `${player} won the game!`;
    }

    function reset() {
        board = [];
        isGameComplete = false;
        hasSelectedNumOfPlayers = false;
        numOfPlayers = 0;
        counter = 0;
        initBoard();

        Array.from(mainClass).forEach(function(element) {
            element.innerText = "";
        });

        document.getElementById("players").style.display = "block";
        document.getElementById("tie").style.display = "none";
        winnerPopup.style.display = "none";
    }

    function resetAfterTie() {
        board = [];
        isGameComplete = false;
        hasSelectedNumOfPlayers = false;
        numOfPlayers = 0;
        counter = 0;
        initBoard();

        Array.from(mainClass).forEach(function(element) {
            element.innerText = "";
        });

        document.getElementById("tie").style.display = "block";
        tiePopup.firstElementChild.innerText = "The game ended in a tie."
    }

})();
