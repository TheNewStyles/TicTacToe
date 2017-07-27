(function() {

    var board = [];
    var mainClass = document.getElementsByClassName("main");
    var counter = 0;
    var playerX = "X";
    var playerO = "O";

    initBoard();


    Array.from(mainClass).forEach(function(element) {
            element.addEventListener('click', start);
    });

    function initBoard() {
        for (var i = 0; i <= 2; i++){
            board.push([0,0,0]);
        }
    }

    function start() {
        if(this.innerText != playerX && this.innerText != playerO) {
            counter++;

            if (counter % 2 === 0) {
                this.innerText = playerX;
                executePlayersTurn(this.id, playerX)
                checkForWinnerHorizontal();
                checkForWinnerVertically();
            }
            else {
                this.innerText = playerO;
                executePlayersTurn(this.id, playerO);
                checkForWinnerHorizontal();
                checkForWinnerVertically();
            }
        }
    }

    function executePlayersTurn(id, player) {
        var row = id.slice(0,1);
        var col = id.slice(2,3);

        board[row][col] = player;
        console.log(board);
    }

    function checkForWinnerHorizontal() {
        for (var i = 0; i < board.length; i++){
            var oCounter = 0;
            var xCounter = 0;
            for (var j = 0; j < board[i].length; j++){
                if (board[i][j] === playerO) {
                    oCounter++;
                    if(oCounter > 2){
                        console.log("O PLAYER WON");
                    }
                }else if (board[i][j] === playerX){
                    xCounter++;
                    if(xCounter > 2){
                        console.log("X PLAYER WON");
                    }
                }
            }
        }
    }

    function checkForWinnerVertically() {

        for (var i = 0; i < board.length; i++){
            iterateThroughColumn(i);
        }
    }

    function iterateThroughColumn(column) {
        var oCounter = 0;
        var xCounter = 0;

        for (var i = 0; i < board.length; i++)
        {
            if (board[i][column] === playerO){
                oCounter++;
                if (oCounter > 2){
                    console.log("O PLAYER WON");
                }
            }
            if (board[i][column] === playerX){
                xCounter++;
                if (xCounter > 2){
                    console.log("X PLAYER WON");
                }
            }
        }
    }
})();
