(function() {
    var conn = new WebSocket('ws://localhost:8080');

    var btnStart = document.getElementById('btnStart');
    var gamefield = document.getElementById('gamefield');
    var currentLetter = document.getElementById('currentLetter');
    var currentResDiv = document.getElementById('currentResDiv');
    var result = document.getElementById('result');

    var points = 0,
        pointsIncrementer = 10;
    var letterToGuess;
    var canUserType = false;

    conn.onopen = function() {
        console.log('connection was established');
    }

    conn.onmessage = function(e) {
        currentLetter.innerText = e.data;
        letterToGuess = e.data;
        canUserType = true;
    }

    btnStart.addEventListener('click', function() {
        conn.send('');
    });

    gamefield.addEventListener('keydown', function(e) {
        var input = String.fromCharCode(e.keyCode).toLowerCase();
        var isLetter = /^[a-z]$/i.test(input);

        if(!isLetter || !canUserType) {
            e.preventDefault();
            return;
        }

        canUserType = false

        var span = document.createElement('span');
        span.innerText = input;

        if(input === letterToGuess) {
            points += pointsIncrementer;
            result.innerText = points;
            span.classList.add('valid');
        } else {
            span.classList.add('error');
        }

        currentResDiv.appendChild(span);
    })
}())