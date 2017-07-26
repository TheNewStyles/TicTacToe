(function() {

    var board = [];
    var mainClass = document.getElementsByClassName("main");
    var counter = 0;

    (function(){
    for (var i = 0; i <= 2; i++){
        board.push([0,0,0]);
    }
    })();
    console.log(board);

    function cool() {
        counter++;

        if (counter % 2 === 0){
            this.innerText = "X";
        }
        else {
            this.innerText = "O";
        }
    }

    Array.from(mainClass).forEach(function(element) {
        element.addEventListener('click', cool);
    });

})();
