(function() {
    var field = document.getElementById('field');
    var buttons = field.children;

    var player1 = true;

    var cells = [
        [],
        [],
        []
    ];

    for(var i = 0; i < buttons.length; i++) {
        cells[buttons[i].dataset.row][buttons[i].dataset.col] = buttons[i];
    }

    field.addEventListener('click', function(event) {
        var cell = event.target,
            row = cell.dataset.row,
            col = cell.dataset.col;

        /* check if cell is not empty */
        if(cell.dataset.value !== undefined) {
            return false;
        }

        /* set value to cell */
        if(player1) {
            cell.dataset.value = 0;
        } else {
            cell.dataset.value = 1;
        }

        var value = event.target.dataset.value;

        /* check horizontal line */
        var rowLine = true;
        for(var i = 0; i < 3; i++) {
            if(cells[row][i].dataset.value !== value){
                rowLine = false;
            }
        }

        if(rowLine) {
            alert('end row');
        }

        /* check vertical line */
        var colLine = true;
        for(var i = 0; i < 3; i++) {
            if(cells[i][col].dataset.value !== value){
                colLine = false;
            }
        }

        if(colLine) {
            alert('end col');
        }

        /* check diagonals */
        /* @TODO: add condition when diagonals should be checked */

        /* diagonal from top left to bottom right */
        var diagonal1 = true;
        for(var i = 0; i < 3; i++) {
            if(cells[i][i].dataset.value !== value){
                diagonal1 = false;
            }
        }

        if(diagonal1) {
            alert('end diagonal 1');
        }


        /* diagonal from top right to bottom left */
        var diagonal2 = true;
        for(var i = 0; i < 3; i++) {
            if(cells[i][2 - i].dataset.value !== value){
                diagonal2 = false;
            }
        }

        if(diagonal2) {
            alert('end diagonal 2');
        }


        /* check if empty cells exist */
        var emptyCell = true;
        for(var i = 0; i < buttons.length; i++) {
            if(buttons[i].dataset.value === undefined) {
                emptyCell = false
            }
        }

        if(emptyCell) {
            alert('Ooops! No empty cells')
        }

        /* change player */
        changePlayer();

        function changePlayer() {
            player1 = !player1;
            document.querySelector('.scoreboard').classList.toggle('player-second');
        }
    })

})();