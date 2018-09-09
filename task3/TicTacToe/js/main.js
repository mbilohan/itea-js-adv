(function() {
    var field = document.getElementById('field');
    var buttons = field.children;

    var player1 = true,
        playersNames = document.querySelectorAll('.player');

    var score = {
        element: document.querySelector('.score'),
        message: document.getElementById('message'),
        player1: 0,
        player2: 0
    }

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

    var gameOver = function(isDraw) {
        field.removeEventListener('click', playerMove);
        field.setAttribute('data-disabled', true);

        if(isDraw) {
            message.textContent = 'No more moves. Please, start new game';
        } else {
            if(player1) {
                score.player1 += 1;
                message.textContent = 'Player 1 win!';
            } else {
                score.player2 += 1;
                message.textContent = 'Player 2 win!';

            }
            updateScore();
        }
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
            gameOver();

            return true;
        }

        return false;
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
            gameOver();

            return true;
        }

        return false;
    }

    var isDiagonalCompleted = function(value) {
        /* check diagonals */

        /* diagonal from top left to bottom right */
        var diagonal1 = true;
        for(var i = 0; i < 3; i++) {
            if(cells[i][i].dataset.value !== value){
                diagonal1 = false;
            }
        }

        if(diagonal1) {
            gameOver();

            return true;
        }

        /* diagonal from top right to bottom left */
        var diagonal2 = true;
        for(var i = 0; i < 3; i++) {
            if(cells[i][2 - i].dataset.value !== value){
                diagonal2 = false;
            }
        }

        if(diagonal2) {
            gameOver();

            return true;
        }

        return false;
    }

    var checkLines = function(cell, value) {
        var row = cell.dataset.row,
            col = cell.dataset.col;

        return isRowCompleted(value, row) || isColCompleted(value, col) || isDiagonalCompleted(value);
    }

    var changePlayer = function() {
        player1 = !player1;
        for(var i = 0; i < playersNames.length; i++) {
            playersNames[i].classList.toggle('active');
        }
    }

    var isCellFilled = function(cell) {
        /* check if cell is not empty */
        return cell.dataset.value !== undefined;
    }

    var isEmptyCells = function() {
        /* check if empty cells exist */
        var cellsFilled = true;
        for(var i = 0; i < buttons.length; i++) {
            if(buttons[i].dataset.value === undefined) {
                cellsFilled = false
            }
        }

        if(cellsFilled) {
            gameOver(true);

            return false;
        }

        return true;
    }

    var playerMove = function(event) {
        var cell = event.target;

        if(isCellFilled(cell) || cell.dataset.row === undefined) {
            return;
        };

        /* set value to cell */
        if(player1) {
            cell.dataset.value = 0;
        } else {
            cell.dataset.value = 1;
        }

        var value = event.target.dataset.value;

        var isGameOver = checkLines(cell, value);
        if(!isGameOver) {
            var isGameContinue = isEmptyCells();
        }
        if(isGameContinue) {
            changePlayer();
        }
    }

    var refreshField = function() {
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].removeAttribute('data-value');
        }

        player1 = true;
        field.removeAttribute('data-disabled');
        message.textContent = '';
    }
    var updateScore = function() {
        score.element.textContent = score.player1 + ' : ' + score.player2;

    }
    var startGame = function(option) {
        if(option !== undefined) {
            refreshField();
        }

        if(option === 'reset') {
            score.player1 = score.player2 = 0;
            updateScore();
        }

        createField();
        field.addEventListener('click', playerMove);
    }

    startGame();


    /* start new round */
    var btnStart = document.getElementById('btn-start');
    btnStart.addEventListener('click', function() {
        startGame('round');
    });

    /* reset score */
    var btnReset = document.getElementById('btn-reset');
    btnReset.addEventListener('click', function() {
        startGame('reset');
    })
})();