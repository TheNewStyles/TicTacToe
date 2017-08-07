(function() {

    var board = [];
    var counter = 0;
    var playerX = "X";
    var playerO = "O";
    var isGameComplete = false;
    var hasSelectedNumOfPlayers = false;
    var numOfPlayers = 0;
    var hasReset = false;

    var mainClass = document.getElementsByClassName("main");
    var resetButton = document.getElementById("popup-button");
    var resetButtonTie = document.getElementById("popup-button-tie");
    var playerSelectClass = document.getElementsByClassName("player-select");
    var winnerPopup = document.getElementById("winner");
    var tiePopup = document.getElementById("tie");

    //listeners
    Array.from(playerSelectClass).forEach(function(element) {
        element.addEventListener("click", playerSelect);
    })

    resetButton.addEventListener("click", reset);
    resetButtonTie.addEventListener("click", reset);


    //////////////////////////////////////////////////////////////////////////
    startUp();

    function startUp() {
        initBoard();
    }

    function initBoard() {
        for (var i = 0; i <= 2; i++){
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
            for (var i = 0; i < board.length; i++) {
                for (var j = 0; j < board[i].length; j++) {
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
        var row = i;
        var col = j;
        var cell = "cell" + row + col;
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
        var row = id.slice(4, 5);
        var col = id.slice(5, 6);

        board[row][col] = player;
    }

    function checkForWinner() {
        checkForWinnerRows();
        checkForWinnerColumns();
        checkForWinnerDiag();
        isBoardFull();
    }

    function isBoardFull() {
        var boardCounter = 0;

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
        for (var i = 0; i < board.length; i++){
            var oCounter = 0;
            var xCounter = 0;
            for (var j = 0; j < board[i].length; j++){
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
        for (var i = 0; i < board.length; i++){
            iterateThroughColumn(i);
        }
    }

    function iterateThroughColumn(column) {
        var oCounter = 0;
        var xCounter = 0;

        for (var i = 0; i < board.length; i++) {
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
        var counter = 0;
        var oCounter = 0;
        var xCounter = 0;

        for (var j = board.length - 1; j >= 0; j--) {
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
        var oCounter = 0;
        var xCounter = 0;

        for (var i = 0; i < board.length; i++) {
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
        var popup = document.getElementById("winner");
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
