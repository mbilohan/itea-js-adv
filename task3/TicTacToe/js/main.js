(function() {
    var field = document.getElementById('field');
    var buttons = field.children;

    var player1 = true;

    var cells = [
        [],
        [],
        []
    ];

    var createField = function() {
        for(var i = 0; i < buttons.length; i++) {
            cells[buttons[i].dataset.row][buttons[i].dataset.col] = buttons[i];
        }
    }

    var gameOver = function(msg) {
        field.removeEventListener('click', playerMove);
        alert('the game is over!!! Something should happen...  ' + msg);
    }

    var isRowCompleted = function(value, row) {
        /* check horizontal line */
        var rowLine = true;
        for(var i = 0; i < 3; i++) {
            if(cells[row][i].dataset.value !== value){
                rowLine = false;
            }
        }

        if(rowLine) {
            gameOver('row complete');
        }
    }

    var isColCompleted = function(value, col) {
        /* check vertical line */
        var colLine = true;
        for(var i = 0; i < 3; i++) {
            if(cells[i][col].dataset.value !== value){
                colLine = false;
            }
        }

        if(colLine) {
            gameOver('col complete');
        }
    }

    var isDiagonalCompleted = function(value) {
        /* check diagonals */
        /* TODO: add condition when diagonals should be checked */

        /* diagonal from top left to bottom right */
        var diagonal1 = true;
        for(var i = 0; i < 3; i++) {
            if(cells[i][i].dataset.value !== value){
                diagonal1 = false;
            }
        }

        if(diagonal1) {
            gameOver('diagonal1 complete');
            return false;
        }

        /* diagonal from top right to bottom left */
        var diagonal2 = true;
        for(var i = 0; i < 3; i++) {
            if(cells[i][2 - i].dataset.value !== value){
                diagonal2 = false;
            }
        }

        if(diagonal2) {
            gameOver('diagonal2 complete');
        }
    }

    var checkLines = function(cell, value) {
        var row = cell.dataset.row,
            col = cell.dataset.col;

        isRowCompleted(value, row);
        isColCompleted(value, col);
        isDiagonalCompleted(value);
    }

    var changePlayer = function() {
        player1 = !player1;
        document.querySelector('.scoreboard').classList.toggle('player-second');
    }

    var isCellFilled = function(cell) {
        /* check if cell is not empty */
        return cell.dataset.value !== undefined;
    }

    var isFieldFilled = function() {
        /* check if empty cells exist */
        var cellsFilled = true;
        for(var i = 0; i < buttons.length; i++) {
            if(buttons[i].dataset.value === undefined) {
                cellsFilled = false
            }
        }

        if(cellsFilled) {
            gameOver();
        }
    }

    var playerMove = function(event) {
        var cell = event.target;

        if(isCellFilled(cell)) {
            return;
        };

        /* set value to cell */
        if(player1) {
            cell.dataset.value = 0;
        } else {
            cell.dataset.value = 1;
        }

        var value = event.target.dataset.value;

        checkLines(cell, value);
        changePlayer();

        isFieldFilled();

    }

    var startGame = function() {
        createField();
        field.addEventListener('click', playerMove);
    }

    startGame();

})();